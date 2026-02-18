'use server';

import { db } from '@/app/db';
import { destinations } from '@/app/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const DestinationSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    slug: z.string().min(1, 'Slug is required'),
    description: z.string().optional(),
    shortDescription: z.string().optional(),
    image: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    active: z.boolean().default(true),
});

export async function getDestinations() {
    try {
        const data = await db.select().from(destinations).orderBy(desc(destinations.createdAt));
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching destinations:', error);
        return { success: false, error: 'Failed to fetch destinations' };
    }
}

export async function getActiveDestinations() {
    try {
        const data = await db.select().from(destinations)
            .where(eq(destinations.active, true))
            .orderBy(desc(destinations.createdAt));
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching active destinations:', error);
        return { success: false, error: 'Failed to fetch destinations' };
    }
}

export async function getDestinationBySlug(slug: string) {
    try {
        const result = await db.select().from(destinations)
            .where(eq(destinations.slug, slug))
            .limit(1);

        if (!result.length) return { success: false, error: 'Destination not found' };
        return { success: true, data: result[0] };
    } catch (error) {
        console.error('Error fetching destination:', error);
        return { success: false, error: 'Failed to fetch destination' };
    }
}

export async function createDestination(data: any) {
    const validated = DestinationSchema.safeParse(data);
    if (!validated.success) {
        return { success: false, errors: validated.error.flatten().fieldErrors };
    }

    try {
        await db.insert(destinations).values(validated.data);
        revalidatePath('/admin/dashboard/destinations');
        revalidatePath('/destinations');
        return { success: true, message: 'Destination created successfully' };
    } catch (error: any) {
        if (error.message && error.message.includes('unique constraint')) {
            return { success: false, error: 'Slug must be unique' };
        }
        console.error('Error creating destination:', error);
        return { success: false, error: 'Failed to create destination' };
    }
}

export async function updateDestination(id: number, data: any) {
    const validated = DestinationSchema.safeParse(data);
    if (!validated.success) {
        return { success: false, errors: validated.error.flatten().fieldErrors };
    }

    try {
        await db.update(destinations)
            .set({ ...validated.data, updatedAt: new Date() })
            .where(eq(destinations.id, id));
        revalidatePath('/admin/dashboard/destinations');
        revalidatePath('/destinations');
        revalidatePath(`/destinations/${data.slug}`);
        return { success: true, message: 'Destination updated successfully' };
    } catch (error: any) {
        if (error.message && error.message.includes('unique constraint')) {
            return { success: false, error: 'Slug must be unique' };
        }
        console.error('Error updating destination:', error);
        return { success: false, error: 'Failed to update destination' };
    }
}

export async function deleteDestination(id: number) {
    try {
        await db.delete(destinations).where(eq(destinations.id, id));
        revalidatePath('/admin/dashboard/destinations');
        revalidatePath('/destinations');
        return { success: true, message: 'Destination deleted successfully' };
    } catch (error) {
        console.error('Error deleting destination:', error);
        return { success: false, error: 'Failed to delete destination' };
    }
}

export async function toggleDestinationStatus(id: number, currentStatus: boolean) {
    try {
        await db.update(destinations)
            .set({ active: !currentStatus })
            .where(eq(destinations.id, id));
        revalidatePath('/admin/dashboard/destinations');
        revalidatePath('/destinations');
        return { success: true, message: 'Status updated successfully' };
    } catch (error) {
        console.error('Error updating status:', error);
        return { success: false, error: 'Failed to update status' };
    }
}
