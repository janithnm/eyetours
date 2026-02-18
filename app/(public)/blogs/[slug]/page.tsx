import { getPostBySlug } from '@/app/actions/posts';
import { Box, Container, Typography, Stack, Avatar, Chip, Grid, Divider } from '@mui/material';
import { notFound } from 'next/navigation';
import { Calendar, User, Clock } from 'lucide-react';
import Image from 'next/image';
import BlogContent from '@/components/blogs/BlogContent'; // Client component for Framer Motion

interface PageProps {
    params: { slug: string };
}
// Correctly typing params as a Promise for Next.js 15
export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { data: post } = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <Box pb={10} bgcolor="background.default" overflow="hidden">
            {/* Parallax Hero */}
            <Box
                sx={{
                    position: 'relative',
                    height: '70vh',
                    minHeight: 500,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'flex-end',
                    mt: -8 // Offset navbar
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${post.coverImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed', // Parallax effect
                        zIndex: 0
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        bgcolor: 'rgba(0,0,0,0.3)',
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%)',
                        zIndex: 1
                    }}
                />

                <Container sx={{ position: 'relative', zIndex: 2, pb: 8, color: 'white' }}>
                    <Stack direction="row" spacing={2} mb={3}>
                        <Chip
                            label={post.category || 'Travel'}
                            sx={{ bgcolor: 'white', color: 'black', fontWeight: 'bold' }}
                        />
                    </Stack>
                    <Typography
                        variant="h1"
                        fontWeight={800}
                        sx={{
                            fontFamily: 'serif',
                            fontSize: { xs: '2.5rem', md: '4.5rem' },
                            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                            lineHeight: 1.1,
                            mb: 4
                        }}
                    >
                        {post.title}
                    </Typography>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} alignItems={{ xs: 'flex-start', sm: 'center' }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Avatar sx={{ width: 40, height: 40, border: '2px solid white' }}>{post.author ? post.author[0] : 'A'}</Avatar>
                            <Box>
                                <Typography variant="subtitle2" fontWeight="bold">Written by</Typography>
                                <Typography variant="body2">{post.author}</Typography>
                            </Box>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Calendar size={20} />
                            <Box>
                                <Typography variant="subtitle2" fontWeight="bold">Published</Typography>
                                <Typography variant="body2">{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Recently'}</Typography>
                            </Box>
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            <Container maxWidth="md" sx={{ mt: 8 }}>
                <Box sx={{ overflowWrap: 'break-word', wordBreak: 'break-word', textAlign: 'left' }}>
                    <Typography variant="h5" fontWeight="medium" color="text.secondary" paragraph sx={{ fontSize: '1.25rem', lineHeight: 1.8, mb: 4, borderLeft: '4px solid', borderColor: 'secondary.main', pl: 3 }}>
                        {post.excerpt}
                    </Typography>

                    {/* Main Content with Images */}
                    <BlogContent content={post.content} images={post.images as string[]} />

                    <Divider sx={{ my: 8 }} />

                    {/* Simple Footer for Post */}
                    <Box textAlign="left" color="text.secondary">
                        <Typography variant="body2" fontStyle="italic">
                            Thanks for reading! Explore more stories in {post.category}.
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
