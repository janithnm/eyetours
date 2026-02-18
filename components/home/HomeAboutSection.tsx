'use client';

import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomeAboutSection() {
    return (
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper', overflow: 'hidden' }}>
            <Container maxWidth="lg">
                <Grid container spacing={6} alignItems="center">
                    <Grid size={{ xs: 12, md: 6 }}>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <Box sx={{
                                position: 'relative',
                                height: { xs: 300, md: 500 },
                                width: '100%',
                                borderRadius: 8,
                                overflow: 'hidden',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                            }}>
                                <Box
                                    component="img"
                                    src="https://virgin-travel-app.b-cdn.net/eyetours/assets/dabulla.jpg" // Using an existing asset or placeholder
                                    alt="About Eye Tour Lanka"
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s ease',
                                        '&:hover': { transform: 'scale(1.05)' }
                                    }}
                                />
                                <Box sx={{
                                    position: 'absolute',
                                    bottom: -50,
                                    right: -50,
                                    width: 200,
                                    height: 200,
                                    borderRadius: '50%',
                                    bgcolor: 'secondary.main',
                                    opacity: 0.1,
                                    zIndex: 0
                                }} />
                            </Box>
                        </motion.div>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <Typography variant="overline" color="primary" fontWeight="bold" letterSpacing={2}>
                                Welcome
                            </Typography>
                            <Typography variant="h2" gutterBottom sx={{ fontFamily: 'serif', mb: 3 }}>
                                Eye Tour Lanka
                            </Typography>
                            <Typography variant="body1" paragraph color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                                Eye Tour Lanka is dedicated to providing exceptional travel experiences in Sri Lanka. Our passion for this beautiful island nation drives us to take every traveler beyond the ordinary. We believe in responsible tourism, supporting local communities, and protecting our stunning natural environment.
                            </Typography>
                            <Typography variant="body1" paragraph color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                                Our mission is to ensure that every journey you embark on with us will remain etched in your memory long after your trip ends. We offer a diverse range of tour packages, from relaxing beach holidays to adventurous hikes through lush jungles.
                            </Typography>
                            <Typography variant="body1" paragraph color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 4 }}>
                                Your comfort and enjoyment are at the heart of what we do, and we pride ourselves in providing unparalleled service and attention to detail.
                            </Typography>
                            <Link href="/about" passHref>
                                <Button variant="outlined" color="primary" size="large" sx={{ borderRadius: 50, px: 4 }}>
                                    Read More
                                </Button>
                            </Link>
                        </motion.div>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
