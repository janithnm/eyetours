'use client';

import { Box, Typography, Button, Container } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import Link from 'next/link';

const slides = [
    {
        type: 'video',
        src: 'https://virgin-travel-app.b-cdn.net/eyetours/videos/seamless-lanka.mp4',
        title: "Discover Beauty of Sri Lanka",
        subtitle: "Unforgettable tours crafted for families, couples, and groups. Your dream vacation awaits!",
        order: 1,
    },

    // {
    //     type: 'video',
    //     src: 'https://virgin-travel-app.b-cdn.net/eyetours/assets/srian.mov',
    //     title: "Discover Sri Lanka",
    //     subtitle: "Experience the pearl of the Indian Ocean",
    //     order: 2,
    // },

    {
        type: 'video',
        src: 'https://virgin-travel-app.b-cdn.net/eyetours/videos/Sri%20Lanka%2C%20Your%20Destination%20for%202026%20-%20Sri%20Lanka%20Tourism%20(1080p%2C%20h264).mp4',
        title: "",
        subtitle: "", // Placeholder or keep empty if desired, but user asked for scenic content.
        order: 3,
    },

];

export default function HeroSection() {
    return (
        <Box sx={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden' }}>
            <Swiper
                modules={[Autoplay, EffectFade, Pagination]}
                effect="fade"
                speed={1500}
                autoplay={{ delay: 20000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop={true}
                style={{ height: '100%', width: '100%' }}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        {({ isActive }) => (
                            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                                {/* Background Media */}
                                {slide.type === 'video' ? (
                                    <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                                        <video
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            disablePictureInPicture
                                            style={{
                                                objectFit: 'cover',
                                                width: '100%',
                                                height: '100%',
                                                filter: 'brightness(0.7)' // slightly dark for text readability
                                            }}
                                        >
                                            <source src={slide.src} type="video/mp4" />
                                        </video>
                                    </Box>
                                ) : (
                                    <Box
                                        component="img"
                                        src={slide.src}
                                        alt={slide.title}
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            // animation: isActive ? 'panScale 8s linear forwards' : 'none', // Removed as 'panScale' is not defined
                                        }}
                                    />
                                )}

                                {/* Gradient Overlay */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.4) 100%)',
                                        zIndex: 1,
                                    }}
                                />

                                {/* Content */}
                                <Container maxWidth="lg" sx={{ height: '100%', position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'white' }}>
                                    {isActive && (
                                        <>
                                            <motion.div
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.8, delay: 0.2 }}
                                            >
                                                <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '5rem' }, mb: 2, textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                                                    {slide.title}
                                                </Typography>
                                            </motion.div>
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.8, delay: 0.4 }}
                                            >
                                                <Typography variant="h4" sx={{ fontWeight: 300, mb: 4, maxWidth: '800px', mx: 'auto' }}>
                                                    {slide.subtitle}
                                                </Typography>

                                                {slide.order === 1 && (
                                                    <Button variant="contained" color="secondary" size="large" sx={{ fontSize: '1.1rem', px: 5, py: 1.5 }}>
                                                        <Link href="/planner">
                                                            Book Now
                                                        </Link>
                                                    </Button>
                                                )}
                                            </motion.div>
                                        </>
                                    )}
                                </Container>
                            </Box>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
}
