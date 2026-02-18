import { getPackageById } from '@/app/actions/packages';
import PackageForm from '@/components/admin/packages/PackageForm';
import { Box, Typography } from '@mui/material';

export default async function EditPackagePage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const { success, data, error } = await getPackageById(Number(id));

    if (!success || !data) {
        return (
            <Box p={3}>
                <Typography color="error" variant="h6">Error: {error || 'Package not found'}</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <PackageForm initialData={data} />
        </Box>
    );
}
