'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { Box, Button, Card, CardContent, TextField, Typography, Alert, Link as MuiLink } from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminSignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async () => {
        setLoading(true);
        setError(null);
        await authClient.signUp.email({
            email,
            password,
            name,
        }, {
            onSuccess: () => {
                router.push('/admin/dashboard');
            },
            onError: (ctx) => {
                setError(ctx.error.message);
                setLoading(false);
            }
        });
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="background.default">
            <Card sx={{ maxWidth: 400, width: '100%', p: 2, borderRadius: 3 }}>
                <CardContent>
                    <Box textAlign="center" mb={3}>
                        <Typography variant="h5" fontWeight="bold" color="primary">Create Admin Account</Typography>
                        <Typography variant="body2" color="text.secondary">Join the team</Typography>
                    </Box>

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                    <TextField
                        label="Full Name"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSignup}
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </Button>

                    <Box textAlign="center">
                        <Link href="/admin/login" passHref legacyBehavior>
                            <MuiLink variant="body2" color="text.secondary">Already have an account? Sign In</MuiLink>
                        </Link>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
