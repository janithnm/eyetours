'use server';

import { db } from '@/app/db';
import { contactSubmissions } from '@/app/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { isValidEmail } from '@/utils/validation';

const ContactSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().refine(isValidEmail, { message: 'Invalid email' }),
    subject: z.string().min(1, 'Subject is required'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function submitContactForm(data: any) {
    const validated = ContactSchema.safeParse(data);
    if (!validated.success) {
        return { success: false, error: validated.error.issues[0].message };
    }

    try {
        await db.insert(contactSubmissions).values(validated.data);
        revalidatePath('/admin/dashboard/messages');
        return { success: true, message: 'Message sent successfully!' };
    } catch (error) {
        console.error('Error sending message:', error);
        return { success: false, error: 'Failed to send message' };
    }
}

export async function getContactSubmissions() {
    try {
        const data = await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching messages:', error);
        return { success: false, error: 'Failed to fetch messages' };
    }
}

export async function markContactAsRead(id: number) {
    try {
        await db.update(contactSubmissions)
            .set({ status: 'read' })
            .where(eq(contactSubmissions.id, id));
        revalidatePath('/admin/dashboard/messages');
        return { success: true };
    } catch (error) {
        console.error('Error updating status:', error);
        return { success: false, error: 'Failed to update status' };
    }
}

export async function deleteContactSubmission(id: number) {
    try {
        await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
        revalidatePath('/admin/dashboard/messages');
        return { success: true, message: 'Message deleted' };
    } catch (error) {
        console.error('Error deleting message:', error);
        return { success: false, error: 'Failed to delete message' };
    }
}
