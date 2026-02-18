import { getFeaturedPackages } from '@/app/actions/packages';
import { getSiteSettings } from '@/app/actions/settings';
import PackageCard from './PackageCard';
import { Box, Button, Container, Grid, Typography, Skeleton } from '@mui/material';
import ViewAllPackagesButton from './ViewAllPackagesButton';

export default async function FeaturedPackages() {
    const { data: featuredPackages, success, error } = await getFeaturedPackages();
    const { data: settings } = await getSiteSettings();
    const showPrice = settings?.showPrice ?? true;

    if (!success || !featuredPackages) {
        // Fallback or error state
        return null;
    }

    if (featuredPackages.length === 0) {
        return null; // Don't show section if no packages
    }

    return (
        <Box py={10} bgcolor="background.default">
            <Container>
                <Box textAlign="center" mb={6}>
                    <Typography variant="overline" color="primary" fontWeight="bold" letterSpacing={1.2}>
                        Exclusive Tours
                    </Typography>
                    <Typography variant="h2" mb={2}>
                        Curated Journeys
                    </Typography>
                    <Typography variant="body1" color="text.secondary" maxWidth="md" mx="auto">
                        Explore our hand-picked selection of bespoke tour packages designed to show you the true soul of Sri Lanka.
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {featuredPackages.map((pkg) => (
                        <Grid size={{ xs: 12, md: 6, lg: 4 }} key={pkg.id}>
                            <PackageCard pkg={pkg} showPrice={showPrice} />
                        </Grid>
                    ))}
                </Grid>

                <Box textAlign="center" mt={8}>
                    <ViewAllPackagesButton />
                </Box>
            </Container>
        </Box>
    );
}

export function FeaturedPackagesSkeleton() {
    return (
        <Box py={10}>
            <Container>
                <Box textAlign="center" mb={6}>
                    <Skeleton variant="text" width={150} sx={{ mx: 'auto' }} />
                    <Skeleton variant="text" width={300} height={60} sx={{ mx: 'auto' }} />
                    <Skeleton variant="text" width="60%" sx={{ mx: 'auto' }} />
                </Box>
                <Grid container spacing={4}>
                    {[1, 2, 3].map((i) => (
                        <Grid size={{ xs: 12, md: 6, lg: 4 }} key={i}>
                            <Skeleton variant="rectangular" height={450} sx={{ borderRadius: 4 }} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}
