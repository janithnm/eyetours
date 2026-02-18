'use client';

import { Box, Container, Typography, Grid, Link, IconButton } from '@mui/material';
import Image from 'next/image';
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
    settings?: any;
}

export default function MainFooter({ settings = {} }: FooterProps) {
    return (
        <Box component="footer" sx={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)',
            color: 'white',
            py: 8,
            mt: 'auto',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Ambient Overlay for scenic feel */}
            <Box sx={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                background: 'radial-gradient(circle at top right, rgba(255,255,255,0.05), transparent 40%)',
                pointerEvents: 'none'
            }} />
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box mb={2}>
                            <Image
                                src="/logo.png"
                                alt="TravelMaster Logo"
                                width={150}
                                height={60}
                                style={{ objectFit: 'contain' }}
                            />
                        </Box>
                        <Typography variant="body2" color="neutral.light">
                            Crafting unforgettable high-end travel experiences in Sri Lanka.
                        </Typography>
                        <Box mt={2} display="flex" gap={1}>
                            {settings.facebook && (
                                <IconButton component={Link} href={settings.facebook} target="_blank" color="inherit">
                                    <Facebook size={20} />
                                </IconButton>
                            )}
                            {settings.instagram && (
                                <IconButton component={Link} href={settings.instagram} target="_blank" color="inherit">
                                    <Instagram size={20} />
                                </IconButton>
                            )}
                            {settings.youtube && (
                                <IconButton component={Link} href={settings.youtube} target="_blank" color="inherit">
                                    <Youtube size={20} />
                                </IconButton>
                            )}
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 6, md: 4 }}>
                        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                            Explore
                        </Typography>
                        <Box display="flex" flexDirection="column" gap={1}>
                            <Link href="/packages" color="inherit" underline="hover">Tour Packages</Link>
                            <Link href="/planner" color="inherit" underline="hover">Plan Your Trip</Link>
                            <Link href="/about" color="inherit" underline="hover">About Us</Link>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 6, md: 4 }}>
                        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                            Contact
                        </Typography>
                        <Box display="flex" flexDirection="column" gap={2}>
                            {settings.email && (
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Mail size={16} />
                                    <Typography variant="body2">{settings.email}</Typography>
                                </Box>
                            )}
                            {settings.phone && (
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Phone size={16} />
                                    <Typography variant="body2">
                                        {settings.phone}
                                        {settings.hotline && ` / Hotline ${settings.hotline}`}
                                    </Typography>
                                </Box>
                            )}
                            {settings.address && (
                                <Box display="flex" alignItems="center" gap={1}>
                                    <MapPin size={16} />
                                    <Typography variant="body2">{settings.address}</Typography>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                </Grid>
                <Box mt={8} pt={4} borderTop="1px solid rgba(255,255,255,0.1)" textAlign="center" className="flex flex-col md:flex-row justify-center items-center md:justify-between">
                    <Typography variant="body2" color="neutral.light">
                        © {new Date().getFullYear()} {settings.companyName || 'Travel Template Master'}. All rights reserved.
                    </Typography>
                    <Typography variant="body2" color="info">
                        Powered by <Link href="https://virgincareer.lk/" target="_blank" rel="noopener noreferrer" sx={{ color: 'orange' }}>Virgin Career Production (Pvt) Ltd</Link>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
