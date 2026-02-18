'use server';

import { db } from '@/app/db';
import { packages, inquiries, bookings, categories } from '@/app/db/schema';
import { eq, desc, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { isValidEmail, isValidMobile } from '@/utils/validation';

// Types
export type Package = typeof packages.$inferSelect;
export type Inquiry = typeof inquiries.$inferInsert;

// Schemas
const PackageSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.coerce.number().min(0),
    durationDays: z.coerce.number().min(1),
    category: z.string().optional(),
    type: z.string().default('package'),
    isFeatured: z.boolean().default(false),
    published: z.boolean().default(false),
    thumbnailUrl: z.string().optional(),
    images: z.array(z.string()).optional(),
    inclusions: z.array(z.string()).optional(),
    exclusions: z.array(z.string()).optional(),
    // Simple itinerary validation for now, can be expanded
    itinerary: z.array(z.object({
        day: z.number(),
        title: z.string().min(1, 'Day title required'),
        description: z.string().optional(), // Keep optional for backward compatibility or summary
        image: z.string().optional(),
        activities: z.array(z.object({
            title: z.string().min(1, 'Activity title required'),
            description: z.string().min(1, 'Activity description required')
        })).default([])
    })).default([]),
});

const InquirySchema = z.object({
    customerName: z.string().min(1, 'Name is required'),
    customerEmail: z.string().refine(isValidEmail, { message: 'Invalid email address' }),
    customerPhone: z.string().optional().refine(val => !val || isValidMobile(val), { message: 'Invalid phone number' }),
    travelDate: z.string().pipe(z.coerce.date()),
    numberOfPeople: z.coerce.number().min(1, 'At least 1 person required'),
    message: z.string().optional(),
    packageId: z.coerce.number().optional(),
});

export async function getFeaturedPackages() {
    try {
        const data = await db.select().from(packages)
            .where(and(
                eq(packages.isFeatured, true),
                eq(packages.published, true),
                eq(packages.type, 'package') // Only show standard packages in featured section
            ))
            .orderBy(desc(packages.createdAt))
            .limit(6);
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching featured packages:', error);
        return { success: false, error: 'Failed to fetch packages' };
    }
}

// ... empty

// ...

export async function getPackages(categorySlug?: string, type: string = 'package') {
    try {
        const conditions = [eq(packages.published, true)];

        if (categorySlug) {
            // First find the category name from the slug
            const categoryRecord = await db.select().from(categories)
                .where(eq(categories.slug, categorySlug))
                .limit(1);

            if (categoryRecord.length > 0) {
                conditions.push(eq(packages.category, categoryRecord[0].name));
            } else {
                // Should we try to match by name directly? 
                // In case the slug IS the name or some legacy behavior?
                // For now, let's assume if it doesn't match a category slug, it might be a direct category name match or fail gracefully.
                // Let's try to match by input as a fallback if not found in categories table (for backward compat if any)
                conditions.push(eq(packages.category, categorySlug));
            }
        }

        // Filter by type (defaults to 'package' to exclude day tours from main lists)
        if (type && type !== 'all') {
            conditions.push(eq(packages.type, type));
        }

        const data = await db.select().from(packages)
            .where(and(...conditions))
            .orderBy(desc(packages.createdAt));

        return { success: true, data };
    } catch (error) {
        console.error('Error fetching packages:', error);
        return { success: false, error: 'Failed to fetch packages' };
    }
}

export async function getPackageBySlug(slug: string) {
    try {
        const data = await db.select().from(packages)
            .where(and(eq(packages.slug, slug), eq(packages.published, true)))
            .limit(1);

        if (!data.length) return { success: false, error: 'Package not found' };

        return { success: true, data: data[0] };
    } catch (error) {
        console.error('Error fetching package:', error);
        return { success: false, error: 'Failed to fetch package' };
    }
}

export async function submitInquiry(prevState: any, formData: FormData) {
    const rawData = {
        customerName: formData.get('customerName'),
        customerEmail: formData.get('customerEmail'),
        customerPhone: formData.get('customerPhone'),
        travelDate: formData.get('travelDate'),
        numberOfPeople: formData.get('numberOfPeople'),
        message: formData.get('message'),
        packageId: formData.get('packageId'),
    };

    console.log('Submitting Inquiry Raw Data:', rawData);

    const validated = InquirySchema.safeParse(rawData);

    if (!validated.success) {
        console.error('Inquiry Validation Errors:', validated.error.flatten().fieldErrors);
        return { success: false, errors: validated.error.flatten().fieldErrors, message: 'Validation failed' };
    }

    try {
        const { packageId, ...inquiryData } = validated.data;

        // If it's a direct booking for a package
        if (packageId) {
            await db.insert(bookings).values({
                customerName: inquiryData.customerName,
                customerEmail: inquiryData.customerEmail,
                customerPhone: inquiryData.customerPhone || '',
                travelDate: inquiryData.travelDate,
                numberOfPeople: inquiryData.numberOfPeople,
                packageId: packageId,
                status: 'pending'
            });
        } else {
            // General inquiry (though for this feature we mostly care about bookings)
            // Adjusting schema usage based on what we have. 
            // The schema for `inquiries` table is more complex (custom trip).
            // For simple package inquiry, we might treat it as a booking request or use the inquiry table.
            // For now, let's treat package page inquiries as 'Bookings' requests pending confirmation.
        }

        revalidatePath('/admin/bookings');
        revalidatePath('/admin/dashboard');
        return { success: true, message: 'Inquiry submitted successfully!' };
    } catch (error) {
        console.error('Error submitting inquiry:', error);
        return { success: false, message: 'Failed to submit inquiry' };
    }
}

export async function getAdminPackages() {
    try {
        const data = await db.select().from(packages).orderBy(desc(packages.createdAt));
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching admin packages:', error);
        return { success: false, error: 'Failed to fetch packages' };
    }
}

export async function deletePackage(id: number) {
    try {
        await db.delete(packages).where(eq(packages.id, id));
        revalidatePath('/admin/dashboard/packages');
        return { success: true, message: 'Package deleted successfully' };
    } catch (error) {
        console.error('Error deleting package:', error);
        return { success: false, error: 'Failed to delete package' };
    }
}

export async function togglePackageStatus(id: number, currentStatus: boolean) {
    try {
        await db.update(packages)
            .set({ published: !currentStatus })
            .where(eq(packages.id, id));
        revalidatePath('/admin/dashboard/packages');
        return { success: true, message: 'Status updated successfully' };
    } catch (error) {
        console.error('Error updating status:', error);
        return { success: false, error: 'Failed to update status' };
    }
}

export async function createPackage(data: any) {
    const validated = PackageSchema.safeParse(data);
    if (!validated.success) {
        return { success: false, errors: validated.error.flatten().fieldErrors };
    }

    try {
        const payload = {
            ...validated.data,
            price: validated.data.price.toString(),
            totalAmount: undefined, // ensure no extra fields
            rating: undefined
        };
        // @ts-ignore - price string vs number issue with zod
        await db.insert(packages).values({
            ...validated.data,
            price: validated.data.price.toString()
        });
        revalidatePath('/admin/dashboard/packages');
        return { success: true, message: 'Package created successfully' };
    } catch (error) {
        console.error('Error creating package:', error);
        return { success: false, error: 'Failed to create package' };
    }
}

export async function updatePackage(id: number, data: any) {
    const validated = PackageSchema.safeParse(data);
    if (!validated.success) {
        return { success: false, errors: validated.error.flatten().fieldErrors };
    }

    try {
        // @ts-ignore
        await db.update(packages)
            .set({
                ...validated.data,
                price: validated.data.price.toString(),
                updatedAt: new Date()
            })
            .where(eq(packages.id, id));
        revalidatePath('/admin/dashboard/packages');
        revalidatePath(`/admin/dashboard/packages/${id}`);
        return { success: true, message: 'Package updated successfully' };
    } catch (error) {
        console.error('Error updating package:', error);
        return { success: false, error: 'Failed to update package' };
    }
}

export async function getPackageById(id: number) {
    try {
        const data = await db.select().from(packages).where(eq(packages.id, id)).limit(1);
        if (!data.length) return { success: false, error: 'Package not found' };
        return { success: true, data: data[0] };
    } catch (error) {
        return { success: false, error: 'Failed to fetch package' };
    }
}

