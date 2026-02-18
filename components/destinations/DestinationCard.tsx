'use client';

import { Box, Typography, Card, CardContent, CardMedia, Chip } from '@mui/material';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function DestinationCard({ destination }: { destination: any }) {
    return (
        <Link href={`/destinations/${destination.slug}`} style={{ textDecoration: 'none' }}>
            <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                <Card sx={{
                    height: '100%',
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    transition: 'box-shadow 0.3s ease',
                    '&:hover': { boxShadow: '0 12px 30px rgba(0,0,0,0.12)' }
                }}>
                    <Box sx={{ position: 'relative', height: 250, overflow: 'hidden' }}>
                        <CardMedia
                            component="img"
                            image={destination.image || 'https://virgin-travel-app.b-cdn.net/common/placeholder.jpg'}
                            alt={destination.name}
                            sx={{
                                height: '100%',
                                width: '100%',
                                transition: 'transform 0.5s ease',
                                '&:hover': { transform: 'scale(1.05)' }
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.6) 100%)',
                            }}
                        />
                        <Typography
                            variant="h5"
                            component="h3"
                            sx={{
                                position: 'absolute',
                                bottom: 16,
                                left: 16,
                                color: 'white',
                                fontWeight: 700,
                                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                            }}
                        >
                            {destination.name}
                        </Typography>
                    </Box>
                    <CardContent sx={{ p: 3 }}>

                        <Typography variant="body2" color="text.secondary" sx={{
                            mb: 2,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            height: 60
                        }}>
                            {destination.shortDescription || 'Discover this amazing destination...'}
                        </Typography>

                        <Typography
                            variant="button"
                            color="primary"
                            fontWeight="bold"
                            sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '0.85rem' }}
                        >
                            Explore Destination <ArrowRight size={16} />
                        </Typography>
                    </CardContent>
                </Card>
            </motion.div>
        </Link>
    );
}
