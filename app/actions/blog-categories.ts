'use server';

import { db } from '@/app/db';
import { blogCategories } from '@/app/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const BlogCategorySchema = z.object({
    name: z.string().min(1, 'Name is required'),
    slug: z.string().min(1, 'Slug is required'),
    description: z.string().optional(),
    image: z.string().optional(),
    active: z.boolean().default(true),
});

export async function getBlogCategories() {
    try {
        const data = await db.select().from(blogCategories).orderBy(desc(blogCategories.createdAt));
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching blog categories:', error);
        return { success: false, error: 'Failed to fetch categories' };
    }
}

export async function getActiveBlogCategories() {
    try {
        const data = await db.select().from(blogCategories).where(eq(blogCategories.active, true)).orderBy(blogCategories.name);
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching active blog categories:', error);
        return { success: false, error: 'Failed to fetch categories' };
    }
}

export async function createBlogCategory(data: any) {
    const validated = BlogCategorySchema.safeParse(data);
    if (!validated.success) return { success: false, error: validated.error.issues[0].message };

    try {
        await db.insert(blogCategories).values(validated.data);
        revalidatePath('/admin/dashboard/blog-categories');
        return { success: true, message: 'Category created successfully' };
    } catch (error: any) {
        if (error.message.includes('unique constraint')) {
            return { success: false, error: 'Slug must be unique' };
        }
        console.error('Error creating blog category:', error);
        return { success: false, error: 'Failed to create category' };
    }
}

export async function updateBlogCategory(id: number, data: any) {
    const validated = BlogCategorySchema.safeParse(data);
    if (!validated.success) return { success: false, error: validated.error.issues[0].message };

    try {
        await db.update(blogCategories)
            .set({ ...validated.data, updatedAt: new Date() })
            .where(eq(blogCategories.id, id));
        revalidatePath('/admin/dashboard/blog-categories');
        return { success: true, message: 'Category updated successfully' };
    } catch (error: any) {
        if (error.message.includes('unique constraint')) {
            return { success: false, error: 'Slug must be unique' };
        }
        console.error('Error updating blog category:', error);
        return { success: false, error: 'Failed to update category' };
    }
}

export async function deleteBlogCategory(id: number) {
    try {
        await db.delete(blogCategories).where(eq(blogCategories.id, id));
        revalidatePath('/admin/dashboard/blog-categories');
        return { success: true, message: 'Category deleted successfully' };
    } catch (error) {
        console.error('Error deleting blog category:', error);
        return { success: false, error: 'Failed to delete category' };
    }
}
