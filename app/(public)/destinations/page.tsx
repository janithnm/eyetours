import { getActiveDestinations } from '@/app/actions/destinations';
import { Box, Container, Grid, Typography, Breadcrumbs } from '@mui/material';
import Link from 'next/link';
import DestinationCard from '@/components/destinations/DestinationCard';
import { ChevronRight, Home } from 'lucide-react';

export const metadata = {
    title: 'Destinations | Eye Tour Lanka',
    description: 'Explore the most beautiful destinations in Sri Lanka.',
};

export default async function DestinationsPage() {
    const { data: destinations } = await getActiveDestinations();

    return (
        <Box sx={{ py: 6, bgcolor: 'grey.50', minHeight: '100vh' }}>
            {/* Header / Breadcrumbs */}
            <Container maxWidth="lg" sx={{ mb: 6 }}>
                <Breadcrumbs separator={<ChevronRight size={16} />} aria-label="breadcrumb" sx={{ mb: 4 }}>
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}>
                        <Home size={18} style={{ marginRight: 4 }} /> Home
                    </Link>
                    <Typography color="text.primary">Destinations</Typography>
                </Breadcrumbs>

                <Box textAlign="center" mb={4}>
                    <Typography variant="overline" color="secondary" fontWeight="bold" letterSpacing={2}>
                        Discover Sri Lanka
                    </Typography>
                    <Typography variant="h2" fontWeight={800} sx={{ fontFamily: 'serif', mb: 2 }}>
                        Our Destinations
                    </Typography>
                    <Typography variant="body1" color="text.secondary" maxWidth="700px" mx="auto" sx={{ fontSize: '1.1rem' }}>
                        From the golden beaches of the south to the misty mountains of the central highlands, Sri Lanka offers a diverse range of experiences. Explore our curated list of destinations.
                    </Typography>
                </Box>
            </Container>

            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {destinations && destinations.length > 0 ? (
                        destinations.map((dest) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={dest.id}>
                                <DestinationCard destination={dest} />
                            </Grid>
                        ))
                    ) : (
                        <Grid size={{ xs: 12 }}>
                            <Box textAlign="center" py={10}>
                                <Typography variant="h6" color="text.secondary">
                                    No destinations found yet.
                                </Typography>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </Box>
    );
}
