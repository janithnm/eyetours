'use client';

import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, useTheme, useMediaQuery, Skeleton, alpha } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { getActiveCategories } from '@/app/actions/categories';

const defaultMap = '/test.png';

export default function CategoryMapSection() {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await getActiveCategories();
            if (res.success && res.data) {
                // Transform data to match component needs and distribute positions
                const formatted = res.data.map((cat, index) => ({
                    id: cat.id.toString(),
                    label: cat.name,
                    thumbnail: cat.image || defaultMap, // Use uploaded image for card, fallback to default
                    mapImage: null, // Don't use uploaded image for map overlay unless specifically a map
                    position: index % 2 === 0 ? 'left' : 'right', // Simple alternating distribution
                    link: `/tours?category=${encodeURIComponent(cat.slug)}`
                }));
                setCategories(formatted);
            }
            setLoading(false);
        };
        fetchCategories();
    }, []);

    if (loading) {
        return (
            <Box py={12} bgcolor="background.default">
                <Container>
                    <Skeleton variant="text" width={200} sx={{ mx: 'auto', mb: 2 }} />
                    <Skeleton variant="text" width={400} height={60} sx={{ mx: 'auto', mb: 8 }} />
                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, md: 4 }}><Skeleton variant="rectangular" height={300} /></Grid>
                        <Grid size={{ xs: 12, md: 4 }}><Skeleton variant="circular" width={300} height={300} sx={{ mx: 'auto' }} /></Grid>
                        <Grid size={{ xs: 12, md: 4 }}><Skeleton variant="rectangular" height={300} /></Grid>
                    </Grid>
                </Container>
            </Box>
        );
    }

    if (categories.length === 0) return null;

    return (
        <Box
            py={12}
            sx={{
                background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Ambient Background Elements */}
            <Box sx={{
                position: 'absolute',
                top: '10%',
                left: '-5%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(var(--primary-rgb), 0.03) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: 0,
            }} />
            <Box sx={{
                position: 'absolute',
                bottom: '10%',
                right: '-5%',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(var(--secondary-rgb), 0.03) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: 0,
            }} />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <Box textAlign="center" mb={8}>
                        <Typography
                            variant="h6"
                            color="secondary.main"
                            gutterBottom
                            sx={{ fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem' }}
                        >
                            Explore
                        </Typography>
                        <Typography
                            variant="h2"
                            mb={2}
                            sx={{
                                fontFamily: 'serif',
                                fontWeight: 800,
                                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Our Island, Your Adventure
                        </Typography>
                        <Box display="flex" justifyContent="center">
                            <Link href="/tours" style={{ textDecoration: 'none' }}>
                                <Typography
                                    variant="button"
                                    color="text.secondary"
                                    sx={{
                                        borderBottom: '2px solid white',
                                        pb: 0.5,
                                        cursor: 'pointer',
                                        '&:hover': { opacity: 0.8 }
                                    }}
                                >
                                    View All Categories
                                </Typography>
                            </Link>
                        </Box>
                    </Box>

                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        {/* Left Categories - Desktop Only */}
                        <Grid size={{ xs: 12, md: 3 }} sx={{ display: { xs: 'none', md: 'block' } }}>
                            <Box display="flex" flexDirection="column" gap={2} alignItems="flex-end" width="100%">
                                {categories.filter(c => c.position === 'left').map((category, index) => (
                                    <CategoryItem
                                        key={category.id}
                                        category={category}
                                        isActive={activeCategory === category.id}
                                        onHover={setActiveCategory}
                                        isRight={false}
                                        index={index}
                                    />
                                ))}
                            </Box>
                        </Grid>

                        {/* Center Map */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            {/* Mobile Active Category Display */}
                            <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 2, textAlign: 'center', height: 60 }}>
                                <AnimatePresence mode='wait'>
                                    <motion.div
                                        key={activeCategory || 'default'}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Typography variant="h5" fontWeight={700} color="primary.main">
                                            {activeCategory ? categories.find(c => c.id === activeCategory)?.label : 'Explore Categories'}
                                        </Typography>
                                        {activeCategory && (
                                            <Link href={categories.find(c => c.id === activeCategory)?.link || '#'} passHref>
                                                <Typography variant="button" color="text.secondary" sx={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                                                    View Tours <ArrowRight size={14} />
                                                </Typography>
                                            </Link>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </Box>

                            <Box
                                position="relative"
                                width="100%"
                                height={{ xs: 400, md: 600 }}
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                {/* Map Glow Effect */}
                                <Box sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '80%',
                                    height: '80%',
                                    background: 'radial-gradient(circle, rgba(var(--primary-rgb), 0.08) 0%, transparent 70%)',
                                    zIndex: -1,
                                }} />

                                {/* Base Map - Always Visible */}
                                <img
                                    src={defaultMap}
                                    alt="Sri Lanka Map Base"
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        objectFit: 'contain',
                                        filter: 'drop-shadow(0px 15px 30px rgba(0,0,0,0.15))',
                                        position: 'absolute',
                                        top: 0, left: 0, right: 0, bottom: 0,
                                        margin: 'auto',
                                        zIndex: 0
                                    }}
                                />

                                {/* Overlay Map - Fades in/out */}
                                <AnimatePresence>
                                    {activeCategory && categories.find(c => c.id === activeCategory)?.mapImage && (
                                        <motion.img
                                            key={activeCategory} // Key by category ID to trigger animation on switch
                                            src={categories.find(c => c.id === activeCategory)?.mapImage}
                                            alt="Category Route"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                                objectFit: 'contain',
                                                filter: 'drop-shadow(0px 15px 30px rgba(0,0,0,0.15))',
                                                position: 'absolute',
                                                top: 0, left: 0, right: 0, bottom: 0,
                                                margin: 'auto',
                                                zIndex: 1
                                            }}
                                        />
                                    )}
                                </AnimatePresence>
                            </Box>

                            {/* Mobile Navigation Buttons */}
                            <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center', gap: 2, mt: 4, flexWrap: 'wrap' }}>
                                {categories.map((category) => (
                                    <Box
                                        key={category.id}
                                        onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                                        sx={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: '50%',
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            border: '2px solid',
                                            borderColor: activeCategory === category.id ? 'primary.main' : 'transparent',
                                            boxShadow: activeCategory === category.id ? '0 4px 12px rgba(0,0,0,0.2)' : '0 2px 5px rgba(0,0,0,0.1)',
                                            transition: 'all 0.3s ease',
                                            transform: activeCategory === category.id ? 'scale(1.1)' : 'scale(1)',
                                            position: 'relative'
                                        }}
                                    >
                                        <img
                                            src={category.thumbnail}
                                            alt={category.label}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        </Grid>

                        {/* Right Categories - Desktop Only */}
                        <Grid size={{ xs: 12, md: 3 }} sx={{ display: { xs: 'none', md: 'block' } }}>
                            <Box display="flex" flexDirection="column" gap={2} alignItems="flex-start" width="100%">
                                {categories.filter(c => c.position === 'right').map((category, index) => (
                                    <CategoryItem
                                        key={category.id}
                                        category={category}
                                        isActive={activeCategory === category.id}
                                        onHover={setActiveCategory}
                                        isRight={true}
                                        index={index}
                                    />
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                </motion.div>
            </Container>
        </Box>
    );
}

function CategoryItem({ category, isActive, onHover, isRight, index }: { category: any, isActive: boolean, onHover: (id: string | null) => void, isRight: boolean, index: number }) {
    const theme = useTheme();

    return (
        <Link href={category.link} style={{ textDecoration: 'none', width: '100%', maxWidth: 320, position: 'relative' }}>
            <motion.div
                onMouseEnter={() => onHover(category.id)}
                onMouseLeave={() => onHover(null)}
                initial={{ x: isRight ? 20 : -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: isRight ? -5 : 5 }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end', // Always align towards the 'end' (which swaps based on row-reverse)
                        gap: 2,
                        flexDirection: isRight ? 'row-reverse' : 'row',
                        p: 2,
                        borderRadius: 4,
                        // Glassmorphism aesthetic with distinct background
                        // Glassmorphism aesthetic with distinct background
                        background: isActive
                            ? `linear-gradient(135deg, ${alpha('#3b82f6', 0.2)} 0%, ${alpha('#3b82f6', 0.05)} 100%)`
                            : `linear-gradient(135deg, ${alpha('#93c5fd', 0.2)} 0%, ${alpha('#93c5fd', 0.1)} 100%)`,
                        backdropFilter: 'blur(20px)',
                        boxShadow: isActive
                            ? `0 20px 40px ${alpha('#3b82f6', 0.25)}`
                            : `0 4px 15px ${alpha('#93c5fd', 0.1)}`,
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer',
                        border: '1px solid',
                        borderColor: isActive ? '#60a5fa' : alpha('#93c5fd', 0.4), // Aesthetic matching border

                        overflow: 'hidden', // Contain content

                        '&:before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            borderRadius: 4,
                            padding: '1px',
                            background: isActive
                                ? 'linear-gradient(45deg, #FF6B6B, #4ECDC4)'
                                : 'transparent',
                            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor',
                            maskComposite: 'exclude',
                            opacity: isActive ? 0.3 : 0,
                            transition: 'opacity 0.3s ease',
                            pointerEvents: 'none'
                        },

                        '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.85)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
                            borderColor: 'primary.main',
                        }
                    }}
                >
                    {/* Background decoration for "scenic" feel */}
                    {isActive && (
                        <Box sx={{
                            position: 'absolute',
                            right: isRight ? -20 : 'auto',
                            left: isRight ? 'auto' : -20,
                            top: -20,
                            width: 100,
                            height: 100,
                            background: 'radial-gradient(circle, rgba(var(--primary-rgb), 0.1) 0%, transparent 70%)',
                            borderRadius: '50%',
                            zIndex: -1,
                        }} />
                    )}

                    {/* Label */}
                    <Box textAlign={isRight ? 'left' : 'right'}>
                        <Typography
                            variant="h6"
                            fontWeight={700}
                            color={isActive ? 'primary.main' : 'text.primary'}
                            sx={{
                                fontSize: '1.05rem',
                                letterSpacing: '0.01em',
                                transition: 'color 0.3s ease',
                                mb: 0.5,
                                textTransform: 'uppercase',
                                fontFamily: '"Outfit", sans-serif', // Ensure we use the nice font if available, fallback to theme
                            }}
                        >
                            {category.label}
                        </Typography>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                                display: { xs: 'none', lg: 'block' },
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                opacity: 0.7
                            }}
                        >
                            Explore Collection
                        </Typography>
                    </Box>

                    {/* Thumbnail Image */}
                    <Box
                        sx={{
                            width: 64,
                            height: 64,
                            borderRadius: '16px',
                            overflow: 'hidden',
                            flexShrink: 0,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            transition: 'all 0.3s ease',
                            border: '2px solid',
                            borderColor: isActive ? 'primary.main' : 'white',
                            position: 'relative',
                        }}
                    >
                        <img
                            src={category.thumbnail}
                            alt={category.label}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        {/* Overlay on thumbnail for active state */}
                        <Box sx={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            bgcolor: isActive ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.05)',
                            transition: 'background-color 0.3s'
                        }} />
                    </Box>
                </Box>
            </motion.div>
        </Link>
    )
}
