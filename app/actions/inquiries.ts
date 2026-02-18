'use server';

import { db } from '@/app/db';
import { inquiries, bookings } from '@/app/db/schema';
import { eq, desc, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getInquiries(limit?: number) {
    try {
        let query = db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
        if (limit) {
            // @ts-ignore
            query = query.limit(limit);
        }
        const data = await query;
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching inquiries:', error);
        return { success: false, error: 'Failed to fetch inquiries' };
    }
}

export async function getBookings(limit?: number) {
    try {
        // Fetch direct bookings (from package pages)
        const data = await db.query.bookings.findMany({
            with: {
                package: true
            },
            orderBy: desc(bookings.createdAt),
            limit: limit
        });
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return { success: false, error: 'Failed to fetch bookings' };
    }
}

export async function updateInquiryStatus(id: number, status: any) {
    try {
        await db.update(inquiries)
            .set({ status, updatedAt: new Date() })
            .where(eq(inquiries.id, id));
        revalidatePath('/admin/dashboard/inquiries');
        return { success: true, message: 'Status updated' };
    } catch (error) {
        return { success: false, error: 'Failed to update status' };
    }
}

export async function updateBookingStatus(id: number, status: any) {
    try {
        await db.update(bookings)
            .set({ status, updatedAt: new Date() })
            .where(eq(bookings.id, id));
        revalidatePath('/admin/dashboard/inquiries');
        return { success: true, message: 'Status updated' };
    } catch (error) {
        return { success: false, error: 'Failed to update status' };
    }
}
import { z } from 'zod';
import { isValidEmail, isValidMobile } from '@/utils/validation';

const CustomTripSchema = z.object({
    regions: z.array(z.string()),
    travelStyle: z.string(),
    startDate: z.string().pipe(z.coerce.date()),
    endDate: z.string().pipe(z.coerce.date()),
    adults: z.number(),
    children: z.number(),
    infants: z.number(),
    accommodationType: z.string(),
    experiences: z.array(z.string()),
    budgetMin: z.number(),
    budgetMax: z.number(),
    name: z.string().min(1, 'Name is required'),
    email: z.string().refine(isValidEmail, { message: 'Invalid email' }),
    countryCode: z.string().optional(),
    phone: z.string().optional().refine(val => !val || isValidMobile(val), { message: 'Invalid phone number' }),
    additionalInfo: z.string().optional(),
});

export async function submitCustomTrip(prevState: any, formData: FormData) {
    try {
        const rawData = {
            regions: JSON.parse(formData.get('regions') as string || '[]'),
            travelStyle: formData.get('travelStyle'),
            startDate: formData.get('startDate'),
            endDate: formData.get('endDate'),
            adults: Number(formData.get('adults')),
            children: Number(formData.get('children')),
            infants: Number(formData.get('infants')),
            accommodationType: formData.get('accommodationType'),
            experiences: JSON.parse(formData.get('experiences') as string || '[]'),
            budgetMin: Number(formData.get('budgetMin')),
            budgetMax: Number(formData.get('budgetMax')),
            name: formData.get('name'),
            email: formData.get('email'),
            countryCode: formData.get('countryCode'),
            phone: formData.get('phone'),
            additionalInfo: formData.get('additionalInfo'),
        };

        console.log('Submitting Custom Trip Raw Data:', rawData);

        const validated = CustomTripSchema.safeParse(rawData);

        if (!validated.success) {
            console.error('Custom Trip Validation Errors:', validated.error.flatten().fieldErrors);
            return { success: false, errors: validated.error.flatten().fieldErrors, message: 'Please maintain all required fields.' };
        }

        const data = validated.data;
        const fullPhone = `${data.countryCode || ''} ${data.phone || ''}`.trim();
        const budgetRange = `${data.budgetMin} - ${data.budgetMax} USD`;

        await db.insert(inquiries).values({
            customerName: data.name,
            customerEmail: data.email,
            customerPhone: fullPhone,
            destinations: data.regions,
            interests: [...data.experiences, `Style: ${data.travelStyle}`, `Accommodation: ${data.accommodationType}`],
            budgetRange: budgetRange,
            arrivalDate: data.startDate,
            // Calculate duration or store endDate in adminNotes for now? 
            // Schema doesn't have endDate, but has startDate. We can put range in message/adminNotes.
            numberOfAdults: data.adults,
            numberOfChildren: data.children, // + infants? Schema has separate children field or just one? Schema says numberOfChildren.
            message: `Travel Dates: ${data.startDate.toDateString()} - ${data.endDate.toDateString()}\n\nAdditional Info: ${data.additionalInfo || 'None'}`,
            status: 'pending'
        });

        revalidatePath('/admin/dashboard/inquiries');
        revalidatePath('/admin/dashboard');
        return { success: true, message: 'Trip inquiry submitted successfully!' };

    } catch (error) {
        console.error('Error submitting custom trip:', error);
        return { success: false, message: 'Failed to submit inquiry. Please try again.' };
    }
}

export async function getInquiryStats() {
    try {
        const [totalInquiries] = await db.select({ count: sql<number>`count(*)` }).from(inquiries);
        const [pendingInquiries] = await db.select({ count: sql<number>`count(*)` })
            .from(inquiries)
            .where(eq(inquiries.status, 'pending'));

        const [totalBookings] = await db.select({ count: sql<number>`count(*)` }).from(bookings);
        const [pendingBookings] = await db.select({ count: sql<number>`count(*)` })
            .from(bookings)
            .where(eq(bookings.status, 'pending'));

        return {
            total: Number(totalInquiries.count) + Number(totalBookings.count),
            pending: Number(pendingInquiries.count) + Number(pendingBookings.count)
        };
    } catch (error) {
        console.error('Error fetching stats:', error);
        return { total: 0, pending: 0 };
    }
}

export async function getRecentActivity(limit = 10) {
    try {
        const recentInquiries = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt)).limit(limit);
        const recentBookings = await db.query.bookings.findMany({
            with: { package: true },
            orderBy: desc(bookings.createdAt),
            limit: limit
        });

        // Combine and sort
        const combined = [
            ...recentInquiries.map(i => ({ ...i, type: 'inquiry' })),
            ...recentBookings.map(b => ({ ...b, type: 'booking' }))
        ].sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
            .slice(0, limit);

        return { success: true, data: combined };
    } catch (error) {
        console.error('Error fetching recent activity:', error);
        return { success: false, error: 'Failed to fetch recent activity' };
    }
}
