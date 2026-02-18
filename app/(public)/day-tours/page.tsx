import { getPackages } from '@/app/actions/packages';
import { getSiteSettings } from '@/app/actions/settings';
import PackageCard from '@/components/packages/PackageCard';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import BackToHomeButton from '@/components/common/BackToHomeButton';

export const metadata = {
    title: 'Day Tours | TravelMaster',
    description: 'Explore our exciting single-day excursions and city tours.',
};

export default async function DayToursPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;
    const category = typeof params.category === 'string' ? params.category : undefined;

    // Explicitly fetch only day tours
    const { data: packages } = await getPackages(category, 'day_tour');
    const { data: settings } = await getSiteSettings();
    const showPrice = settings?.showPrice ?? true;

    return (
        <Box py={12} bgcolor="grey.50" minHeight="100vh">
            <Container maxWidth="lg">
                <Box mb={6}>

                    <Typography
                        variant="h3"
                        fontWeight={800}
                        color="secondary.main"
                        gutterBottom
                        sx={{ fontFamily: 'serif' }}
                    >
                        Day Tours & Excursions
                    </Typography>
                    <Typography variant="body1" color="text.secondary" maxWidth={600}>
                        Short on time? Discover the beauty of Sri Lanka with our curated one-day trips. Perfect for quick getaways and city explorations.
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {packages && packages.length > 0 ? (
                        packages.map((pkg) => (
                            <Grid size={{ xs: 12, md: 4 }} key={pkg.id}>
                                <PackageCard pkg={pkg} showPrice={showPrice} />
                            </Grid>
                        ))
                    ) : (
                        <Grid size={{ xs: 12 }}>
                            <Box textAlign="center" py={10}>
                                <Typography variant="h6" color="text.secondary">
                                    No day tours found at the moment.
                                </Typography>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </Box>
    );
}
