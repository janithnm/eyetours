import { Box, Typography } from '@mui/material';
import DestinationForm from '@/components/admin/destinations/DestinationForm';
import { getDestinations } from '@/app/actions/destinations'; // We might need a getById generic or just use list to find.
// Actually checking actions again... I don't have getDestinationById exposed in my previous step, I only added getDestinationBySlug.
// But for admin edit we usually use ID. I should add getDestinationById or just fetch all and find (not efficient but okay for now) 
// OR I can use the existing action if I update it? 
// Wait, I can use db directly in server component if needed, but best to use action.
// Let me double check usage.
// Actually, I'll add `getDestinationById` in next step if needed, or I can just fetch via DB in this server component since it's a server component.
import { db } from '@/app/db';
import { destinations } from '@/app/db/schema';
import { eq } from 'drizzle-orm';

export default async function EditDestinationPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const dest = await db.select().from(destinations).where(eq(destinations.id, parseInt(id))).limit(1);

    if (!dest.length) {
        return <Typography>Destination not found</Typography>;
    }

    return (
        <Box>
            <DestinationForm initialData={dest[0]} />
        </Box>
    );
}
