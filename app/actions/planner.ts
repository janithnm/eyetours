'use server';

import { db } from '@/app/db';
import { plannerOptions } from '@/app/db/schema';
import { desc, eq, asc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export type PlannerOption = typeof plannerOptions.$inferSelect;

export async function getPlannerOptions(category?: string) {
    try {
        const query = db.select().from(plannerOptions);
        if (category) {
            query.where(eq(plannerOptions.category, category));
        }
        query.orderBy(asc(plannerOptions.order), desc(plannerOptions.createdAt));
        const items = await query;
        return { success: true, data: items };
    } catch (error) {
        console.error('Failed to fetch planner options:', error);
        return { success: false, error: 'Failed to fetch planner options' };
    }
}

export async function createPlannerOption(data: Partial<typeof plannerOptions.$inferInsert>) {
    try {
        await db.insert(plannerOptions).values({
            category: data.category || 'general',
            label: data.label || 'New Option',
            description: data.description,
            image: data.image,
            metadata: data.metadata,
            order: 0,
            active: true
        });
        revalidatePath('/admin/dashboard/planner');
        revalidatePath('/planner');
        return { success: true };
    } catch (error) {
        console.error('Failed to create planner option:', error);
        return { success: false, error: 'Failed to create planner option' };
    }
}

export async function updatePlannerOption(id: number, data: Partial<typeof plannerOptions.$inferInsert>) {
    try {
        await db.update(plannerOptions).set(data).where(eq(plannerOptions.id, id));
        revalidatePath('/admin/dashboard/planner');
        revalidatePath('/planner');
        return { success: true };
    } catch (error) {
        console.error('Failed to update planner option:', error);
        return { success: false, error: 'Failed to update planner option' };
    }
}

export async function deletePlannerOption(id: number) {
    try {
        await db.delete(plannerOptions).where(eq(plannerOptions.id, id));
        revalidatePath('/admin/dashboard/planner');
        revalidatePath('/planner');
        return { success: true };
    } catch (error) {
        console.error('Failed to delete planner option:', error);
        return { success: false, error: 'Failed to delete planner option' };
    }
}

export async function updatePlannerOptionOrder(items: { id: number; order: number }[]) {
    try {
        await Promise.all(
            items.map(item =>
                db.update(plannerOptions)
                    .set({ order: item.order })
                    .where(eq(plannerOptions.id, item.id))
            )
        );
        revalidatePath('/admin/dashboard/planner');
        revalidatePath('/planner');
        return { success: true };
    } catch (error) {
        console.error('Failed to update planner options order:', error);
        return { success: false, error: 'Failed to update planner options order' };
    }
}
