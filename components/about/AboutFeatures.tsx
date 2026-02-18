'use client';

import { Box, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Users, Target, Heart, Globe, Award, Shield } from 'lucide-react';

const Feature = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
    <Box p={3} border="1px solid" borderColor="divider" borderRadius={4} bgcolor="background.paper"
        sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.3s ease',
            '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }
        }}
    >
        <Box color="secondary.main" mb={2}>
            <Icon size={32} />
        </Box>
        <Typography variant="h6" fontWeight="bold" gutterBottom>{title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>{description}</Typography>
    </Box>
);

export default function AboutFeatures() {
    return (
        <Box bgcolor="grey.50" py={10}>
            <Container>
                <Box textAlign="center" mb={6}>
                    <Typography variant="h3" fontWeight="bold" sx={{ fontFamily: 'serif', mb: 2 }}>Why Travel With Us?</Typography>
                    <Typography variant="body1" color="text.secondary" maxWidth={800} mx="auto">
                        At Eye Tour Lanka, we believe that every journey tells a story, and we are here to ensure yours is unforgettable. With years of experience in curating exceptional travel experiences, we pride ourselves on our in-depth knowledge of Sri Lanka's captivating landscapes, rich culture, and vibrant history.
                    </Typography>
                </Box>
                <Grid container spacing={4}>
                    {[
                        { icon: Users, title: "Personalized Itineraries", description: "We understand that every traveler is unique. Our team works closely with you to create tailor-made tour packages that cater to your specific interests and preferences." },
                        { icon: Globe, title: "Expert Local Guides", description: "Our knowledgeable local guides provide insider insights and authentic experiences that showcase the true essence of Sri Lanka." },
                        { icon: Award, title: "Best In-Class Services", description: "From luxurious accommodations to seamless transportation, we prioritize your comfort and satisfaction. Our commitment to quality ensures a smooth and enjoyable journey." },
                        { icon: Shield, title: "Transparent Pricing", description: "No hidden fees! We offer clear and competitive pricing, so you can budget confidently for your adventure." }
                    ].map((feature, idx) => (
                        <Grid size={{ xs: 12, md: 6 }} key={idx}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                style={{ height: '100%' }}
                            >
                                <Feature {...feature} />
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
