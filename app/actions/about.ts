'use server';

import { db } from '@/app/db';
import { teamMembers, partners } from '@/app/db/schema';
import { eq, asc } from 'drizzle-orm';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const TeamSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    role: z.string().min(1, 'Role is required'),
    bio: z.string().optional(),
    image: z.string().optional(),
    active: z.boolean().default(true),
    order: z.coerce.number().default(0),
});

const PartnerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    website: z.string().optional(),
    logo: z.string().optional(),
    active: z.boolean().default(true),
    order: z.coerce.number().default(0),
});

export async function getTeamMembers() {
    try {
        const team = await db.select().from(teamMembers)
            .where(eq(teamMembers.active, true))
            .orderBy(asc(teamMembers.order));
        return { success: true, data: team };
    } catch (error) {
        console.error('Error fetching team members:', error);
        return { success: false, error: 'Failed to fetch team members' };
    }
}

export async function getAdminTeamMembers() {
    try {
        const team = await db.select().from(teamMembers).orderBy(asc(teamMembers.order));
        return { success: true, data: team };
    } catch (error) {
        return { success: false, error: 'Failed to fetch team' };
    }
}

export async function createTeamMember(data: any) {
    const validated = TeamSchema.safeParse(data);
    if (!validated.success) return { success: false, error: 'Validation failed' };

    try {
        await db.insert(teamMembers).values(validated.data);
        revalidatePath('/about');
        revalidatePath('/admin/dashboard/team');
        return { success: true, message: 'Member added' };
    } catch (error) {
        return { success: false, error: 'Failed to add member' };
    }
}

export async function updateTeamMember(id: number, data: any) {
    const validated = TeamSchema.safeParse(data);
    if (!validated.success) return { success: false, error: 'Validation failed' };

    try {
        await db.update(teamMembers)
            .set({ ...validated.data, updatedAt: new Date() })
            .where(eq(teamMembers.id, id));
        revalidatePath('/about');
        revalidatePath('/admin/dashboard/team');
        return { success: true, message: 'Member updated' };
    } catch (error) {
        return { success: false, error: 'Failed to update member' };
    }
}

export async function deleteTeamMember(id: number) {
    try {
        await db.delete(teamMembers).where(eq(teamMembers.id, id));
        revalidatePath('/about');
        revalidatePath('/admin/dashboard/team');
        return { success: true, message: 'Member deleted' };
    } catch (error) {
        return { success: false, error: 'Failed to delete member' };
    }
}

// Partners Actions

export async function getPartners() {
    try {
        const partnerList = await db.select().from(partners)
            .where(eq(partners.active, true))
            .orderBy(asc(partners.order));
        return { success: true, data: partnerList };
    } catch (error) {
        console.error('Error fetching partners:', error);
        return { success: false, error: 'Failed to fetch partners' };
    }
}

export async function getAdminPartners() {
    try {
        const partnerList = await db.select().from(partners).orderBy(asc(partners.order));
        return { success: true, data: partnerList };
    } catch (error) {
        return { success: false, error: 'Failed to fetch partners' };
    }
}

export async function createPartner(data: any) {
    const validated = PartnerSchema.safeParse(data);
    if (!validated.success) return { success: false, error: validated.error.issues[0].message };

    try {
        await db.insert(partners).values(validated.data);
        revalidatePath('/about');
        revalidatePath('/admin/dashboard/partners');
        return { success: true, message: 'Partner added' };
    } catch (error) {
        return { success: false, error: 'Failed to add partner' };
    }
}

export async function updatePartner(id: number, data: any) {
    const validated = PartnerSchema.safeParse(data);
    if (!validated.success) return { success: false, error: validated.error.issues[0].message };

    try {
        await db.update(partners)
            .set({ ...validated.data, updatedAt: new Date() })
            .where(eq(partners.id, id));
        revalidatePath('/about');
        revalidatePath('/admin/dashboard/partners');
        return { success: true, message: 'Partner updated' };
    } catch (error) {
        return { success: false, error: 'Failed to update partner' };
    }
}

export async function deletePartner(id: number) {
    try {
        await db.delete(partners).where(eq(partners.id, id));
        revalidatePath('/about');
        revalidatePath('/admin/dashboard/partners');
        return { success: true, message: 'Partner deleted' };
    } catch (error) {
        return { success: false, error: 'Failed to delete partner' };
    }
}
