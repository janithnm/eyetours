'use client';

import { useEffect, useState } from 'react';
import { getAdminPosts, deletePost, togglePostStatus } from '@/app/actions/posts';
import {
    Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    IconButton, Chip, Alert, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { Edit, Trash2, Plus, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BlogsPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const fetchPosts = async () => {
        setLoading(true);
        const { success, data, error } = await getAdminPosts();
        if (success && data) {
            setPosts(data);
        } else {
            setError(error || 'Failed to fetch posts');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async () => {
        if (!deleteId) return;
        const res = await deletePost(deleteId);
        if (res.success) {
            fetchPosts();
            setDeleteId(null);
        } else {
            setError(res.error || 'Failed to delete');
        }
    };

    const handleToggleStatus = async (id: number, currentStatus: boolean) => {
        const res = await togglePostStatus(id, currentStatus);
        if (res.success) {
            fetchPosts();
        } else {
            setError(res.error || 'Failed to update status');
        }
    };

    if (loading) return <Box display="flex" justifyContent="center" p={5}><CircularProgress /></Box>;

    return (
        <Box>
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }} gap={2} mb={4}>
                <Typography variant="h4" fontWeight="bold" color="secondary.main">
                    Manage Blog Posts
                </Typography>
                <Link href="/admin/dashboard/blogs/new" passHref style={{ textDecoration: 'none' }}>
                    <Button variant="contained" startIcon={<Plus />} size="large" fullWidth>
                        New Post
                    </Button>
                </Link>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>{error}</Alert>}

            <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
                <Box sx={{ overflowX: 'auto' }}>
                    <Table>
                        <TableHead sx={{ bgcolor: 'grey.50' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Author</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {posts.map((post) => (
                                <TableRow key={post.id} hover>
                                    <TableCell>
                                        <Typography fontWeight="medium">{post.title}</Typography>
                                        <Typography variant="caption" color="text.secondary">/{post.slug}</Typography>
                                    </TableCell>
                                    <TableCell>{post.author || '-'}</TableCell>
                                    <TableCell>{post.category || '-'}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={post.published ? 'Published' : 'Draft'}
                                            color={post.published ? 'success' : 'default'}
                                            size="small"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell sx={{ color: 'text.secondary' }}>
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            color={post.published ? 'default' : 'success'}
                                            onClick={() => handleToggleStatus(post.id, post.published || false)}
                                            title={post.published ? 'Unpublish' : 'Publish'}
                                        >
                                            {post.published ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </IconButton>
                                        <Link href={`/admin/dashboard/blogs/${post.id}`} passHref>
                                            <IconButton color="primary" title="Edit">
                                                <Edit size={18} />
                                            </IconButton>
                                        </Link>
                                        <IconButton color="error" onClick={() => setDeleteId(post.id)} title="Delete">
                                            <Trash2 size={18} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {posts.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                                        <Typography color="text.secondary">No posts found. Write your first blog!</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Box>
            </Paper>

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this post? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteId(null)}>Cancel</Button>
                    <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
