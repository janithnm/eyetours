'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions,
    FormControlLabel, Switch, Grid, Typography
} from '@mui/material';
import { Upload } from 'lucide-react';
import { createPartner, updatePartner } from '@/app/actions/about';
import FileUploader from '../FileUploader';

const PartnerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    website: z.string().optional(),
    logo: z.string().optional(),
    active: z.boolean(),
    order: z.number(),
});

type PartnerFormData = z.infer<typeof PartnerSchema>;

interface PartnerFormProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialData?: any;
}

export default function PartnerForm({ open, onClose, onSuccess, initialData }: PartnerFormProps) {
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<PartnerFormData>({
        resolver: zodResolver(PartnerSchema),
        defaultValues: {
            name: '', website: '', logo: '', active: true, order: 0
        }
    });

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        } else {
            reset({ name: '', website: '', logo: '', active: true, order: 0 });
        }
    }, [initialData, reset]);

    const handleImageUpload = () => {
        const url = prompt("Enter logo URL:", "https://via.placeholder.com/150");
        if (url) setValue('logo', url);
    };

    const onSubmit = async (data: PartnerFormData) => {
        setLoading(true);
        let res;
        if (initialData?.id) {
            res = await updatePartner(initialData.id, data);
        } else {
            res = await createPartner(data);
        }
        setLoading(false);

        if (res.success) {
            onSuccess();
            onClose();
        } else {
            alert(res.error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{initialData ? 'Edit Partner' : 'Add New Partner'}</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12 }}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Typography variant="caption" mb={1}>Partner Logo</Typography>
                                <FileUploader
                                    folder="partners"
                                    value={watch('logo')}
                                    onUpload={(url) => setValue('logo', url)}
                                    label="Upload Logo"
                                />
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField fullWidth label="Name" {...register('name')} error={!!errors.name} helperText={errors.name?.message} />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField fullWidth label="Website URL" {...register('website')} placeholder="https://" />
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Order"
                                {...register('order', { valueAsNumber: true })}
                                error={!!errors.order}
                                helperText={errors.order?.message}
                            />
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                            <FormControlLabel
                                control={<Switch {...register('active')} defaultChecked={initialData?.active ?? true} />}
                                label="Active"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" disabled={loading}>Save</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
