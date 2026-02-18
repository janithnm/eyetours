
import { getSiteSettings } from '@/app/actions/settings';
import {
    Container, Typography, Box, Grid, Link, Paper
} from '@mui/material';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';
import { siteSettings } from '@/app/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import * as Motion from 'framer-motion/client';

export default async function ContactPage() {
    const res = await getSiteSettings();
    const settings: Partial<InferSelectModel<typeof siteSettings>> = res.success && res.data ? res.data : {};

    return (
        <Box>
            {/* Scenic Hero Section */}
            <Box
                sx={{
                    position: 'relative',
                    height: '60vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: 'url(https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop)', // Replace with your improved scenic image if needed
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'white',
                    textAlign: 'center',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0, left: 0, width: '100%', height: '100%',
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))',
                        zIndex: 1
                    }
                }}
            >
                <Box position="relative" zIndex={2}>
                    <Motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <Typography variant="h2" fontWeight="bold" sx={{ fontFamily: 'serif', mb: 2, textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}>
                            Get In Touch
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 300, maxWidth: '600px', mx: 'auto', opacity: 0.9 }}>
                            We'd love to hear from you. Let's plan your next adventure together.
                        </Typography>
                    </Motion.div>
                </Box>
            </Box>

            {/* Content Section */}
            <Container maxWidth="lg" sx={{ mt: -10, mb: 10, position: 'relative', zIndex: 3 }}>
                <Paper elevation={0} sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                    <Grid container>
                        {/* Left: Contact Info (Dark Theme) */}
                        <Grid size={{ xs: 12, md: 5 }} sx={{ bgcolor: 'secondary.main', color: 'white', p: 6 }}>
                            <Box height="100%" display="flex" flexDirection="column" justifyContent="space-between">
                                <Box>
                                    <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
                                        Contact Information
                                    </Typography>

                                    <Box display="flex" flexDirection="column" gap={4}>
                                        {settings.phone && (
                                            <Box display="flex" alignItems="flex-start" gap={3}>
                                                <Phone size={24} style={{ marginTop: 4, opacity: 0.8 }} />
                                                <Box>
                                                    <Typography variant="subtitle2" fontWeight="bold" sx={{ opacity: 0.7 }}>Phone</Typography>
                                                    <Box display="flex" flexWrap="wrap" gap={1}>
                                                        <Link href={`tel:${settings.phone}`} color="inherit" underline="hover" variant="body1">
                                                            {settings.phone}
                                                        </Link>
                                                        {settings.hotline && (
                                                            <>
                                                                <Typography variant="body1" component="span"> / Hotline </Typography>
                                                                <Link href={`tel:${settings.hotline}`} color="inherit" underline="hover" variant="body1">
                                                                    {settings.hotline}
                                                                </Link>
                                                            </>
                                                        )}
                                                    </Box>
                                                </Box>
                                            </Box>
                                        )}

                                        {settings.email && (
                                            <Box display="flex" alignItems="flex-start" gap={3}>
                                                <Mail size={24} style={{ marginTop: 4, opacity: 0.8 }} />
                                                <Box>
                                                    <Typography variant="subtitle2" fontWeight="bold" sx={{ opacity: 0.7 }}>Email</Typography>
                                                    <Link href={`mailto:${settings.email}`} color="inherit" underline="hover" variant="body1">
                                                        {settings.email}
                                                    </Link>
                                                </Box>
                                            </Box>
                                        )}

                                        {settings.address && (
                                            <Box display="flex" alignItems="flex-start" gap={3}>
                                                <MapPin size={24} style={{ marginTop: 4, opacity: 0.8 }} />
                                                <Box>
                                                    <Typography variant="subtitle2" fontWeight="bold" sx={{ opacity: 0.7 }}>Address</Typography>
                                                    <Typography variant="body1">{settings.address}</Typography>
                                                </Box>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>

                                {/* Social Media */}
                                <Box mt={8}>
                                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ mb: 2, opacity: 0.8 }}>Follow Us</Typography>
                                    <Box display="flex" gap={2}>
                                        {settings.facebook && (
                                            <Link href={settings.facebook} target="_blank" color="inherit" sx={{ '&:hover': { opacity: 0.7 } }}>
                                                <Facebook size={24} />
                                            </Link>
                                        )}
                                        {settings.instagram && (
                                            <Link href={settings.instagram} target="_blank" color="inherit" sx={{ '&:hover': { opacity: 0.7 } }}>
                                                <Instagram size={24} />
                                            </Link>
                                        )}
                                        {settings.youtube && (
                                            <Link href={settings.youtube} target="_blank" color="inherit" sx={{ '&:hover': { opacity: 0.7 } }}>
                                                <Youtube size={24} />
                                            </Link>
                                        )}
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>

                        {/* Right: Messages Form (Light Theme) */}
                        <Grid size={{ xs: 12, md: 7 }} sx={{ bgcolor: 'background.paper', p: 6 }}>
                            <ContactForm />
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
}
