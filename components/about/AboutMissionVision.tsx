'use client';

import { Box, Container, Grid, Typography, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { Leaf, Globe, Heart, Shield, Map, Users, Lightbulb, Sprout } from 'lucide-react';

const VisionSection = () => (
    <Box
        position="relative"
        py={15}
        sx={{
            backgroundImage: 'url(https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg)', // Scenic landscape
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            color: 'white',
            textAlign: 'center',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                bgcolor: 'rgba(0,0,0,0.6)',
            }
        }}
    >
        <Container sx={{ position: 'relative', zIndex: 1 }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <Typography variant="overline" letterSpacing={4} fontWeight="bold" sx={{ opacity: 0.9 }}>
                    Our Vision
                </Typography>
                <Typography variant="h3" fontWeight="bold" sx={{ fontFamily: 'serif', mb: 4, mt: 2 }}>
                    Connecting the World Through Authentic Journeys
                </Typography>
                <Typography variant="h6" fontWeight={300} lineHeight={1.8} maxWidth={900} mx="auto">
                    To be the world’s leading digital tourism platform that inspires travelers to explore destinations across the globe, discover diverse cultures, and experience authentic adventures — from bustling cities and historic landmarks to serene natural landscapes and agro-tourism experiences. We envision a future where tourism promotes cultural understanding, environmental stewardship, and economic growth, connecting travelers with local communities in meaningful and responsible ways.
                </Typography>
            </motion.div>
        </Container>
    </Box>
);

const MissionItem = ({ icon: Icon, text }: { icon: any, text: string }) => (
    <Box display="flex" gap={2} mb={3}>
        <Box sx={{ color: 'primary.main', flexShrink: 0 }}>
            <Icon size={28} />
        </Box>
        <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
            {text}
        </Typography>
    </Box>
);

const MissionSection = () => (
    <Box py={10} bgcolor="background.paper">
        <Container>
            <Grid container spacing={6} alignItems="center">
                <Grid size={{ xs: 12, md: 6 }}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Typography variant="overline" color="primary" fontWeight="bold">Our Mission</Typography>
                        <Typography variant="h3" fontWeight="bold" sx={{ fontFamily: 'serif', mb: 4 }}>
                            Empowering Meaningful Travel
                        </Typography>
                        <MissionItem icon={Map} text="To offer accurate, up-to-date, and user-friendly tourism information for destinations worldwide." />
                        <MissionItem icon={Globe} text="To highlight cultural, historical, natural, agro-tourism, and religious/spiritual experiences, helping travelers make informed and meaningful travel choices." />
                        <MissionItem icon={Sprout} text="To support local communities and economies by promoting authentic experiences, including farm stays, agricultural tours, and pilgrimage or spiritual journeys." />
                        <MissionItem icon={Lightbulb} text="To leverage technology to make global travel accessible, safe, and enjoyable for diverse audiences." />
                        <MissionItem icon={Heart} text="To create a platform that fosters cross-cultural understanding, spiritual enrichment, and appreciation of local traditions." />
                        <MissionItem icon={Shield} text="To encourage responsible tourism practices that protect the environment, preserve cultural heritage, and contribute to sustainable development." />
                    </motion.div>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Box
                            component="img"
                            src="https://images.pexels.com/photos/3225529/pexels-photo-3225529.jpeg" // Travel/Community interaction
                            alt="Our Mission"
                            sx={{ width: '100%', borderRadius: 4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                        />
                    </motion.div>
                </Grid>
            </Grid>
        </Container>
    </Box>
);

const SustainabilityCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
        style={{ height: '100%' }}
    >
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 4, boxShadow: 'none', border: '1px solid', borderColor: 'divider', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)', borderColor: 'primary.main' } }}>
            <CardContent sx={{ p: 4, textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box color="success.main" mb={2} display="flex" justifyContent="center">
                    <Icon size={40} />
                </Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>{title}</Typography>
                <Typography variant="body2" color="text.secondary" lineHeight={1.6} sx={{ flexGrow: 1 }}>{description}</Typography>
            </CardContent>
        </Card>
    </motion.div>
);

const SustainabilitySection = () => (
    <Box py={10} bgcolor="grey.50">
        <Container>
            <Box textAlign="center" mb={6}>
                <Typography variant="overline" color="success.main" fontWeight="bold">Our Responsibility</Typography>
                <Typography variant="h3" fontWeight="bold" sx={{ fontFamily: 'serif', mb: 2 }}>
                    Sustainability Commitment
                </Typography>
                <Typography variant="body1" color="text.secondary" maxWidth={700} mx="auto">
                    We are committed to promoting sustainable tourism practices worldwide, ensuring that our travels leave a positive impact.
                </Typography>
            </Box>

            <Grid container spacing={4}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <SustainabilityCard
                        icon={Leaf}
                        title="Environmental Responsibility"
                        description="Encouraging eco-friendly travel, reducing resource consumption, and protecting natural landscapes."
                        delay={0.1}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <SustainabilityCard
                        icon={Globe}
                        title="Cultural Preservation"
                        description="Promoting respect for local traditions, heritage sites, and community values."
                        delay={0.2}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <SustainabilityCard
                        icon={Sprout} // Using Sprout as a proxy for economic growth/agriculture
                        title="Economic Sustainability"
                        description="Supporting local businesses and communities through tourism that generates long-term benefits, including agro-tourism initiatives."
                        delay={0.3}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <SustainabilityCard
                        icon={Lightbulb}
                        title="Education & Awareness"
                        description="Informing travelers about the importance of responsible travel and the impact of tourism on destinations."
                        delay={0.4}
                    />
                </Grid>
            </Grid>
        </Container>
    </Box>
);

export default function AboutMissionVision() {
    return (
        <Box>
            <VisionSection />
            <MissionSection />
            <SustainabilitySection />
        </Box>
    );
}
