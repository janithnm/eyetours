'use server';

import { db } from '@/app/db';
import { gallery } from '@/app/db/schema';
import { desc, eq, asc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getGalleryItems(activeOnly = false, page = 1, limit = 9) {
    try {
        const offset = (page - 1) * limit;

        const query = db.select().from(gallery);

        // Count total items for pagination
        // Note: Drizzle doesn't have a direct count() on the query builder easily mixed with select * yet in all versions, 
        // so we might need a separate query or use metadata if available. 
        // For simplicity in this stack, let's fetch all matching IDs to count, or use a separate count query.
        // A separate count query is more efficient.

        const countQuery = db.select({ id: gallery.id }).from(gallery);
        if (activeOnly) {
            countQuery.where(eq(gallery.active, true));
            query.where(eq(gallery.active, true));
        }

        const totalItemsRes = await countQuery;
        const totalItems = totalItemsRes.length;
        const totalPages = Math.ceil(totalItems / limit);

        query.orderBy(asc(gallery.order), desc(gallery.createdAt))
            .limit(limit)
            .offset(offset);

        const items = await query;

        return {
            success: true,
            data: items,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems,
                limit
            }
        };
    } catch (error) {
        console.error('Failed to fetch gallery items:', error);
        return { success: false, error: 'Failed to fetch gallery items' };
    }
}

export async function createGalleryItem(data: { title: string; description?: string; image: string; location?: string }) {
    try {
        await db.insert(gallery).values({
            ...data,
            order: 0, // Default order
            active: true
        });
        revalidatePath('/gallery');
        revalidatePath('/admin/dashboard/gallery');
        return { success: true };
    } catch (error) {
        console.error('Failed to create gallery item:', error);
        return { success: false, error: 'Failed to create gallery item' };
    }
}

export async function updateGalleryItem(id: number, data: Partial<typeof gallery.$inferInsert>) {
    try {
        await db.update(gallery).set(data).where(eq(gallery.id, id));
        revalidatePath('/gallery');
        revalidatePath('/admin/dashboard/gallery');
        return { success: true };
    } catch (error) {
        console.error('Failed to update gallery item:', error);
        return { success: false, error: 'Failed to update gallery item' };
    }
}

export async function deleteGalleryItem(id: number) {
    try {
        await db.delete(gallery).where(eq(gallery.id, id));
        revalidatePath('/gallery');
        revalidatePath('/admin/dashboard/gallery');
        return { success: true };
    } catch (error) {
        console.error('Failed to delete gallery item:', error);
        return { success: false, error: 'Failed to delete gallery item' };
    }
}

export async function updateGalleryOrder(items: { id: number; order: number }[]) {
    try {
        // Run as a transaction or parallel promises
        await Promise.all(
            items.map(item =>
                db.update(gallery)
                    .set({ order: item.order })
                    .where(eq(gallery.id, item.id))
            )
        );
        revalidatePath('/gallery');
        revalidatePath('/admin/dashboard/gallery');
        return { success: true };
    } catch (error) {
        console.error('Failed to update gallery order:', error);
        return { success: false, error: 'Failed to update gallery order' };
    }
}
