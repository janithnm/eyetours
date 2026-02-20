'use client';

import { Package } from '@/app/actions/packages';
import { Box, Card, CardContent, CardMedia, Chip, Typography, Button, Stack } from '@mui/material';
import { CalendarDays, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface PackageCardProps {
    pkg: Package;
    showPrice?: boolean;
}

export default function PackageCard({ pkg, showPrice = true }: PackageCardProps) {
    return (
        <Card
            component={motion.div}
            whileHover={{ y: -8, boxShadow: '0 12px 40px rgba(0,0,0,0.1)' }}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 4,
                overflow: 'hidden',
                border: 'none',
                backgroundColor: 'background.paper',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
            }}
        >
            <Box position="relative">
                <CardMedia
                    component="img"
                    height="280"
                    image={pkg.thumbnailUrl || '/placeholder-tour.jpg'}
                    alt={pkg.title}
                    sx={{ objectFit: 'cover', height: "280px" }}
                />
                {showPrice && (
                    <Box
                        position="absolute"
                        top={16}
                        right={16}
                        sx={{
                            backdropFilter: 'blur(4px)',
                        }}
                        borderRadius={2}
                        px={1.5}
                        py={0.5}
                    >
                        <Typography variant="subtitle2" fontWeight="bold" color="primary.main">
                            ${pkg.price}
                        </Typography>
                    </Box>
                )}
                {pkg.isFeatured && (
                    <Box position="absolute" top={16} left={16}>
                        <Chip label="Featured" color="secondary" size="small" sx={{ fontWeight: 600 }} />
                    </Box>
                )}
            </Box>

            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2, p: 3 }}>
                <Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ lineHeight: 1.2 }}>
                        {pkg.title}
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center" color="text.secondary" mb={1}>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                            <Clock size={16} />
                            <Typography variant="body2">{pkg.durationDays} Days</Typography>
                        </Stack>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                            <MapPin size={16} />
                            <Typography variant="body2">Sri Lanka</Typography>
                        </Stack>
                    </Stack>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    mb: 'auto'
                }}>
                    {pkg.description}
                </Typography>

                <Button
                    variant="contained"
                    fullWidth
                    component={Link}
                    href={`/tours/${pkg.slug}`}
                    sx={{
                        borderRadius: 3,
                        py: 1.2,
                        textTransform: 'none',
                        fontWeight: 600,
                        mt: 2,
                        boxShadow: 'none',
                        '&:hover': {
                            boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
                        }
                    }}
                >
                    View Details
                </Button>
            </CardContent>
        </Card>
    );
}
