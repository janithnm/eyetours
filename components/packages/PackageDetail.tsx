'use client';

import { Package } from '@/app/actions/packages';
import {
    Box, Container, Grid, Typography, Chip, Divider,
    List, ListItem, ListItemIcon, ListItemText, Paper, Stack,
    Accordion, AccordionSummary, AccordionDetails, IconButton
} from '@mui/material';
import {
    Calendar, Map, CheckCircle2, XCircle, Clock, MapPin, DollarSign, ChevronDown, ChevronLeft, ChevronRight
} from 'lucide-react';
import InquiryForm from './InquiryForm';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PackageDetail({ pkg, showPrice = true }: { pkg: Package, showPrice?: boolean }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = pkg.images && pkg.images.length > 0 ? pkg.images : [pkg.thumbnailUrl || '/placeholder-tour.jpg'];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [images.length]);

    const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

    return (
        <Box pb={10} bgcolor="background.default">
            {/* Hero Carousel */}
            <Box
                height={{ xs: 400, md: 600 }}
                width="100%"
                position="relative"
                overflow="hidden"
            >
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url(${images[currentImageIndex]})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                </AnimatePresence>

                {/* Carousel Controls */}
                {images.length > 1 && (
                    <Box sx={{ position: 'absolute', top: '50%', width: '100%', display: 'flex', justifyContent: 'space-between', px: 2, transform: 'translateY(-50%)', zIndex: 2 }}>
                        <IconButton onClick={prevImage} sx={{ color: 'white', bgcolor: 'rgba(0,0,0,0.3)', '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' } }}>
                            <ChevronLeft />
                        </IconButton>
                        <IconButton onClick={nextImage} sx={{ color: 'white', bgcolor: 'rgba(0,0,0,0.3)', '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' } }}>
                            <ChevronRight />
                        </IconButton>
                    </Box>
                )}

                <Container sx={{ position: 'absolute', bottom: 48, left: 0, right: 0, zIndex: 2 }}>
                    {pkg.isFeatured && (
                        <Chip label="Featured Tour" color="secondary" sx={{ mb: 2, fontWeight: 'bold' }} />
                    )}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Typography variant="h2" color="white" fontWeight={800} sx={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)', fontFamily: 'serif' }}>
                            {pkg.title}
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} mt={2} color="white">
                            <Box display="flex" alignItems="center" gap={1}>
                                <Clock size={20} />
                                <Typography variant="h6">{pkg.durationDays} Days</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                                <MapPin size={20} />
                                <Typography variant="h6">Sri Lanka</Typography>
                            </Box>
                            {showPrice && (
                                <Box display="flex" alignItems="center" gap={1}>
                                    <DollarSign size={20} />
                                    <Typography variant="h6">From ${pkg.price}</Typography>
                                </Box>
                            )}
                        </Stack>
                    </motion.div>
                </Container>
            </Box>

            <Container sx={{ mt: 6 }}>
                <Grid container spacing={6}>
                    {/* Left Column: Content */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Box mb={6}>
                            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ fontFamily: 'serif' }}>
                                Overview
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>
                                {pkg.description}
                            </Typography>
                        </Box>

                        <Divider sx={{ my: 6 }} />

                        <Box mb={6}>
                            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ fontFamily: 'serif' }}>
                                Itinerary
                            </Typography>
                            <Box mt={4}>
                                {pkg.itinerary && Array.isArray(pkg.itinerary) && pkg.itinerary.map((day: any, index: number) => (
                                    <Paper
                                        key={index}
                                        elevation={0}
                                        sx={{
                                            p: 0,
                                            mb: 4,
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            borderRadius: 4,
                                            overflow: 'hidden',
                                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: '0 12px 24px rgba(0,0,0,0.1)'
                                            }
                                        }}
                                    >
                                        {/* Day Image if available */}
                                        {day.image && (
                                            <Box
                                                height={200}
                                                width="100%"
                                                sx={{
                                                    backgroundImage: `url(${day.image})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    position: 'relative'
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        bottom: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        height: '50%',
                                                        background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)'
                                                    }}
                                                />
                                            </Box>
                                        )}

                                        <Box p={3}>
                                            <Stack direction="row" spacing={2} alignItems="flex-start">
                                                <Box
                                                    bgcolor="primary.main"
                                                    color="white"
                                                    width={40}
                                                    height={40}
                                                    borderRadius="50%"
                                                    display="flex"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    flexShrink={0}
                                                    fontWeight="bold"
                                                    sx={{ mt: day.image ? -5 : 0, zIndex: 1, border: '4px solid white', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                                                >
                                                    {day.day}
                                                </Box>
                                                <Box width="100%">
                                                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mt: day.image ? 0.5 : 0 }}>
                                                        {day.title}
                                                    </Typography>
                                                    <Box mt={2}>
                                                        {day.activities && day.activities.map((activity: any, idx: number) => (
                                                            <Accordion key={idx} disableGutters elevation={0} sx={{ '&:before': { display: 'none' }, border: '1px solid', borderColor: 'divider', mb: 1, borderRadius: '8px !important' }}>
                                                                <AccordionSummary expandIcon={<ChevronDown size={20} />}>
                                                                    <Stack direction="row" alignItems="center" spacing={1}>
                                                                        <Map size={16} color="gray" />
                                                                        <Typography fontWeight="medium">{activity.title}</Typography>
                                                                    </Stack>
                                                                </AccordionSummary>
                                                                <AccordionDetails>
                                                                    <Typography variant="body2" color="text.secondary">
                                                                        {activity.description}
                                                                    </Typography>
                                                                </AccordionDetails>
                                                            </Accordion>
                                                        ))}
                                                    </Box>
                                                </Box>
                                            </Stack>
                                        </Box>
                                    </Paper>
                                ))}
                            </Box>
                        </Box>

                        <Grid container spacing={4}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="h5" fontWeight="bold" gutterBottom color="success.main">
                                    Inclusions
                                </Typography>
                                <List>
                                    {pkg.inclusions && Array.isArray(pkg.inclusions) && pkg.inclusions.map((item: string, idx: number) => (
                                        <ListItem key={idx} disablePadding sx={{ py: 0.5 }}>
                                            <ListItemIcon sx={{ minWidth: 32, color: 'success.main' }}>
                                                <CheckCircle2 size={20} />
                                            </ListItemIcon>
                                            <ListItemText primary={item} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="h5" fontWeight="bold" gutterBottom color="error.main">
                                    Exclusions
                                </Typography>
                                <List>
                                    {pkg.exclusions && Array.isArray(pkg.exclusions) && pkg.exclusions.map((item: string, idx: number) => (
                                        <ListItem key={idx} disablePadding sx={{ py: 0.5 }}>
                                            <ListItemIcon sx={{ minWidth: 32, color: 'error.main' }}>
                                                <XCircle size={20} />
                                            </ListItemIcon>
                                            <ListItemText primary={item} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Right Column: Inquiry Form */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box position={{ md: 'sticky' }} top={100}>
                            <InquiryForm packageId={pkg.id} packageTitle={pkg.title} />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
