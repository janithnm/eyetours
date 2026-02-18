'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, useTheme, useMediaQuery, Skeleton, alpha, Pagination } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { getGalleryItems } from '@/app/actions/gallery';

export default function GalleryPage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const ITEMS_PER_PAGE = 9;

    useEffect(() => {
        const fetchGallery = async () => {
            setLoading(true);
            const res = await getGalleryItems(true, page, ITEMS_PER_PAGE);
            if (res.success && res.data) {
                setItems(res.data);
                if (res.pagination) {
                    setTotalPages(res.pagination.totalPages);
                }
            }
            setLoading(false);
        };
        fetchGallery();
    }, [page]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const heroVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: "easeOut" as const,
                staggerChildren: 0.2
            }
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#FAFAFA' }}>
            {/* Parallax Hero Section */}
            <Box
                component={motion.div}
                initial="hidden"
                animate="visible"
                variants={heroVariants}
                sx={{
                    height: '60vh',
                    width: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textAlign: 'center'
                }}
            >
                {/* Background Image */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url('https://virgin-travel-app.b-cdn.net/eyetours/assets/plant.jpeg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed',
                        zIndex: 0,
                        filter: 'brightness(0.9)'
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
                        zIndex: 1
                    }}
                />

                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
                    <motion.div variants={heroVariants}>
                        <Typography
                            variant="overline"
                            sx={{
                                letterSpacing: 6,
                                mb: 2,
                                display: 'block',
                                color: 'rgba(255,255,255,0.9)',
                                fontWeight: 500
                            }}
                        >
                            VISUAL JOURARY
                        </Typography>
                        <Typography
                            variant={isMobile ? "h3" : "h1"}
                            sx={{
                                fontFamily: 'serif',
                                fontWeight: 400,
                                mb: 3,
                                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                                fontSize: { xs: '2.5rem', md: '4.5rem' }
                            }}
                        >
                            Sri Lanka Unfolded
                        </Typography>
                    </motion.div>
                </Container>
            </Box>

            {/* Gallery Grid */}
            <Container maxWidth="lg" sx={{ mt: -8, position: 'relative', zIndex: 3, pb: 12 }}>
                {loading ? (
                    <Grid container spacing={3}>
                        {[...Array(6)].map((_, i) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                                <Skeleton variant="rectangular" height={360} sx={{ borderRadius: 2 }} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <>
                        <Grid container spacing={3}>
                            {items.map((item, index) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                        style={{ height: '100%' }}
                                    >
                                        <Box
                                            onClick={() => setSelectedId(selectedId === item.id ? null : item.id)}
                                            sx={{
                                                bgcolor: 'white',
                                                borderRadius: 2,
                                                overflow: 'hidden',
                                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                                transition: 'all 0.3s ease',
                                                cursor: 'pointer',
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                '&:hover': {
                                                    transform: 'translateY(-5px)',
                                                    boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
                                                }
                                            }}
                                        >
                                            <Box sx={{ position: 'relative', overflow: 'hidden', paddingTop: '66.66%' }}>
                                                <Box
                                                    component="img"
                                                    src={item.image}
                                                    alt={item.title}
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        transition: 'transform 0.6s ease',
                                                        '&:hover': { transform: 'scale(1.05)' }
                                                    }}
                                                />
                                            </Box>

                                            <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                                <Box display="flex" alignItems="center" gap={1} mb={1.5}>
                                                    <MapPin size={14} color={theme.palette.primary.main} />
                                                    <Typography variant="caption" color="text.secondary" fontWeight="bold" letterSpacing={1}>
                                                        {item.location || 'SRI LANKA'}
                                                    </Typography>
                                                </Box>

                                                <Typography variant="h6" sx={{ fontFamily: 'serif', mb: 1, fontWeight: 600, lineHeight: 1.3 }}>
                                                    {item.title}
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{
                                                        lineHeight: 1.6,
                                                        display: '-webkit-box',
                                                        overflow: 'hidden',
                                                        WebkitBoxOrient: 'vertical',
                                                        WebkitLineClamp: selectedId === item.id ? 'none' : 3,
                                                        mb: 2,
                                                    }}
                                                >
                                                    {item.description}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>

                        {/* Pagination */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                                size={isMobile ? "medium" : "large"}
                                showFirstButton
                                showLastButton
                            />
                        </Box>
                    </>
                )}
            </Container>
        </Box>
    );
}
