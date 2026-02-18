'use client';

import { useState, useEffect } from 'react';
import { useForm, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField,
    FormControlLabel, Switch, Box, Typography, Grid
} from '@mui/material';
import { createCategory, updateCategory } from '@/app/actions/categories';
import { createBlogCategory, updateBlogCategory } from '@/app/actions/blog-categories';
import FileUploader from '../FileUploader';

const FormSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    slug: z.string().min(1, 'Slug is required'),
    description: z.string().optional(),
    image: z.string().optional(),
    active: z.boolean().default(true),
});

type FormData = z.infer<typeof FormSchema>;

interface CategoryFormProps {
    open: boolean;
    onClose: () => void;
    initialData?: any;
    onSuccess: () => void;
    isBlogCategory?: boolean;
}

export default function CategoryForm({ open, onClose, initialData, onSuccess, isBlogCategory = false }: CategoryFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(FormSchema) as Resolver<FormData>,
        defaultValues: {
            name: '', slug: '', description: '', image: '', active: true
        }
    });

    useEffect(() => {
        if (open) {
            if (initialData) {
                reset({
                    name: initialData.name,
                    slug: initialData.slug,
                    description: initialData.description || '',
                    image: initialData.image || '',
                    active: initialData.active
                });
            } else {
                reset({ name: '', slug: '', description: '', image: '', active: true });
            }
            setError(null);
        }
    }, [open, initialData, reset]);

    const nameValue = watch('name');
    useEffect(() => {
        if (!initialData && nameValue) {
            setValue('slug', nameValue.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''), { shouldValidate: true });
        }
    }, [nameValue, initialData, setValue]);

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        setError(null);

        let res;
        if (initialData) {
            if (isBlogCategory) {
                res = await updateBlogCategory(initialData.id, data);
            } else {
                res = await updateCategory(initialData.id, data);
            }
        } else {
            if (isBlogCategory) {
                res = await createBlogCategory(data);
            } else {
                res = await createCategory(data);
            }
        }

        if (res.success) {
            onSuccess();
            onClose();
        } else {
            setError(res.error || 'Operation failed');
        }
        setLoading(false);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{initialData ? 'Edit Category' : 'Add New Category'}</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    {error && <Typography color="error" mb={2}>{error}</Typography>}
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12 }} >
                            <TextField
                                label="Name" fullWidth
                                {...register('name')}
                                error={!!errors.name} helperText={errors.name?.message}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                label="Slug" fullWidth
                                {...register('slug')}
                                error={!!errors.slug} helperText={errors.slug?.message}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                label="Description" fullWidth multiline rows={3}
                                {...register('description')}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Typography variant="body2" mb={1}>Category Image</Typography>
                            <FileUploader
                                folder="categories"
                                value={watch('image')}
                                onUpload={(url) => setValue('image', url)}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <FormControlLabel
                                control={<Switch {...register('active')} checked={watch('active')} />}
                                label="Active"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" disabled={loading}>
                        {loading ? 'Saving...' : 'Save'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
