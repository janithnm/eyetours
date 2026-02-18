'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Box, Button, Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Grid, FormControlLabel, Switch, MenuItem, Typography
} from '@mui/material';
import { createPlannerOption, updatePlannerOption } from '@/app/actions/planner';
import { toast } from 'sonner';

const optionSchema = z.object({
    category: z.string().min(1, 'Category is required'),
    label: z.string().min(1, 'Label is required'),
    description: z.string().optional(),
    image: z.string().optional(),
    active: z.boolean().default(true),
    // Metadata fields (we'll extract these into the metadata jsonb object)
    stars: z.coerce.number().min(0).max(5).optional(), // For accommodation
});

type OptionFormValues = z.infer<typeof optionSchema>;

interface PlannerOptionFormProps {
    open: boolean;
    onClose: () => void;
    initialData?: any;
    categories: string[];
}

export default function PlannerOptionForm({ open, onClose, initialData, categories }: PlannerOptionFormProps) {
    const [submitting, setSubmitting] = useState(false);

    const { control, handleSubmit, reset, watch, setValue } = useForm<OptionFormValues>({
        resolver: zodResolver(optionSchema) as Resolver<OptionFormValues>,
        defaultValues: {
            category: categories[0] || 'region',
            label: '',
            description: '',
            image: '',
            active: true,
            stars: 0
        }
    });

    const category = watch('category');

    useEffect(() => {
        if (initialData) {
            reset({
                category: initialData.category,
                label: initialData.label,
                description: initialData.description || '',
                image: initialData.image || '',
                active: initialData.active,
                stars: initialData.metadata?.stars || 0
            });
        } else {
            reset({
                category: categories[0] || 'region',
                label: '',
                description: '',
                image: '',
                active: true,
                stars: 0
            });
        }
    }, [initialData, reset, categories]);

    const onSubmit = async (data: OptionFormValues) => {
        setSubmitting(true);
        try {
            // Transform form data for DB
            const dbData: any = {
                category: data.category,
                label: data.label,
                description: data.description,
                image: data.image,
                active: data.active,
                metadata: {}
            };

            if (data.category === 'accommodation') {
                dbData.metadata.stars = data.stars;
            }

            let res;
            if (initialData) {
                res = await updatePlannerOption(initialData.id, dbData);
            } else {
                res = await createPlannerOption(dbData);
            }

            if (res.success) {
                toast.success(initialData ? 'Option updated' : 'Option created');
                onClose();
            } else {
                toast.error(res.error || 'Operation failed');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{initialData ? 'Edit Option' : 'Add New Option'}</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12 }}>
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        select
                                        fullWidth
                                        label="Category"
                                        disabled={!!initialData} // Lock category on edit to prevent confusion
                                    >
                                        {categories.map((c) => (
                                            <MenuItem key={c} value={c} sx={{ textTransform: 'capitalize' }}>
                                                {c}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Controller
                                name="label"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} fullWidth label="Label" placeholder="e.g. Cultural Triangle" />
                                )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} fullWidth multiline rows={3} label="Description" />
                                )}
                            />
                        </Grid>

                        {/* Category specific fields */}
                        {category === 'accommodation' && (
                            <Grid size={{ xs: 12 }}>
                                <Controller
                                    name="stars"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            type="number"
                                            label="Star Rating (1-5)"
                                            InputProps={{ inputProps: { min: 1, max: 5 } }}
                                        />
                                    )}
                                />
                            </Grid>
                        )}
                        {/* We can integrate file upload here similarly to other forms if needed, keeping it simple for text fields first */}

                        <Grid size={{ xs: 12 }}>
                            <Controller
                                name="active"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={<Switch checked={field.value} onChange={field.onChange} />}
                                        label="Active"
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} disabled={submitting}>Cancel</Button>
                    <Button type="submit" variant="contained" disabled={submitting}>
                        {submitting ? 'Saving...' : 'Save'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
