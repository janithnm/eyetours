'use client';

import { Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function BlogContent({ content, images }: { content: string | null, images?: string[] }) {
    if (!content) return null;

    return (
        <Box>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <Box
                    className="blog-content"
                    sx={{
                        '& h2': { fontFamily: 'serif', mt: 4, mb: 2, fontWeight: 'bold' },
                        '& h3': { fontFamily: 'serif', mt: 3, mb: 2, fontWeight: 'bold' },
                        '& p': { mb: 2, lineHeight: 1.8, fontSize: '1.1rem', color: 'text.secondary' },
                        '& ul, & ol': { mb: 3, pl: 4 },
                        '& li': { mb: 1, lineHeight: 1.8, color: 'text.secondary' },
                        '& blockquote': {
                            borderLeft: '4px solid',
                            borderColor: 'secondary.main',
                            pl: 3,
                            py: 1,
                            my: 4,
                            bgcolor: 'action.hover',
                            fontStyle: 'italic',
                            borderRadius: '0 8px 8px 0'
                        },
                        '& img': {
                            maxWidth: '100%',
                            height: 'auto',
                            borderRadius: 4,
                            my: 4,
                            boxShadow: 3
                        },
                        '& a': { color: 'primary.main', textDecoration: 'underline' }
                    }}
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </motion.div>

            {/* Scenic Image Gallery */}
            {images && images.length > 0 && (
                <Box mt={8} mb={6}>
                    <Typography variant="h4" fontWeight="bold" sx={{ fontFamily: 'serif', mb: 4, textAlign: 'center' }}>
                        Visual Journey
                    </Typography>
                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: 1000,
                            mx: 'auto',
                            borderRadius: 4,
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                            '& .swiper-pagination-bullet-active': { bgcolor: 'secondary.main' },
                            '& .swiper-button-next, & .swiper-button-prev': { color: 'white' }
                        }}
                    >
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay, EffectFade]}
                            spaceBetween={0}
                            slidesPerView={1}
                            effect="fade"
                            navigation
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 5000, disableOnInteraction: false }}
                            loop={true}
                            style={{ width: '100%', height: '500px' }}
                        >
                            {images.map((img, idx) => (
                                <SwiperSlide key={idx}>
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={img}
                                            alt={`Gallery image ${idx + 1}`}
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                width: '100%',
                                                padding: 4,
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                                                color: 'white'
                                            }}
                                        >
                                            <Typography variant="subtitle1" fontWeight="medium">
                                                Moment {idx + 1}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Box>
                </Box>
            )}
        </Box >
    );
}
