'use server';

import { db } from '@/app/db';
import { categories, packages } from '@/app/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const CategorySchema = z.object({
    name: z.string().min(1, 'Name is required'),
    slug: z.string().min(1, 'Slug is required'),
    description: z.string().optional(),
    image: z.string().optional(),
    active: z.boolean().default(true),
});

export async function getAdminCategories() {
    try {
        const data = await db.select().from(categories).orderBy(desc(categories.createdAt));
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching categories:', error);
        return { success: false, error: 'Failed to fetch categories' };
    }
}

export async function getActiveCategories() {
    try {
        const data = await db.select().from(categories).where(eq(categories.active, true)).orderBy(categories.name);
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching active categories:', error);
        return { success: false, error: 'Failed to fetch categories' };
    }
}

export async function createCategory(data: any) {
    const validated = CategorySchema.safeParse(data);
    if (!validated.success) return { success: false, error: validated.error.issues[0].message };

    try {
        await db.insert(categories).values(validated.data);
        revalidatePath('/admin/dashboard/categories');
        return { success: true, message: 'Category created successfully' };
    } catch (error: any) {
        if (error.message.includes('unique constraint')) {
            return { success: false, error: 'Slug must be unique' };
        }
        console.error('Error creating category:', error);
        return { success: false, error: 'Failed to create category' };
    }
}

export async function updateCategory(id: number, data: any) {
    const validated = CategorySchema.safeParse(data);
    if (!validated.success) return { success: false, error: validated.error.issues[0].message };

    try {
        await db.update(categories)
            .set({ ...validated.data, updatedAt: new Date() })
            .where(eq(categories.id, id));
        revalidatePath('/admin/dashboard/categories');
        return { success: true, message: 'Category updated successfully' };
    } catch (error: any) {
        if (error.message.includes('unique constraint')) {
            return { success: false, error: 'Slug must be unique' };
        }
        console.error('Error updating category:', error);
        return { success: false, error: 'Failed to update category' };
    }
}

export async function deleteCategory(id: number) {
    try {
        await db.delete(categories).where(eq(categories.id, id));
        revalidatePath('/admin/dashboard/categories');
        return { success: true, message: 'Category deleted successfully' };
    } catch (error) {
        console.error('Error deleting category:', error);
        return { success: false, error: 'Failed to delete category' };
    }
}

export async function syncCategories() {
    try {
        // 1. Get all packages with categories
        const allPackages = await db.select({ category: packages.category }).from(packages);

        // 2. Extract unique categories (filter out nulls/undefined)
        const uniqueCategories = Array.from(new Set(allPackages.map(p => p.category).filter(Boolean))) as string[];

        let addedCount = 0;

        for (const catName of uniqueCategories) {
            // Check if it already exists (case-insensitive check would be better but exact match is faster for now)
            const existing = await db.select().from(categories).where(eq(categories.name, catName)).limit(1);

            if (existing.length === 0) {
                // Creates a slug
                const slug = catName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

                await db.insert(categories).values({
                    name: catName,
                    slug: slug,
                    description: `Category for ${catName}`,
                    active: true
                });
                addedCount++;
            }
        }

        revalidatePath('/admin/dashboard/categories');
        return { success: true, message: `Synced ${addedCount} new categories.` };
    } catch (error) {
        console.error('Error syncing categories:', error);
        return { success: false, error: 'Failed to sync categories' };
    }
}
