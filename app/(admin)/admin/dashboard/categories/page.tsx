'use client';

import { useState, useEffect } from 'react';
import {
    Box, Typography, Button, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, IconButton, Chip, Avatar
} from '@mui/material';
import { Plus, Edit, Trash2, RefreshCw } from 'lucide-react';
import { getAdminCategories, deleteCategory, syncCategories } from '@/app/actions/categories';
import CategoryForm from '@/components/admin/categories/CategoryForm';

export default function CategoriesPage() {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [openForm, setOpenForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);

    const fetchCategories = async () => {
        setLoading(true);
        const res = await getAdminCategories();
        if (res.success && res.data) {
            setCategories(res.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAdd = () => {
        setSelectedCategory(null);
        setOpenForm(true);
    };

    const handleEdit = (category: any) => {
        setSelectedCategory(category);
        setOpenForm(true);
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this category?')) {
            const res = await deleteCategory(id);
            if (res.success) {
                fetchCategories();
            } else {
                alert('Failed to delete');
            }
        }
    };

    return (
        <Box>
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }} gap={2} mb={4}>
                <Typography variant="h4" fontWeight="bold" color="secondary.main">
                    Categories
                </Typography>
                <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
                    <Button
                        variant="outlined"
                        startIcon={<RefreshCw />}
                        onClick={async () => {
                            if (confirm('Scan existing packages and add missing categories?')) {
                                setLoading(true);
                                await syncCategories();
                                await fetchCategories();
                                setLoading(false);
                            }
                        }}
                        fullWidth
                    >
                        Sync from Packages
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Plus />}
                        onClick={handleAdd}
                        fullWidth
                    >
                        Add Category
                    </Button>
                </Box>
            </Box>

            <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 3, boxShadow: 3 }}>
                <Box sx={{ overflowX: 'auto' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Slug</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">Loading...</TableCell>
                                </TableRow>
                            ) : categories.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">No categories found</TableCell>
                                </TableRow>
                            ) : (
                                categories.map((cat) => (
                                    <TableRow key={cat.id} hover>
                                        <TableCell>
                                            <Avatar src={cat.image || '/placeholder.jpg'} variant="rounded" />
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 500 }}>{cat.name}</TableCell>
                                        <TableCell>{cat.slug}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={cat.active ? 'Active' : 'Inactive'}
                                                color={cat.active ? 'success' : 'default'}
                                                size="small"
                                                sx={{ width: 'fit-content' }}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton color="primary" onClick={() => handleEdit(cat)}>
                                                <Edit size={18} />
                                            </IconButton>
                                            <IconButton color="error" onClick={() => handleDelete(cat.id)}>
                                                <Trash2 size={18} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </Box>
            </Paper>

            <CategoryForm
                open={openForm}
                onClose={() => setOpenForm(false)}
                initialData={selectedCategory}
                onSuccess={fetchCategories}
            />
        </Box>
    );
}
