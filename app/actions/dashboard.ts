'use server';

import { db } from '@/app/db';
import { inquiries, packages, posts, bookings } from '@/app/db/schema';
import { eq, sql } from 'drizzle-orm';

export async function getDashboardStats() {
    try {
        const [totalInquiries] = await db.select({ count: sql<number>`count(*)` }).from(inquiries);
        const [pendingInquiries] = await db.select({ count: sql<number>`count(*)` })
            .from(inquiries)
            .where(eq(inquiries.status, 'pending'));

        const [totalBookings] = await db.select({ count: sql<number>`count(*)` }).from(bookings);
        const [pendingBookings] = await db.select({ count: sql<number>`count(*)` })
            .from(bookings)
            .where(eq(bookings.status, 'pending'));

        const [totalPackages] = await db.select({ count: sql<number>`count(*)` }).from(packages);
        const [totalPosts] = await db.select({ count: sql<number>`count(*)` }).from(posts);

        return {
            success: true,
            data: {
                totalInquiries: Number(totalInquiries.count) + Number(totalBookings.count),
                pendingInquiries: Number(pendingInquiries.count) + Number(pendingBookings.count),
                totalPackages: Number(totalPackages.count),
                totalPosts: Number(totalPosts.count)
            }
        };
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return { success: false, error: 'Failed to fetch dashboard stats' };
    }
}
