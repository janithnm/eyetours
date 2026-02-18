'use client';

import { Box, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function PartnersSection({ partners }: { partners: any[] | undefined | null }) {
    if (!partners || partners.length === 0) return null;

    return (
        <Box sx={{ py: 10, bgcolor: 'fafafa' }}>
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        textAlign="center"
                        color="text.secondary"
                        sx={{ mb: 6, textTransform: 'uppercase', letterSpacing: 2, fontSize: '0.85rem' }}
                    >
                        Trusted by Global Partners
                    </Typography>
                </motion.div>

                <Grid container spacing={4} justifyContent="center" alignItems="center">
                    {partners.map((partner, index) => (
                        <Grid size={{ xs: 6, md: 3 }} key={partner.id}>
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.8 }}
                            >
                                <Box
                                    component={partner.website ? 'a' : 'div'}
                                    href={partner.website || undefined}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 80,
                                        filter: 'grayscale(100%) opacity(0.6)',
                                        transition: 'all 0.3s ease',
                                        cursor: partner.website ? 'pointer' : 'default',
                                        '&:hover': {
                                            filter: 'grayscale(0%) opacity(1)',
                                            transform: 'scale(1.05)'
                                        }
                                    }}
                                >
                                    {/* Using standard img for external logos to ensure they load regardless of domain config */}
                                    <img
                                        src={partner.logo || '/placeholder-logo.png'}
                                        alt={partner.name}
                                        style={{ maxHeight: '100%', maxWidth: '80%', objectFit: 'contain' }}
                                    />
                                </Box>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
