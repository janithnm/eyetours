'use client';

import { Box, Container, Typography, Button, IconButton } from '@mui/material';
import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';

export default function HomeCTASection() {
    return (
        <Box sx={{ position: 'relative', py: 12, overflow: 'hidden' }}>
            {/* Background Image with Overlay */}
            <Box
                component="img"
                src="https://virgin-travel-app.b-cdn.net/eyetours/assets/person.jpg" // Using footer image or similar scenic one
                alt="CTA Background"
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
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                bgcolor: 'rgba(0,0,0,0.6)',
                zIndex: 1
            }} />

            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, textAlign: 'center', color: 'white' }}>
                <Typography variant="h2" sx={{ fontFamily: 'serif', mb: 3 }}>
                    Begin Your Sri Lankan Adventure Now!
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 300, mb: 5, opacity: 0.9 }}>
                    Dive into the magic of Sri Lanka by booking an unforgettable tour today. Whether exploring historical wonders or indulging in nature hikes, adventure awaits. Secure your spot and let the journey begin!
                </Typography>

                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="center" gap={3} mb={6}>
                    <Link href="/planner" passHref>
                        <Button variant="contained" color="secondary" size="large" sx={{ px: 5, py: 1.5, fontSize: '1.1rem' }}>
                            Book Now
                        </Button>
                    </Link>
                    <Link href="/contact" passHref>
                        <Button variant="outlined" color="inherit" size="large" sx={{ px: 5, py: 1.5, fontSize: '1.1rem', borderColor: 'white', color: 'white' }}>
                            Contact Us
                        </Button>
                    </Link>
                </Box>

                <Box display="flex" justifyContent="center" alignItems="center" gap={{ xs: 2, md: 4 }} flexWrap="wrap">
                    <Box display="flex" alignItems="center" gap={1}>
                        <Box sx={{ bgcolor: 'white', p: 1, borderRadius: '50%', color: 'primary.main', display: 'flex' }}>
                            <Phone size={20} />
                        </Box>
                        <Typography variant="body1" fontWeight="bold">031 793 5937</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Box sx={{ bgcolor: 'white', p: 1, borderRadius: '50%', color: 'primary.main', display: 'flex' }}>
                            <Phone size={20} />
                        </Box>
                        <Typography variant="body1" fontWeight="bold">076 136 1310</Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
