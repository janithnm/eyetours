'use client';

import { useState } from 'react';
import { useForm, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Box, Button, TextField, Typography, Paper, Grid, Switch, FormControlLabel
} from '@mui/material';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createDestination, updateDestination } from '@/app/actions/destinations';
import FileUploader from '../FileUploader';
import MultiFileUploader from '../MultiFileUploader';
import Editor from '../blogs/Editor'; // Reusing Editor from blogs

// Schema
const FormSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    slug: z.string().min(1, 'Slug is required'),
    description: z.string().optional(),
    shortDescription: z.string().optional(),
    image: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    active: z.boolean().default(true),
});

type DestinationFormData = z.infer<typeof FormSchema>;

export default function DestinationForm({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const defaultValues = initialData || {
        name: '', slug: '', description: '', shortDescription: '',
        image: '', gallery: [], active: true
    };

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<DestinationFormData>({
        resolver: zodResolver(FormSchema) as Resolver<DestinationFormData>,
        defaultValues
    });

    const onSubmit = async (data: DestinationFormData) => {
        setLoading(true);
        setError(null);

        let res;
        if (initialData?.id) {
            res = await updateDestination(initialData.id, data);
        } else {
            res = await createDestination(data);
        }

        if (res.success) {
            router.push('/admin/dashboard/destinations');
        } else {
            setError(res.error || 'Failed to save destination');
            setLoading(false);
        }
    };

    // Auto-generate slug from name
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!initialData) {
            const slug = e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            setValue('name', e.target.value);
            setValue('slug', slug, { shouldValidate: true });
        } else {
            setValue('name', e.target.value);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Button startIcon={<ArrowLeft />} onClick={() => router.back()} color="inherit">
                    Back
                </Button>
                <Typography variant="h4" fontWeight="bold" color="secondary.main">
                    {initialData ? 'Edit Destination' : 'Add New Destination'}
                </Typography>
                <Button type="submit" variant="contained" size="large" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Destination'}
                </Button>
            </Box>

            {error && <Typography color="error" mb={2}>{error}</Typography>}

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                        <Typography variant="h6" gutterBottom>Details</Typography>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    label="Name"
                                    fullWidth
                                    {...register('name')}
                                    onChange={handleNameChange} // Custom handler for slug generation
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    label="Slug (URL)"
                                    fullWidth
                                    {...register('slug')}
                                    error={!!errors.slug}
                                    helperText={errors.slug?.message}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    label="Short Description"
                                    multiline
                                    rows={3}
                                    fullWidth
                                    {...register('shortDescription')}
                                    helperText="Shown on the card in list view"
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Typography variant="subtitle2" gutterBottom>Full Description</Typography>
                                <Editor
                                    value={watch('description') || ''}
                                    onChange={(val) => setValue('description', val, { shouldValidate: true })}
                                    placeholder="Describe the destination..."
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                        <Typography variant="h6" gutterBottom>Settings</Typography>
                        <FormControlLabel
                            control={<Switch {...register('active')} defaultChecked={initialData?.active} />}
                            label="Active"
                        />
                    </Paper>

                    <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
                        <Typography variant="h6" gutterBottom>Cover Image</Typography>
                        <FileUploader
                            folder="destinations"
                            value={watch('image')}
                            onUpload={(url) => setValue('image', url)}
                            label="Upload Cover"
                        />
                        {watch('image') && (
                            <Box mt={2}>
                                <Typography variant="caption">Preview:</Typography>
                                <img src={watch('image')} alt="Preview" style={{ width: '100%', borderRadius: 8, marginTop: 4 }} />
                            </Box>
                        )}
                    </Paper>

                    <Paper sx={{ p: 3, borderRadius: 3 }}>
                        <Typography variant="h6" gutterBottom>Gallery</Typography>
                        <MultiFileUploader
                            folder="destination-gallery"
                            values={watch('gallery') || []}
                            onUpload={(urls) => setValue('gallery', urls)}
                            label="Upload Photos"
                        />
                    </Paper>
                </Grid>
            </Grid>
        </form>
    );
}
