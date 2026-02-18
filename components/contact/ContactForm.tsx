'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { isValidEmail } from '@/utils/validation';
import { Box, Button, TextField, Typography, Alert, Snackbar } from '@mui/material';
import { Send } from 'lucide-react';
import { submitContactForm } from '@/app/actions/contact';

const FormSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().refine(isValidEmail, { message: 'Invalid email address' }),
    subject: z.string().min(1, 'Subject is required'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof FormSchema>;

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
        resolver: zodResolver(FormSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const res = await submitContactForm(data);
        if (res.success) {
            setSuccess(true);
            reset();
        } else {
            setError(res.error || 'Failed to send message');
        }
        setLoading(false);
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h5" fontWeight="bold" color="secondary.main" gutterBottom>
                Send us a Message
            </Typography>

            <TextField
                fullWidth label="Your Name"
                {...register('name')}
                error={!!errors.name} helperText={errors.name?.message}
            />
            <TextField
                fullWidth label="Email Address"
                {...register('email')}
                error={!!errors.email} helperText={errors.email?.message}
            />
            <TextField
                fullWidth label="Subject"
                {...register('subject')}
                error={!!errors.subject} helperText={errors.subject?.message}
            />
            <TextField
                fullWidth label="Message" multiline rows={4}
                {...register('message')}
                error={!!errors.message} helperText={errors.message?.message}
            />

            <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<Send size={18} />}
                disabled={loading}
                sx={{ alignSelf: 'flex-start', px: 4, py: 1.5, borderRadius: 50, fontWeight: 'bold' }}
            >
                {loading ? 'Sending...' : 'Send Message'}
            </Button>

            <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
                <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
                    Message sent successfully! We will get back to you soon.
                </Alert>
            </Snackbar>
            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
                <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
}
