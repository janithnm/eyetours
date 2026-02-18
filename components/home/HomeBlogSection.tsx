'use client';

import { Box, Container, Grid, Typography, Card, CardContent, CardMedia, Button, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getPosts } from '@/app/actions/posts';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function HomeBlogSection() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            // Fetch top 3 recent posts
            const res = await getPosts(3);
            if (res.success && res.data) {
                setPosts(res.data);
            }
            setLoading(false);
        };
        fetchPosts();
    }, []);

    if (!loading && posts.length === 0) return null;

    return (
        <Box sx={{ py: 10, bgcolor: 'background.paper' }}>
            <Container maxWidth="lg">
                <Box textAlign="center" mb={6}>
                    <Typography variant="overline" color="primary" fontWeight="bold" letterSpacing={2}>
                        Travel Journal
                    </Typography>
                    <Typography variant="h2" sx={{ fontFamily: 'serif', mb: 2 }}>
                        Latest Stories from Sri Lanka
                    </Typography>
                    <Typography variant="body1" color="text.secondary" maxWidth="600px" mx="auto">
                        Tips, guides, and stories to inspire your next adventure.
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {loading ? (
                        [1, 2, 3].map(i => (
                            <Grid size={{ xs: 12, md: 4 }} key={i}>
                                <Skeleton variant="rectangular" height={240} sx={{ borderRadius: 4, mb: 2 }} />
                                <Skeleton variant="text" />
                                <Skeleton variant="text" width="60%" />
                            </Grid>
                        ))
                    ) : (
                        posts.map((post, index) => (
                            <Grid size={{ xs: 12, md: 4 }} key={post.id}>
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Box sx={{
                                        position: 'relative',
                                        transition: 'all 0.3s ease',
                                        '&:hover': { transform: 'translateY(-5px)' }
                                    }}>
                                        <Box sx={{
                                            height: 240,
                                            width: '100%',
                                            borderRadius: 4,
                                            overflow: 'hidden',
                                            mb: 3,
                                            position: 'relative'
                                        }}>
                                            <Box
                                                component="img"
                                                src={post.coverImage || 'https://virgin-travel-app.b-cdn.net/common/placeholder.jpg'}
                                                alt={post.title}
                                                sx={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                            <Box sx={{
                                                position: 'absolute',
                                                top: 16,
                                                left: 16,
                                                bgcolor: 'white',
                                                px: 2,
                                                py: 0.5,
                                                borderRadius: 50,
                                                fontSize: '0.75rem',
                                                fontWeight: 'bold',
                                                color: 'primary.main',
                                                textTransform: 'uppercase'
                                            }}>
                                                {post.category || 'Travel'}
                                            </Box>
                                        </Box>
                                        <Box display="flex" alignItems="center" gap={3} mb={2} color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                                            <Box display="flex" alignItems="center" gap={0.5}>
                                                <Calendar size={14} />
                                                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                            </Box>
                                            <Box display="flex" alignItems="center" gap={0.5}>
                                                <User size={14} />
                                                <span>{post.author || 'Admin'}</span>
                                            </Box>
                                        </Box>
                                        <Link href={`/blogs/${post.slug}`} style={{ textDecoration: 'none' }}>
                                            <Typography variant="h5" fontWeight="bold" gutterBottom color="text.primary" sx={{
                                                transition: 'color 0.2s',
                                                '&:hover': { color: 'primary.main' }
                                            }}>
                                                {post.title}
                                            </Typography>
                                        </Link>
                                        <Typography variant="body2" color="text.secondary" sx={{
                                            mb: 2,
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}>
                                            {post.excerpt}
                                        </Typography>
                                        <Link href={`/blogs/${post.slug}`} style={{ textDecoration: 'none' }}>
                                            <Typography variant="button" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                Read Story <ArrowRight size={16} />
                                            </Typography>
                                        </Link>
                                    </Box>
                                </motion.div>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Container>
        </Box>
    );
}
