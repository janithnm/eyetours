'use client';

import { Button } from '@mui/material';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BackToHomeButton() {
    return (
        <Button
            component={Link}
            href="/"
            startIcon={<ArrowLeft />}
            sx={{ mb: 2 }}
        >
            Back to Home
        </Button>
    );
}
