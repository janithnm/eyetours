'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, TextField, Grid, Typography, Card, CardMedia, IconButton, Switch, FormControlLabel } from '@mui/material';
import { X, Upload, Save, Loader2 } from 'lucide-react';
import { createGalleryItem, updateGalleryItem } from '@/app/actions/gallery';
import { uploadImage } from '@/app/actions/upload';
import { toast } from 'sonner';

const GallerySchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    location: z.string().optional(),
    image: z.string().min(1, 'Image is required'),
});

type GalleryFormProps = {
    initialData?: any;
    onSuccess: () => void;
    onCancel: () => void;
};

export default function GalleryForm({ initialData, onSuccess, onCancel }: GalleryFormProps) {
    const [uploading, setUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        resolver: zodResolver(GallerySchema),
        defaultValues: {
            title: initialData?.title || '',
            description: initialData?.description || '',
            location: initialData?.location || '',
            image: initialData?.image || '',
        }
    });

    const currentImage = watch('image');

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        formData.append('folder', 'gallery');

        try {
            const res = await uploadImage(formData);
            if (res.success) {
                setValue('image', res.url);
                toast.success('Image uploaded successfully');
            } else {
                toast.error(res.error || 'Upload failed');
            }
        } catch (error) {
            console.error(error);
            toast.error('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (data: any) => {
        setIsSubmitting(true);
        try {
            let res;
            if (initialData) {
                res = await updateGalleryItem(initialData.id, data);
            } else {
                res = await createGalleryItem(data);
            }

            if (res.success) {
                toast.success(initialData ? 'Story updated' : 'Story created');
                onSuccess();
            } else {
                toast.error(res.error || 'Operation failed');
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
            <Typography variant="h6" mb={3}>
                {initialData ? 'Edit Story' : 'New Visual Story'}
            </Typography>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                    <Box
                        sx={{
                            border: '2px dashed',
                            borderColor: errors.image ? 'error.main' : 'divider',
                            borderRadius: 2,
                            p: 3,
                            textAlign: 'center',
                            position: 'relative',
                            bgcolor: 'background.default',
                            minHeight: 200,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {currentImage ? (
                            <Box sx={{ position: 'relative', width: '100%', maxWidth: 400, height: 250 }}>
                                <img src={currentImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} />
                                <IconButton
                                    onClick={() => setValue('image', '')}
                                    sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(0,0,0,0.5)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}
                                >
                                    <X size={18} />
                                </IconButton>
                            </Box>
                        ) : (
                            <>
                                <Upload size={40} color="gray" />
                                <Typography color="text.secondary" mt={2}>
                                    Drag and drop or click to upload
                                </Typography>
                                <Button component="label" sx={{ mt: 2 }}>
                                    Choose Message
                                    <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                                </Button>
                            </>
                        )}
                        {uploading && (
                            <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Loader2 className="animate-spin" />
                            </Box>
                        )}
                    </Box>
                    {errors.image && <Typography color="error" variant="caption">{errors.image.message as string}</Typography>}
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        label="Story Title"
                        {...register('title')}
                        error={!!errors.title}
                        helperText={errors.title?.message as string}
                        placeholder="e.g. Sunset at Mirissa"
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        label="Location (Optional)"
                        {...register('location')}
                        placeholder="e.g. Mirissa, Southern Province"
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Story Description"
                        {...register('description')}
                        placeholder="Tell the story behind this image..."
                    />
                </Grid>

                <Grid size={{ xs: 12 }} display="flex" justifyContent="flex-end" gap={2}>
                    <Button onClick={onCancel} variant="outlined" color="inherit">
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting || uploading}
                        startIcon={isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    >
                        {initialData ? 'Update Story' : 'Create Story'}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
