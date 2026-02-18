'use server';

import { db } from '@/app/db';
import { siteSettings } from '@/app/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { isValidEmail, isValidMobile } from '@/utils/validation';

const SettingsSchema = z.object({
    companyName: z.string().min(1, 'Company Name is required'),
    email: z.string().refine(val => !val || isValidEmail(val), { message: 'Invalid email' }).optional().or(z.literal('')),
    phone: z.string().optional().refine(val => !val || isValidMobile(val), { message: 'Invalid phone number' }),
    hotline: z.string().optional(),
    whatsapp: z.string().optional(),
    address: z.string().optional(),
    facebook: z.string().url('Invalid URL').optional().or(z.literal('')),
    instagram: z.string().url('Invalid URL').optional().or(z.literal('')),
    youtube: z.string().url('Invalid URL').optional().or(z.literal('')),
    showPrice: z.boolean().optional(),
});

export async function getSiteSettings() {
    try {
        const data = await db.select().from(siteSettings).orderBy(desc(siteSettings.id)).limit(1);
        if (data.length > 0) {
            return { success: true, data: data[0] };
        } else {
            // Create default settings if not exists
            const defaultSettings = {
                companyName: 'Travel Temp',
                email: 'info@example.com',
                phone: '+94770000000'
            };
            const newData = await db.insert(siteSettings).values(defaultSettings).returning();
            return { success: true, data: newData[0] };
        }
    } catch (error) {
        console.error('Error fetching settings:', error);
        return { success: false, error: 'Failed to fetch settings' };
    }
}

export async function updateSiteSettings(data: any) {
    const validated = SettingsSchema.safeParse(data);
    if (!validated.success) {
        return { success: false, error: validated.error.issues[0].message };
    }

    try {
        // Find the latest record to update
        const existing = await db.select().from(siteSettings).orderBy(desc(siteSettings.id)).limit(1);
        let id = 1;

        if (existing.length > 0) {
            id = existing[0].id;
            await db.update(siteSettings)
                .set({ ...validated.data, updatedAt: new Date() })
                .where(eq(siteSettings.id, id));
        } else {
            // If no settings exist, create new
            await db.insert(siteSettings).values(validated.data);
        }

        revalidatePath('/admin/dashboard/settings');
        revalidatePath('/contact');
        revalidatePath('/');
        return { success: true, message: 'Settings updated successfully' };
    } catch (error) {
        console.error('Error updating settings:', error);
        return { success: false, error: 'Failed to update settings' };
    }
}
