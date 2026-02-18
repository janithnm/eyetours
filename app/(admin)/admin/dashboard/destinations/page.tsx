import { Box } from '@mui/material';
import DestinationTable from '@/components/admin/destinations/DestinationTable';
import { getDestinations } from '@/app/actions/destinations';

export default async function AdminDestinationsPage() {
    const { data: destinations } = await getDestinations();

    return (
        <Box>
            <DestinationTable destinations={destinations || []} />
        </Box>
    );
}
