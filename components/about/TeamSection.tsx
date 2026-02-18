'use client';

import { Box, Container, Grid, Typography, Card, CardContent, Avatar } from '@mui/material';
import { motion } from 'framer-motion';

export default function TeamSection({ team }: { team: any[] | undefined | null }) {
    if (!team || team.length === 0) return null;

    return (
        <Box sx={{ py: 10, bgcolor: 'background.default' }}>
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Typography
                        variant="overline"
                        fontWeight="bold"
                        color="secondary"
                        display="block"
                        textAlign="center"
                        mb={1}
                        letterSpacing={2}
                    >
                        Our Experts
                    </Typography>
                    <Typography
                        variant="h3"
                        fontWeight={800}
                        textAlign="center"
                        sx={{ fontFamily: 'serif', mb: 8 }}
                    >
                        Meet the Team
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        textAlign="center"
                        sx={{ maxWidth: 800, mx: 'auto', mb: 6, lineHeight: 1.8 }}
                    >
                        Our diverse team at Eye Tour Lanka consists of passionate individuals, each with their unique expertise in travel and tourism. From seasoned tour guides who know every hidden gem to experienced travel consultants who craft personalized itineraries, our team is dedicated to offering you the best possible experience. With a shared love for Sri Lanka and a commitment to excellence, we ensure that you will feel welcomed and cared for on every step of your journey with us.
                    </Typography>
                </motion.div>

                <Grid container spacing={6} justifyContent="center">
                    {team.map((member, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={member.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                            >
                                <Card
                                    elevation={0}
                                    sx={{
                                        position: 'relative',
                                        overflow: 'visible',
                                        bgcolor: 'transparent',
                                        textAlign: 'center',
                                        mt: 4
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            display: 'inline-block',
                                            mb: 3,
                                            '&::before': {
                                                content: '""',
                                                position: 'absolute',
                                                top: -10,
                                                left: -10,
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: '50%',
                                                border: '2px solid',
                                                borderColor: 'secondary.main',
                                                opacity: 0.3,
                                                transform: 'scale(1.1)',
                                                transition: 'transform 0.4s ease'
                                            },
                                            '&:hover::before': {
                                                transform: 'scale(1.2) rotate(15deg)'
                                            }
                                        }}
                                    >
                                        <Avatar
                                            src={member.image || '/placeholder-user.jpg'}
                                            alt={member.name}
                                            sx={{
                                                width: 180,
                                                height: 180,
                                                border: '4px solid',
                                                borderColor: 'background.paper',
                                                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                                transition: 'transform 0.4s ease',
                                                '&:hover': {
                                                    transform: 'scale(1.05)'
                                                }
                                            }}
                                        />
                                    </Box>

                                    <CardContent>
                                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                                            {member.name}
                                        </Typography>
                                        <Typography variant="subtitle2" color="secondary.main" fontWeight="bold" gutterBottom sx={{ textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.75rem' }}>
                                            {member.role}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300, mx: 'auto', mt: 2 }}>
                                            {member.bio}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
