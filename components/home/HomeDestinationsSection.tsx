'use client';

import { Box, Container, Grid, Typography, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getActiveDestinations } from '@/app/actions/destinations';
import { ArrowRight } from 'lucide-react';

export default function HomeDestinationsSection() {
    const [destinations, setDestinations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDestinations = async () => {
            const res = await getActiveDestinations();
            if (res.success && res.data) {
                // Limit to 4 for a nice grid
                setDestinations(res.data.slice(0, 4));
            }
            setLoading(false);
        };
        fetchDestinations();
    }, []);

    if (loading) {
        return (
            <Box py={8}>
                <Container>
                    <Skeleton variant="text" width={200} sx={{ mx: 'auto', mb: 4 }} />
                    <Grid container spacing={3}>
                        {[1, 2, 3, 4].map(i => (
                            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                                <Skeleton variant="rectangular" height={350} sx={{ borderRadius: 4 }} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ py: 10, bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
                <Box textAlign="center" mb={6}>
                    <Typography variant="overline" color="secondary" fontWeight="bold" letterSpacing={2}>
                        Destinations
                    </Typography>
                    <Typography variant="h2" sx={{ fontFamily: 'serif', mb: 2 }}>
                        Explore Our Top Destinations
                    </Typography>
                    <Typography variant="body1" color="text.secondary" maxWidth="600px" mx="auto">
                        From the golden beaches of the south to the misty mountains of the central highlands, Sri Lanka offers a diverse range of experiences.
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {destinations.map((destination, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={destination.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link href={`/destinations/${destination.slug}`} style={{ textDecoration: 'none' }}>
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            borderRadius: 4,
                                            overflow: 'hidden',
                                            height: 400,
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                            transition: 'transform 0.3s ease',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                transform: 'translateY(-10px)',
                                                '& .overlay': { opacity: 0.2 },
                                                '& .content': { transform: 'translateY(0)' },
                                                '& img': { transform: 'scale(1.1)' }
                                            }
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={destination.image || 'https://virgin-travel-app.b-cdn.net/common/placeholder.jpg'}
                                            alt={destination.name}
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                transition: 'transform 0.6s ease'
                                            }}
                                        />
                                        <Box
                                            className="overlay"
                                            sx={{
                                                position: 'absolute',
                                                top: 0, left: 0, width: '100%', height: '100%',
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent 60%)',
                                                opacity: 0.8,
                                                transition: 'opacity 0.3s ease'
                                            }}
                                        />
                                        <Box
                                            className="content"
                                            sx={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                width: '100%',
                                                p: 3,
                                                transform: 'translateY(0)',
                                                transition: 'transform 0.3s ease'
                                            }}
                                        >
                                            <Typography variant="h5" color="white" fontWeight="bold" gutterBottom sx={{ fontFamily: 'serif' }}>
                                                {destination.name}
                                            </Typography>
                                            <Typography variant="body2" color="rgba(255,255,255,0.8)" sx={{
                                                mb: 2,
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                fontSize: '0.85rem'
                                            }}>
                                                {destination.shortDescription}
                                            </Typography>
                                            <Box display="flex" alignItems="center" gap={1} color="secondary.main" sx={{ opacity: 1 }}>
                                                <Typography variant="body2" fontWeight="bold">Discover</Typography>
                                                <ArrowRight size={16} />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Link>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
