import { getDestinationBySlug } from '@/app/actions/destinations';
import { Box, Container, Typography, Breadcrumbs, Grid, Paper, Button } from '@mui/material';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Home, MapPin } from 'lucide-react';
import DestinationGallery from '@/components/destinations/DestinationGallery';
import DestinationBanner from '@/components/destinations/DestinationBanner';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { data: dest } = await getDestinationBySlug(slug);
    if (!dest) return { title: 'Destination Not Found' };
    return {
        title: `${dest.name} | Eye Tour Lanka`,
        description: dest.shortDescription || `Explore ${dest.name} with Eye Tour Lanka.`,
        openGraph: {
            images: dest.image ? [dest.image] : [],
        },
    };
}

export default async function DestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { data: dest } = await getDestinationBySlug(slug);

    if (!dest) {
        notFound();
    }

    return (
        <Box pb={10} bgcolor="background.default" minHeight="100vh">
            {/* Hero Banner */}
            <DestinationBanner dest={dest} />

            <Container maxWidth="lg" sx={{ mt: 6 }}>
                <Grid container spacing={6}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        {/* Description */}
                        <Paper sx={{ p: 4, borderRadius: 4, mb: 6, overflow: 'hidden' }} elevation={0} id="description">
                            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                About {dest.name}
                            </Typography>
                            <Box
                                className="rich-text-content"
                                dangerouslySetInnerHTML={{ __html: dest.description || '' }}
                                sx={{
                                    typography: 'body1',
                                    color: 'text.secondary',
                                    lineHeight: 1.8,
                                    wordBreak: 'break-word',
                                    overflowWrap: 'break-word',
                                    overflow: 'hidden',
                                    '& p': { mb: 2 },
                                    '& h2': { fontSize: '1.5rem', fontWeight: 'bold', mt: 3, mb: 2, color: 'text.primary' },
                                    '& h3': { fontSize: '1.25rem', fontWeight: 'bold', mt: 2, mb: 1, color: 'text.primary' },
                                    '& ul, & ol': { pl: 3, mb: 2 },
                                    '& li': { mb: 1 },
                                    '& img': { maxWidth: '100%', borderRadius: 2, my: 2 }
                                }}
                            />
                        </Paper>

                        {/* Gallery */}
                        {dest.gallery && dest.gallery.length > 0 && (
                            <Box mb={6}>
                                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
                                    Gallery
                                </Typography>
                                <DestinationGallery images={dest.gallery} />
                            </Box>
                        )}
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        {/* Sidebar */}
                        <Box sx={{ position: 'sticky', top: 100 }}>
                            <Paper sx={{ p: 3, borderRadius: 4, mb: 3, bgcolor: 'primary.main', color: 'white' }} elevation={0}>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                    Interested in visiting?
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                                    Let us plan the perfect trip for you including {dest.name}.
                                </Typography>
                                <Link href={`/planner?destination=${encodeURIComponent(dest.name)}`} passHref>
                                    <Button variant="contained" color="secondary" fullWidth size="large" sx={{ fontWeight: 'bold' }}>
                                        Plan My Trip
                                    </Button>
                                </Link>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
