'use client';

import { useEffect, useState } from 'react';
import { getAdminPackages, deletePackage, togglePackageStatus } from '@/app/actions/packages';
import {
    Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    IconButton, Chip, Alert, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { Edit, Trash2, Plus, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function PackagesPage() {
    const [packages, setPackages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const fetchPackages = async () => {
        setLoading(true);
        const { success, data, error } = await getAdminPackages();
        if (success && data) {
            setPackages(data);
        } else {
            setError(error || 'Failed to fetch packages');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPackages();
    }, []);

    const handleDelete = async () => {
        if (!deleteId) return;
        const res = await deletePackage(deleteId);
        if (res.success) {
            fetchPackages();
            setDeleteId(null);
        } else {
            setError(res.error || 'Failed to delete');
        }
    };

    const handleToggleStatus = async (id: number, currentStatus: boolean) => {
        const res = await togglePackageStatus(id, currentStatus);
        if (res.success) {
            fetchPackages();
        } else {
            setError(res.error || 'Failed to update status');
        }
    };

    if (loading) return <Box display="flex" justifyContent="center" p={5}><CircularProgress /></Box>;

    return (
        <Box>
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }} gap={2} mb={4}>
                <Typography variant="h4" fontWeight="bold" color="secondary.main">
                    Manage Packages
                </Typography>
                <Link href="/admin/dashboard/packages/new" passHref style={{ textDecoration: 'none' }}>
                    <Button variant="contained" startIcon={<Plus />} size="large" fullWidth>
                        Create New Package
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
                                <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Price ($)</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Featured</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {packages.map((pkg) => (
                                <TableRow key={pkg.id} hover>
                                    <TableCell>
                                        <Typography fontWeight="medium">{pkg.title}</Typography>
                                        <Typography variant="caption" color="text.secondary">/{pkg.slug}</Typography>
                                    </TableCell>
                                    <TableCell>{pkg.category || '-'}</TableCell>
                                    <TableCell>{pkg.price}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={pkg.published ? 'Published' : 'Draft'}
                                            color={pkg.published ? 'success' : 'default'}
                                            size="small"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {pkg.isFeatured ? (
                                            <Chip label="Featured" color="secondary" size="small" />
                                        ) : (
                                            '-'
                                        )}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            color={pkg.published ? 'default' : 'success'}
                                            onClick={() => handleToggleStatus(pkg.id, pkg.published || false)}
                                            title={pkg.published ? 'Unpublish' : 'Publish'}
                                        >
                                            {pkg.published ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </IconButton>
                                        <Link href={`/admin/dashboard/packages/${pkg.id}`} passHref>
                                            <IconButton color="primary" title="Edit">
                                                <Edit size={18} />
                                            </IconButton>
                                        </Link>
                                        <IconButton color="error" onClick={() => setDeleteId(pkg.id)} title="Delete">
                                            <Trash2 size={18} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {packages.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                                        <Typography color="text.secondary">No packages found. Create your first one!</Typography>
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
                        Are you sure you want to delete this package? This action cannot be undone.
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
