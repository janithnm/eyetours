import { getPackages } from '@/app/actions/packages';
import { getSiteSettings } from '@/app/actions/settings';
import PackageCard from '@/components/packages/PackageCard';
import { Box, Container, Grid, Typography } from '@mui/material';
import ToursBreadcrumbs from '@/components/packages/ToursBreadcrumbs';

export default async function ToursPage(props: { searchParams?: Promise<{ category?: string }> }) {
    const searchParams = await props.searchParams;
    const category = searchParams?.category;
    const { data: packages, success } = await getPackages(category);
    const { data: settings } = await getSiteSettings();
    const showPrice = settings?.showPrice ?? true;

    if (!success || !packages) {
        return (
            <Container>
                <Box py={10} textAlign="center">
                    <Typography variant="h5" color="error">Failed to load packages.</Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Box py={4} bgcolor="background.default" minHeight="100vh">
            <Container>
                <Box mb={4}>
                    <ToursBreadcrumbs />
                </Box>

                <Box mb={6}>
                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                        {category ? `${category} Tours` : 'All Tour Packages'}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" maxWidth="md">
                        Discover your perfect Sri Lankan adventure from our comprehensive collection of tours.
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {packages.map((pkg) => (
                        <Grid size={{ xs: 12, md: 6, lg: 4 }} key={pkg.id}>
                            <PackageCard pkg={pkg} showPrice={showPrice} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
