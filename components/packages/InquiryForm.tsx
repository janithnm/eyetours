'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { isValidEmail, isValidMobile } from '@/utils/validation';
import { submitInquiry } from '@/app/actions/packages';
import {
    Box, Button, TextField, Typography, Alert, Stack,
    FormControlLabel, Checkbox, Paper
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Loader2, Send } from 'lucide-react';

const InquirySchema = z.object({
    customerName: z.string().min(1, 'Name is required'),
    customerEmail: z.string().refine(isValidEmail, { message: 'Invalid email address' }),
    customerPhone: z.string().optional().refine(val => !val || isValidMobile(val), { message: 'Invalid phone number' }),
    travelDate: z.date(),
    numberOfPeople: z.number().min(1, 'At least 1 person required'),
    message: z.string().optional(),
});

type InquiryFormValues = z.infer<typeof InquirySchema>;

export default function InquiryForm({ packageId, packageTitle }: { packageId?: number, packageTitle?: string }) {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [serverError, setServerError] = useState<string | null>(null);

    const { control, register, handleSubmit, formState: { errors }, reset } = useForm<InquiryFormValues>({
        resolver: zodResolver(InquirySchema),
        defaultValues: {
            numberOfPeople: 2,
            message: ''
        }
    });

    const onSubmit = async (data: InquiryFormValues) => {
        setStatus('submitting');
        setServerError(null);

        const formData = new FormData();
        formData.append('customerName', data.customerName);
        formData.append('customerEmail', data.customerEmail);
        if (data.customerPhone) formData.append('customerPhone', data.customerPhone);
        formData.append('travelDate', data.travelDate.toISOString());
        formData.append('numberOfPeople', data.numberOfPeople.toString());
        if (data.message) formData.append('message', data.message);
        if (packageId) formData.append('packageId', packageId.toString());

        const result = await submitInquiry(null, formData);

        if (result.success) {
            setStatus('success');
            reset();
        } else {
            setStatus('error');
            setServerError(result.message || 'Something went wrong. Please try again.');
        }
    };

    if (status === 'success') {
        return (
            <Paper elevation={3} sx={{ p: 4, borderRadius: 4, bgcolor: 'success.light', color: 'success.contrastText' }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>Success!</Typography>
                <Typography>
                    Thank you for your interest in <strong>{packageTitle}</strong>. We have received your inquiry and will contact you shortly.
                </Typography>
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => setStatus('idle')}
                    sx={{ mt: 3, borderRadius: 4 }}
                >
                    Send Another Inquiry
                </Button>
            </Paper>
        );
    }

    return (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Book This Tour
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
                Fill out the form below to inquire about {packageTitle}.
            </Typography>

            {status === 'error' && (
                <Alert severity="error" sx={{ mb: 3 }}>{serverError}</Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                    <TextField
                        label="Full Name"
                        fullWidth
                        {...register('customerName')}
                        error={!!errors.customerName}
                        helperText={errors.customerName?.message}
                    />

                    <TextField
                        label="Email Address"
                        type="email"
                        fullWidth
                        {...register('customerEmail')}
                        error={!!errors.customerEmail}
                        helperText={errors.customerEmail?.message}
                    />

                    <TextField
                        label="Phone Number (Optional)"
                        type="tel"
                        fullWidth
                        {...register('customerPhone')}
                    />

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Controller
                            control={control}
                            name="travelDate"
                            render={({ field }) => (
                                <DatePicker
                                    label="Travel Date"
                                    value={field.value || null}
                                    onChange={(date) => field.onChange(date)}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            error: !!errors.travelDate,
                                            helperText: errors.travelDate?.message
                                        }
                                    }}
                                />
                            )}
                        />
                    </LocalizationProvider>

                    <TextField
                        label="Number of Travelers"
                        type="number"
                        fullWidth
                        {...register('numberOfPeople', { valueAsNumber: true })}
                        error={!!errors.numberOfPeople}
                        helperText={errors.numberOfPeople?.message}
                        slotProps={{ htmlInput: { min: 1 } }}
                    />

                    <TextField
                        label="Additional Message"
                        multiline
                        rows={4}
                        fullWidth
                        {...register('message')}
                        placeholder="Any specific requests or questions?"
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={status === 'submitting'}
                        startIcon={status === 'submitting' ? <Loader2 className="animate-spin" /> : <Send />}
                        sx={{ borderRadius: 3, py: 1.5, fontWeight: 'bold' }}
                    >
                        {status === 'submitting' ? 'Sending...' : 'Send Inquiry'}
                    </Button>
                </Stack>
            </form>
        </Paper>
    );
}
