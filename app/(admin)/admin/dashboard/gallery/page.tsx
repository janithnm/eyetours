'use client';

import { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, Grid, IconButton, Checkbox, Dialog, DialogContent } from '@mui/material';
import { Plus, Edit2, Trash2, GripVertical, MapPin } from 'lucide-react';
import { getGalleryItems, deleteGalleryItem, updateGalleryItem, updateGalleryOrder } from '@/app/actions/gallery';
import GalleryForm from '@/components/admin/gallery/GalleryForm';
import { toast } from 'sonner';

export default function AdminGalleryPage() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const fetchItems = async () => {
        const res = await getGalleryItems();
        if (res.success && res.data) {
            setItems(res.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this story?')) return;
        const res = await deleteGalleryItem(id);
        if (res.success) {
            toast.success('Deleted successfully');
            fetchItems();
        }
    };

    const handleEdit = (item: any) => {
        setSelectedItem(item);
        setOpenDialog(true);
    };

    const handleCreate = () => {
        setSelectedItem(null);
        setOpenDialog(true);
    };

    const handleSuccess = () => {
        setOpenDialog(false);
        fetchItems();
    };

    return (
        <Box p={3}>
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }} gap={2} mb={4}>
                <Typography variant="h4" fontWeight="bold">Visual Storytelling Gallery</Typography>
                <Button variant="contained" startIcon={<Plus />} onClick={handleCreate}>
                    Add Story
                </Button>
            </Box>

            <Grid container spacing={3}>
                {items.map((item) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
                        <Paper sx={{ overflow: 'hidden', borderRadius: 3, position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ position: 'relative', paddingTop: '66%' }}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <Box sx={{ position: 'absolute', top: 10, right: 10, bgcolor: 'rgba(255,255,255,0.9)', borderRadius: 2, display: 'flex' }}>
                                    <IconButton size="small" onClick={() => handleEdit(item)} color="primary"><Edit2 size={16} /></IconButton>
                                    <IconButton size="small" onClick={() => handleDelete(item.id)} color="error"><Trash2 size={16} /></IconButton>
                                </Box>
                            </Box>
                            <Box p={2} flexGrow={1}>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>{item.title}</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                                    <MapPin size={14} /> {item.location || 'Unknown Location'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}>
                                    {item.description}
                                </Typography>
                            </Box>
                            <Box p={2} pt={0} display="flex" alignItems="center" justifyContent="space-between">
                                <FormControlLabel
                                    control={
                                        <Switch
                                            size="small"
                                            checked={item.active}
                                            onChange={async (e) => {
                                                await updateGalleryItem(item.id, { active: e.target.checked });
                                                fetchItems();
                                            }}
                                        />
                                    }
                                    label={<Typography variant="caption">Visible</Typography>}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                ))}
                {items.length === 0 && !loading && (
                    <Grid size={{ xs: 12 }}>
                        <Box textAlign="center" py={10} color="text.secondary">
                            <Typography>No visual stories yet. Create one to get started!</Typography>
                        </Box>
                    </Grid>
                )}
            </Grid>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
                <DialogContent>
                    <GalleryForm
                        initialData={selectedItem}
                        onSuccess={handleSuccess}
                        onCancel={() => setOpenDialog(false)}
                    />
                </DialogContent>
            </Dialog>
        </Box>
    );
}

// Helper component for Switch import
import { FormControlLabel, Switch } from '@mui/material';
