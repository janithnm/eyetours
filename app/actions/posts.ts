'use server';

import { db } from '@/app/db';
import { posts } from '@/app/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const PostSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    excerpt: z.string().optional(),
    content: z.string().optional(),
    coverImage: z.string().optional(),
    author: z.string().optional(),
    category: z.string().optional(),
    published: z.boolean().default(true),
    images: z.array(z.string()).optional(),
});

export async function getPosts(limit?: number) {
    try {
        let query = db.select().from(posts)
            .where(eq(posts.published, true))
            .orderBy(desc(posts.createdAt));

        if (limit) {
            // @ts-ignore
            query = query.limit(limit);
        }

        const data = await query;
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching posts:', error);
        return { success: false, error: 'Failed to fetch posts' };
    }
}

export async function getAdminPosts() {
    try {
        const data = await db.select().from(posts).orderBy(desc(posts.createdAt));
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching admin posts:', error);
        return { success: false, error: 'Failed to fetch posts' };
    }
}

export async function getPostBySlug(slug: string) {
    try {
        const result = await db.select().from(posts)
            .where(eq(posts.slug, slug))
            .limit(1);
        if (!result.length) return { success: false, error: 'Post not found' };
        return { success: true, data: result[0] };
    } catch (error) {
        console.error('Error fetching post:', error);
        return { success: false, error: 'Failed to fetch post' };
    }
}

export async function getPostById(id: number) {
    try {
        const result = await db.select().from(posts)
            .where(eq(posts.id, id))
            .limit(1);
        if (!result.length) return { success: false, error: 'Post not found' };
        return { success: true, data: result[0] };
    } catch (error) {
        return { success: false, error: 'Failed to fetch post' };
    }
}

export async function createPost(data: any) {
    const validated = PostSchema.safeParse(data);
    if (!validated.success) {
        return { success: false, errors: validated.error.flatten().fieldErrors };
    }

    try {
        await db.insert(posts).values(validated.data);
        revalidatePath('/admin/dashboard/blogs');
        revalidatePath('/blogs');
        return { success: true, message: 'Post created successfully' };
    } catch (error) {
        console.error('Error creating post:', error);
        return { success: false, error: 'Failed to create post' };
    }
}

export async function updatePost(id: number, data: any) {
    const validated = PostSchema.safeParse(data);
    if (!validated.success) {
        return { success: false, errors: validated.error.flatten().fieldErrors };
    }

    try {
        await db.update(posts)
            .set({ ...validated.data, updatedAt: new Date() })
            .where(eq(posts.id, id));
        revalidatePath('/admin/dashboard/blogs');
        revalidatePath('/blogs');
        revalidatePath(`/blogs/${data.slug}`);
        return { success: true, message: 'Post updated successfully' };
    } catch (error) {
        console.error('Error updating post:', error);
        return { success: false, error: 'Failed to update post' };
    }
}

export async function deletePost(id: number) {
    try {
        await db.delete(posts).where(eq(posts.id, id));
        revalidatePath('/admin/dashboard/blogs');
        revalidatePath('/blogs');
        return { success: true, message: 'Post deleted successfully' };
    } catch (error) {
        console.error('Error deleting post:', error);
        return { success: false, error: 'Failed to delete post' };
    }
}

export async function togglePostStatus(id: number, currentStatus: boolean) {
    try {
        await db.update(posts)
            .set({ published: !currentStatus })
            .where(eq(posts.id, id));
        revalidatePath('/admin/dashboard/blogs');
        revalidatePath('/blogs');
        return { success: true, message: 'Status updated successfully' };
    } catch (error) {
        console.error('Error updating status:', error);
        return { success: false, error: 'Failed to update status' };
    }
}
