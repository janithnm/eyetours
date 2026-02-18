'use client';

import { Box, Container, Typography, Breadcrumbs } from '@mui/material';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';

export default function DestinationBanner({ dest }: { dest: any }) {
    return (
        <Box sx={{
            position: 'relative',
            height: { xs: '60vh', md: '70vh' },
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Box
                component="img"
                src={dest.image || 'https://virgin-travel-app.b-cdn.net/common/placeholder.jpg'}
                alt={dest.name}
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 0
                }}
            />
            <Box sx={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
                zIndex: 1
            }} />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Breadcrumbs separator={<ChevronRight size={16} color="white" />} aria-label="breadcrumb" sx={{ mb: 3, color: 'white', '& .MuiBreadcrumbs-separator': { color: 'white' }, opacity: 0.9 }}>
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', color: 'white', textDecoration: 'none', fontSize: '0.9rem' }}>
                        <Home size={16} style={{ marginRight: 4 }} /> Home
                    </Link>
                    <Link href="/destinations" style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem' }}>
                        Destinations
                    </Link>
                    <Typography color="white" sx={{ fontSize: '0.9rem', fontWeight: 600 }}>{dest.name}</Typography>
                </Breadcrumbs>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Typography variant="h1" color="white" sx={{
                        fontSize: { xs: '3.5rem', md: '6rem' },
                        fontWeight: 900,
                        fontFamily: 'serif',
                        textShadow: '0 4px 20px rgba(0,0,0,0.4)',
                        lineHeight: 1,
                        mb: 2,
                        letterSpacing: -1
                    }}>
                        {dest.name}
                    </Typography>
                    <Typography variant="h5" color="rgba(255,255,255,0.9)" sx={{
                        maxWidth: 800,
                        mx: 'auto',
                        fontSize: { xs: '1.1rem', md: '1.5rem' },
                        fontWeight: 300,
                        textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                    }}>
                        {dest.shortDescription}
                    </Typography>
                </motion.div>
            </Container>
        </Box>
    );
}
