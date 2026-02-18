'use client';

import { Box, Container, Grid, Typography } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function AboutHero() {
    const scrollRef = useRef(null);
    const { scrollY } = useScroll({ target: scrollRef, offset: ["start start", "end start"] });
    const y = useTransform(scrollY, [0, 500], [0, 150]);

    return (
        <Box ref={scrollRef} overflow="hidden">
            {/* Hero Section */}
            <Box
                position="relative"
                height="60vh"
                minHeight={500}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <motion.div
                    style={{
                        position: 'absolute',
                        top: 0, left: 0, width: '100%', height: '120%', zIndex: -1, y,
                        backgroundImage: 'url(https://images.pexels.com/photos/5405597/pexels-photo-5405597.jpeg)', // Scenic tea plantation
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Box position="absolute" top={0} left={0} width="100%" height="100%" bgcolor="black" sx={{ opacity: 0.4 }} />

                <Container sx={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white' }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                        <Typography variant="h1" fontWeight={800} sx={{ fontFamily: 'serif', mb: 2 }}>
                            Curators of Wonder
                        </Typography>
                        <Typography variant="h6" fontWeight={300} maxWidth={700} mx="auto">
                            Crafting unforgettable journeys through the heart of Sri Lanka.
                        </Typography>

                    </motion.div>
                </Container>
            </Box>

            {/* Our Story */}
            <Container sx={{ py: 10 }}>
                <Grid container spacing={8} alignItems="center">
                    <Grid size={{ xs: 12, md: 6 }}>
                        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                            <Box
                                component="img"
                                src="https://images.pexels.com/photos/2104152/pexels-photo-2104152.jpeg" // Travel Guide/Local
                                alt="Our Story"
                                sx={{ width: '100%', borderRadius: 8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                            />
                        </motion.div>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                            <Typography variant="overline" color="secondary" fontWeight="bold">Our Story</Typography>
                            <Typography variant="h3" fontWeight="bold" sx={{ fontFamily: 'serif', mb: 3 }}>
                                Company’s Journey
                            </Typography>
                            <Typography color="text.secondary" paragraph lineHeight={1.8}>
                                At Eye Tour Lanka, our journey began with a shared passion for exploring the landscapes and rich heritage of Sri Lanka. Founded by seasoned travel enthusiasts, we set out with a vision to create unforgettable experiences for globetrotters who wish to discover the unique beauty of our island nation. Over the years, we have transformed from a small group of local guides into a trusted tour operator, cultivating relationships with local communities, conservation groups, and travelers from all around the globe.
                            </Typography>

                            <Typography variant="h4" fontWeight="bold" sx={{ fontFamily: 'serif', mt: 4, mb: 2 }}>
                                Purpose and Goals
                            </Typography>
                            <Typography color="text.secondary" paragraph lineHeight={1.8}>
                                Our purpose is simple: to connect travelers with the serene and majestic beauty of Sri Lanka. We strive to provide our clients with authentic experiences, ensuring that each tour is not just a visit but a cherished memory.
                            </Typography>
                            <Typography color="text.secondary" paragraph lineHeight={1.8}>
                                Our goals revolve around sustainable tourism, emphasizing the importance of preserving the natural landscapes and cultural heritage of our island. We aim to promote responsible travel that benefits local communities while offering our guests a deep, immersive insight into Sri Lanka’s history and ecology.
                            </Typography>
                        </motion.div>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
