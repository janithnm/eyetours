'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Box, Typography, Button, Paper, Grid, TextField, Divider, FormControlLabel, Switch
} from '@mui/material';
import { getSiteSettings, updateSiteSettings } from '@/app/actions/settings';
import { Save } from 'lucide-react';

const SettingsSchema = z.object({
    companyName: z.string().min(1, 'Company Name is required'),
    email: z.string().email('Invalid email').optional().or(z.literal('')),
    phone: z.string().optional(),
    hotline: z.string().optional(),
    whatsapp: z.string().optional(),
    address: z.string().optional(),
    facebook: z.string().url('Invalid URL').optional().or(z.literal('')),
    instagram: z.string().url('Invalid URL').optional().or(z.literal('')),
    youtube: z.string().url('Invalid URL').optional().or(z.literal('')),
    showPrice: z.boolean().optional(),
});

type SettingsData = z.infer<typeof SettingsSchema>;

export default function SettingsPage() {
    const [loading, setLoading] = useState(false);
    const [fetched, setFetched] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<SettingsData>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            companyName: '', email: '', phone: '', hotline: '', whatsapp: '', address: '',
            facebook: '', instagram: '', youtube: '', showPrice: true
        }
    });

    const showPrice = watch('showPrice');

    useEffect(() => {
        const fetchSettings = async () => {
            const res = await getSiteSettings();
            if (res.success && res.data) {
                reset({
                    companyName: res.data.companyName || '',
                    email: res.data.email || '',
                    phone: res.data.phone || '',
                    hotline: res.data.hotline || '',
                    whatsapp: res.data.whatsapp || '',
                    address: res.data.address || '',
                    facebook: res.data.facebook || '',
                    instagram: res.data.instagram || '',
                    youtube: res.data.youtube || '',
                    showPrice: res.data.showPrice ?? true
                });
            }
            setFetched(true);
        };
        fetchSettings();
    }, [reset]);

    const onSubmit = async (data: SettingsData) => {
        setLoading(true);
        setSuccessMessage(null);
        setErrorMessage(null);

        const res = await updateSiteSettings(data);
        if (res.success) {
            setSuccessMessage('Settings saved successfully!');
            setTimeout(() => setSuccessMessage(null), 3000);
        } else {
            setErrorMessage(res.error || 'Failed to save settings');
        }
        setLoading(false);
    };

    if (!fetched) {
        return <Typography>Loading settings...</Typography>;
    }

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" color="secondary.main" mb={4}>
                Site Settings
            </Typography>

            <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {successMessage && (
                        <Typography color="success.main" mb={2} fontWeight="bold">{successMessage}</Typography>
                    )}
                    {errorMessage && (
                        <Typography color="error" mb={2} fontWeight="bold">{errorMessage}</Typography>
                    )}

                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12 }} >
                            <Typography variant="h6" fontWeight="bold" gutterBottom>General Information</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth label="Company Name"
                                        {...register('companyName')}
                                        error={!!errors.companyName} helperText={errors.companyName?.message}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth label="Address"
                                        {...register('address')}
                                        error={!!errors.address} helperText={errors.address?.message}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>Contact Details</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextField
                                        fullWidth label="Contact Email"
                                        {...register('email')}
                                        error={!!errors.email} helperText={errors.email?.message}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextField
                                        fullWidth label="Phone Number"
                                        {...register('phone')}
                                        error={!!errors.phone} helperText={errors.phone?.message}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextField
                                        fullWidth label="Hotline"
                                        {...register('hotline')}
                                        error={!!errors.hotline} helperText={errors.hotline?.message}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextField
                                        fullWidth label="WhatsApp Number"
                                        {...register('whatsapp')}
                                        error={!!errors.whatsapp} helperText={errors.whatsapp?.message}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>Display Settings</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={showPrice}
                                        onChange={(e) => setValue('showPrice', e.target.checked)}
                                    />
                                }
                                label="Show Prices on Website"
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>Social Media Links</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextField
                                        fullWidth label="Facebook URL"
                                        {...register('facebook')}
                                        error={!!errors.facebook} helperText={errors.facebook?.message}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }} >
                                    <TextField
                                        fullWidth label="Instagram URL"
                                        {...register('instagram')}
                                        error={!!errors.instagram} helperText={errors.instagram?.message}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }} >
                                    <TextField
                                        fullWidth label="YouTube URL"
                                        {...register('youtube')}
                                        error={!!errors.youtube} helperText={errors.youtube?.message}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <Box display="flex" justifyContent="flex-end">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    startIcon={<Save />}
                                    disabled={loading}
                                >
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
}
