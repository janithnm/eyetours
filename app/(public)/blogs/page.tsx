import { getPosts } from '@/app/actions/posts';
import { Box, Container, Grid, Typography, Card, CardContent, CardMedia, Chip, Button } from '@mui/material';
import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';
import BlogList from '@/components/blogs/BlogList'; // Will create this client component for animations

export const metadata = {
    title: 'Travel Blog | TravelMaster',
    description: 'Travel tips, guides, and stories from Sri Lanka.',
};

export default async function BlogsPage() {
    const { data: posts } = await getPosts();

    return (
        <Box bgcolor="background.default" minHeight="100vh">
            {/* Cinematic Hero Section */}
            <Box
                sx={{
                    position: 'relative',
                    height: '60vh',
                    minHeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: -8, // Offset navbar
                    overflow: 'hidden'
                }}
            >
                <Box
                    component="img"
                    src="https://virgin-travel-app.b-cdn.net/eyetours/assets/ali.jpg.jpeg"
                    alt="Travel Journal Hero"
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'brightness(0.7)'
                    }}
                />

                <Container sx={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white' }}>
                    <Chip
                        label="Travel Journal"
                        sx={{
                            bgcolor: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.3)',
                            mb: 3,
                            px: 1
                        }}
                    />
                    <Typography variant="h1" fontWeight={800} sx={{ fontFamily: 'serif', mb: 2, textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                        Stories from Paradise
                    </Typography>
                    <Typography variant="h5" fontWeight={300} maxWidth={700} mx="auto" sx={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                        Immerse yourself in the hidden gems and vibrant culture of Sri Lanka through our curated tales.
                    </Typography>
                </Container>

                {/* Fade to content */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '150px',
                        background: 'linear-gradient(to top, var(--background-default), transparent)'
                    }}
                />
            </Box>

            <Container sx={{ py: 8 }}>
                {posts && posts.length > 0 ? (
                    <Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
                            <Typography variant="h4" fontWeight="bold" sx={{ fontFamily: 'serif' }}>Latest Articles</Typography>
                        </Box>
                        <BlogList posts={posts} />
                    </Box>
                ) : (
                    <Box textAlign="center" py={10}>
                        <Typography variant="h6" color="text.secondary">No stories published yet.</Typography>
                    </Box>
                )}
            </Container>
        </Box>
    );
}
