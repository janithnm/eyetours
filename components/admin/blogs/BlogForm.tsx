'use client';

import { useState } from 'react';
import { useForm, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Box, Button, TextField, Typography, Paper, Grid, MenuItem, Switch, FormControlLabel,
    InputAdornment, IconButton
} from '@mui/material';
import { Upload, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createPost, updatePost } from '@/app/actions/posts';
import FileUploader from '../FileUploader';
import MultiFileUploader from '../MultiFileUploader';
import Editor from './Editor';

// Schema
const FormSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    excerpt: z.string().optional(),
    content: z.string().optional(),
    author: z.string().optional(),
    category: z.string().optional(),
    published: z.boolean().default(true),
    coverImage: z.string().optional(),
    images: z.array(z.string()).optional(),
});

type PostFormData = z.infer<typeof FormSchema>;

export default function BlogForm({ initialData, categories = [] }: { initialData?: any, categories?: any[] }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const defaultValues = initialData || {
        title: '', slug: '', excerpt: '', content: '', author: 'Admin',
        category: categories.length > 0 ? categories[0].name : '', published: true, coverImage: '', images: []
    };

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<PostFormData>({
        resolver: zodResolver(FormSchema) as Resolver<PostFormData>,
        defaultValues
    });

    // Mock Image Upload
    const handleImageUpload = () => {
        const url = prompt("Enter image URL (Placeholder for Upload):", "https://source.unsplash.com/random/800x600?travel");
        if (url) {
            setValue('coverImage', url);
        }
    };

    const onSubmit = async (data: PostFormData) => {
        setLoading(true);
        setError(null);

        let res;
        if (initialData?.id) {
            res = await updatePost(initialData.id, data);
        } else {
            res = await createPost(data);
        }

        if (res.success) {
            router.push('/admin/dashboard/blogs');
        } else {
            setError(res.error || 'Failed to save post');
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Button startIcon={<ArrowLeft />} onClick={() => router.back()} color="inherit">
                    Back
                </Button>
                <Typography variant="h4" fontWeight="bold" color="secondary.main">
                    {initialData ? 'Edit Post' : 'Write New Post'}
                </Typography>
                <Button type="submit" variant="contained" size="large" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Post'}
                </Button>
            </Box>

            {error && <Typography color="error" mb={2}>{error}</Typography>}

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6">Content</Typography>
                            <Button size="small" variant="contained" type="submit">Save</Button>
                        </Box>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    label="Post Title"
                                    fullWidth
                                    {...register('title')}
                                    error={!!errors.title}
                                    helperText={errors.title?.message}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    label="Slug (URL Friendly)"
                                    fullWidth
                                    {...register('slug')}
                                    error={!!errors.slug}
                                    helperText={errors.slug?.message}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    label="Excerpt (Short Summary)"
                                    multiline
                                    rows={2}
                                    fullWidth
                                    {...register('excerpt')}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Typography variant="subtitle2" gutterBottom>Content</Typography>
                                <Editor
                                    value={watch('content') || ''}
                                    onChange={(val) => setValue('content', val, { shouldValidate: true })}
                                    placeholder="Write your story here..."
                                />
                                {errors.content && (
                                    <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
                                        {errors.content.message}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6">Settings</Typography>
                            <Button size="small" variant="contained" type="submit">Save</Button>
                        </Box>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    label="Author"
                                    fullWidth
                                    {...register('author')}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    label="Category"
                                    select
                                    fullWidth
                                    defaultValue={categories.length > 0 ? categories[0].name : ''}
                                    {...register('category')}
                                >
                                    {categories.length > 0 ? (
                                        categories.map((cat) => (
                                            <MenuItem key={cat.id} value={cat.name}>
                                                {cat.name}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem value="">No categories found</MenuItem>
                                    )}
                                </TextField>
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <FormControlLabel
                                    control={<Switch {...register('published')} defaultChecked={initialData?.published} />}
                                    label="Published"
                                />
                            </Grid>
                        </Grid>
                    </Paper>

                    <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6">Cover Image</Typography>
                            <Button size="small" variant="contained" type="submit">Save</Button>
                        </Box>
                        <FileUploader
                            folder="blogs"
                            value={watch('coverImage')}
                            onUpload={(url) => setValue('coverImage', url)}
                            label="Upload Cover"
                        />
                        {watch('coverImage') && (
                            <Box mt={2}>
                                <Typography variant="caption">Preview:</Typography>
                                <img src={watch('coverImage')} alt="Preview" style={{ width: '100%', borderRadius: 8, marginTop: 4 }} />
                            </Box>
                        )}
                    </Paper>

                    <Paper sx={{ p: 3, borderRadius: 3 }}>
                        <Typography variant="h6" gutterBottom>Gallery Images</Typography>
                        <MultiFileUploader
                            folder="blog-gallery"
                            values={watch('images') || []}
                            onUpload={(urls) => setValue('images', urls)}
                            label="Upload Gallery"
                            aspectRatio="16/9"
                        />
                    </Paper>
                </Grid>
            </Grid>
        </form>
    );
}
