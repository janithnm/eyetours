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
import { createTeamMember, updateTeamMember } from '@/app/actions/about';
import FileUploader from '../FileUploader';

const TeamSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    role: z.string().min(1, 'Role is required'),
    bio: z.string().optional(),
    image: z.string().optional(),
    active: z.boolean(),
    order: z.number(),
});

type TeamFormData = z.infer<typeof TeamSchema>;

interface TeamFormProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialData?: any;
}

export default function TeamForm({ open, onClose, onSuccess, initialData }: TeamFormProps) {
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<TeamFormData>({
        resolver: zodResolver(TeamSchema),
        defaultValues: {
            name: '', role: '', bio: '', image: '', active: true, order: 0
        }
    });

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        } else {
            reset({ name: '', role: '', bio: '', image: '', active: true, order: 0 });
        }
    }, [initialData, reset]);

    const handleImageUpload = () => {
        const url = prompt("Enter image URL:", "https://source.unsplash.com/random/400x400?face");
        if (url) setValue('image', url);
    };

    const onSubmit = async (data: TeamFormData) => {
        setLoading(true);
        let res;
        if (initialData?.id) {
            res = await updateTeamMember(initialData.id, data);
        } else {
            res = await createTeamMember(data);
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
            <DialogTitle>{initialData ? 'Edit Term Member' : 'Add New Team Member'}</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12 }}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Typography variant="caption" mb={1}>Profile Photo</Typography>
                                <FileUploader
                                    folder="team"
                                    value={watch('image')}
                                    onUpload={(url) => setValue('image', url)}
                                    label="Upload Photo"
                                />
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField fullWidth label="Name" {...register('name')} error={!!errors.name} helperText={errors.name?.message} />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField fullWidth label="Role" {...register('role')} error={!!errors.role} helperText={errors.role?.message} />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField fullWidth multiline rows={3} label="Bio" {...register('bio')} />
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
