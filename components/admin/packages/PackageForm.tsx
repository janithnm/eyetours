'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Box, Button, TextField, Typography, Paper, Grid, MenuItem, Switch, FormControlLabel,
    InputAdornment, IconButton, Card, CardContent, Divider, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import { Trash2, Plus, ArrowLeft, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createPackage, updatePackage } from '@/app/actions/packages';
import { getActiveCategories } from '@/app/actions/categories';
import FileUploader from '../FileUploader';
import MultiFileUploader from '../MultiFileUploader';
import DayActivities from './DayActivities';

// Schema
const FormSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.coerce.number().min(0, 'Price must be positive'),
    durationDays: z.coerce.number().min(1, 'Duration must be at least 1 day'),
    category: z.string().optional(),
    type: z.string().default('package'),
    isFeatured: z.boolean().default(false),
    published: z.boolean().default(false),
    thumbnailUrl: z.string().optional(),
    images: z.array(z.string()).default([]),
    inclusions: z.array(z.object({ value: z.string() })).default([]),
    exclusions: z.array(z.object({ value: z.string() })).default([]),
    // Enhanced Itinerary
    itinerary: z.array(z.object({
        day: z.coerce.number(),
        title: z.string().min(1, 'Title required'),
        description: z.string().optional(),
        image: z.string().optional(),
        activities: z.array(z.object({
            title: z.string().min(1, 'Activity title required'),
            description: z.string().min(1, 'Description required')
        })).default([])
    })).default([]),
});

type PackageFormData = z.infer<typeof FormSchema>;

export default function PackageForm({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        const loadCategories = async () => {
            const res = await getActiveCategories();
            if (res.success && res.data) {
                setCategories(res.data);
            }
        };
        loadCategories();
    }, []);

    const defaultValues = initialData ? {
        ...initialData,
        inclusions: initialData.inclusions?.map((i: string) => ({ value: i })) || [],
        exclusions: initialData.exclusions?.map((e: string) => ({ value: e })) || [],
        images: initialData.images || [],
        itinerary: initialData.itinerary?.map((day: any) => ({
            ...day,
            activities: day.activities || []
        })) || [],
    } : {
        title: '', slug: '', description: '', price: 0, durationDays: 1,
        category: '', type: 'package', isFeatured: false, published: false,
        thumbnailUrl: '', images: [], inclusions: [], exclusions: [], itinerary: []
    };

    const { control, handleSubmit, register, watch, setValue, formState: { errors } } = useForm<PackageFormData>({
        resolver: zodResolver(FormSchema) as Resolver<PackageFormData>,
        defaultValues
    });

    const { fields: incFields, append: appendInc, remove: removeInc } = useFieldArray({ control, name: 'inclusions' });
    const { fields: excFields, append: appendExc, remove: removeExc } = useFieldArray({ control, name: 'exclusions' });
    const { fields: itinFields, append: appendItin, remove: removeItin } = useFieldArray({ control, name: 'itinerary' });

    const onSubmit = async (data: PackageFormData) => {
        setLoading(true);
        setError(null);

        const payload = {
            ...data,
            inclusions: data.inclusions.map(i => i.value),
            exclusions: data.exclusions.map(e => e.value),
            // Ensure images array has at least thumbnail if empty
            images: data.images.length ? data.images : (data.thumbnailUrl ? [data.thumbnailUrl] : [])
        };

        let res;
        if (initialData?.id) {
            res = await updatePackage(initialData.id, payload);
        } else {
            res = await createPackage(payload);
        }

        if (res.success) {
            router.push('/admin/dashboard/packages');
        } else {
            setError(res.error || 'Failed to save package');
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }} gap={2} mb={4}>
                <Box display="flex" justifyContent="space-between" width={{ xs: '100%', sm: 'auto' }}>
                    <Button startIcon={<ArrowLeft />} onClick={() => router.back()} color="inherit">
                        Back
                    </Button>
                </Box>

                <Typography variant="h4" fontWeight="bold" color="secondary.main" textAlign={{ xs: 'center', sm: 'left' }}>
                    {initialData ? 'Edit Package' : 'Create New Package'}
                </Typography>

                <Button type="submit" variant="contained" size="large" disabled={loading} fullWidth={false} sx={{ width: { xs: '100%', sm: 'auto' } }}>
                    {loading ? 'Saving...' : 'Save Package'}
                </Button>
            </Box>

            {error && <Typography color="error" mb={2}>{error}</Typography>}

            <Grid container spacing={3}>
                {/* Left Column */}
                <Grid size={{ xs: 12, md: 8 }}>

                    {/* Basic Info */}
                    <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6">Basic Information</Typography>
                            <Button size="small" variant="contained" type="submit">Save</Button>
                        </Box>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }}>
                                <TextField fullWidth label="Package Title" {...register('title')} error={!!errors.title} helperText={errors.title?.message} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField fullWidth label="Slug" {...register('slug')} error={!!errors.slug} helperText={errors.slug?.message} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Controller
                                    name="category"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            select
                                            fullWidth
                                            label="Category"
                                            error={!!errors.category}
                                            helperText={errors.category?.message}
                                            SelectProps={{
                                                displayEmpty: true,
                                            }}
                                        >
                                            <MenuItem value="" disabled>
                                                <em>Select a category</em>
                                            </MenuItem>
                                            {categories.length > 0 ? (
                                                categories.map((cat) => (
                                                    <MenuItem key={cat.id} value={cat.name}>
                                                        {cat.name}
                                                    </MenuItem>
                                                ))
                                            ) : (
                                                <MenuItem value="" disabled>
                                                    No categories found
                                                </MenuItem>
                                            )}
                                        </TextField>
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <TextField
                            label="Description" multiline rows={4} fullWidth margin="normal"
                            {...register('description')} error={!!errors.description} helperText={errors.description?.message}
                        />
                    </Paper>

                    {/* Itinerary Section */}
                    <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6">Itinerary ({watch('durationDays')} Days)</Typography>
                            <Box>
                                <Button size="small" variant="contained" type="submit" sx={{ mr: 1 }}>Save</Button>
                                <Button startIcon={<Plus />} size="small" onClick={() => appendItin({ day: itinFields.length + 1, title: '', description: '', image: '', activities: [] })}>
                                    Add Day
                                </Button>
                            </Box>
                        </Box>

                        {itinFields.map((field, index) => (
                            <Accordion key={field.id} sx={{ mb: 1, border: '1px solid', borderColor: 'divider' }} elevation={0}>
                                <AccordionSummary expandIcon={<ChevronDown />}>
                                    <Typography fontWeight="bold">Day {index + 1}: {watch(`itinerary.${index}.title`) || '(No Title)'}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={2}>
                                        <Grid size={{ xs: 12, md: 8 }}>
                                            <TextField
                                                fullWidth label="Title" size="small" sx={{ mb: 2 }}
                                                {...register(`itinerary.${index}.title` as const)}
                                                error={!!errors.itinerary?.[index]?.title}
                                            />
                                            {/* Sub-component for Activities Array */}
                                            <DayActivities
                                                nestIndex={index}
                                                control={control}
                                                register={register}
                                                errors={errors}
                                            />
                                            <input type="hidden" {...register(`itinerary.${index}.day` as const)} value={index + 1} />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <Typography variant="caption" mb={1} display="block">Day Image</Typography>
                                            <FileUploader
                                                folder="itineraries"
                                                label="Upload"
                                                value={watch(`itinerary.${index}.image`)}
                                                onUpload={(url) => setValue(`itinerary.${index}.image`, url)}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12 }}>
                                            <Button color="error" size="small" onClick={() => removeItin(index)}>Remove Day</Button>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Paper>

                    {/* Gallery Images */}
                    <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6">Package Banners (Hero Carousel)</Typography>
                            <Button size="small" variant="contained" type="submit">Save</Button>
                        </Box>
                        <MultiFileUploader
                            folder="packages"
                            values={watch('images')}
                            onUpload={(urls) => setValue('images', urls)}
                            aspectRatio="16/9"
                        />
                    </Paper>

                </Grid>

                {/* Right Column */}
                <Grid size={{ xs: 12, md: 4 }}>

                    {/* Settings */}
                    <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6">Settings & Price</Typography>
                            <Button size="small" variant="contained" type="submit">Save</Button>
                        </Box>
                        <Grid container spacing={2} mb={2}>
                            <Grid size={{ xs: 6 }}>
                                <TextField
                                    label="Price ($)" type="number" fullWidth
                                    {...register('price')} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                                />
                            </Grid>
                            <Grid size={{ xs: 6 }}>
                                <TextField label="Duration" type="number" fullWidth {...register('durationDays')} />
                            </Grid>
                        </Grid>
                        <FormControlLabel control={<Switch {...register('published')} defaultChecked={initialData?.published} />} label="Published" />
                        <FormControlLabel control={<Switch {...register('isFeatured')} defaultChecked={initialData?.isFeatured} />} label="Featured Package" />
                    </Paper>

                    {/* Thumbnail */}
                    <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6">Thumbnail</Typography>
                            <Button size="small" variant="contained" type="submit">Save</Button>
                        </Box>
                        <FileUploader
                            folder="thumbnails"
                            value={watch('thumbnailUrl')}
                            onUpload={(url) => setValue('thumbnailUrl', url)}
                        />
                    </Paper>

                    {/* Inclusions / Exclusions */}
                    <Paper sx={{ p: 3, borderRadius: 3 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6">Inclusions & Exclusions</Typography>
                            <Button size="small" variant="contained" type="submit">Save</Button>
                        </Box>
                        <Typography variant="subtitle1" fontWeight="bold" mb={1}>Inclusions</Typography>
                        {incFields.map((field, index) => (
                            <Box key={field.id} display="flex" gap={1} mb={1}>
                                <TextField size="small" fullWidth {...register(`inclusions.${index}.value` as const)} />
                                <IconButton size="small" color="error" onClick={() => removeInc(index)}><Trash2 size={16} /></IconButton>
                            </Box>
                        ))}
                        <Button size="small" startIcon={<Plus />} onClick={() => appendInc({ value: '' })}>Add</Button>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="subtitle1" fontWeight="bold" mb={1}>Exclusions</Typography>
                        {excFields.map((field, index) => (
                            <Box key={field.id} display="flex" gap={1} mb={1}>
                                <TextField size="small" fullWidth {...register(`exclusions.${index}.value` as const)} />
                                <IconButton size="small" color="error" onClick={() => removeExc(index)}><Trash2 size={16} /></IconButton>
                            </Box>
                        ))}
                        <Button size="small" startIcon={<Plus />} onClick={() => appendExc({ value: '' })}>Add</Button>
                    </Paper>

                </Grid>
            </Grid>
        </form>
    );
}
