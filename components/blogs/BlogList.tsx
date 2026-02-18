'use client';

import { Box, Grid, Typography, Card, CardContent, CardMedia, Chip, Avatar, Stack, Button } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function BlogList({ posts }: { posts: any[] }) {
    return (
        <Grid container spacing={4}>
            {posts.map((post, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={post.id}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                        <Link href={`/blogs/${post.slug}`} style={{ textDecoration: 'none' }}>
                            <Card
                                elevation={0}
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: 4,
                                    overflow: 'hidden',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                                        '& .media-zoom': {
                                            transform: 'scale(1.05)'
                                        },
                                        '& .read-more-arrow': {
                                            transform: 'translateX(4px)'
                                        }
                                    }
                                }}
                            >
                                <Box sx={{ position: 'relative', overflow: 'hidden', height: 240 }}>
                                    <CardMedia
                                        component="img"
                                        image={post.coverImage || '/placeholder-blog.jpg'}
                                        alt={post.title}
                                        className="media-zoom"
                                        sx={{
                                            height: '100%',
                                            width: '100%',
                                            transition: 'transform 0.5s ease',
                                            objectFit: 'cover'
                                        }}
                                    />
                                    <Chip
                                        label={post.category || 'Travel'}
                                        size="small"
                                        sx={{
                                            position: 'absolute',
                                            top: 16,
                                            left: 16,
                                            bgcolor: 'rgba(255,255,255,0.9)',
                                            backdropFilter: 'blur(4px)',
                                            fontWeight: 600
                                        }}
                                    />
                                </Box>
                                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                    <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                                        {new Date(post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </Typography>
                                    <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom sx={{ fontFamily: 'serif', lineHeight: 1.2 }}>
                                        {post.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 3, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {post.excerpt}
                                    </Typography>

                                    <Box display="flex" alignItems="center" justifyContent="space-between" mt="auto">
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>{post.author ? post.author[0] : 'A'}</Avatar>
                                            <Typography variant="caption" fontWeight={600} color="text.primary">{post.author || 'Admin'}</Typography>
                                        </Stack>
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            gap={0.5}
                                            color="secondary.main"
                                            fontWeight={600}
                                            fontSize="0.875rem"
                                        >
                                            Read More
                                            <ArrowRight size={16} className="read-more-arrow" style={{ transition: 'transform 0.3s ease' }} />
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>
                </Grid>
            ))}
        </Grid>
    );
}
