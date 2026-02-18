'use client';

import { Breadcrumbs, Link as MuiLink, Typography } from '@mui/material';
import Link from 'next/link';
import { Home, Compass } from 'lucide-react';

export default function ToursBreadcrumbs() {
    return (
        <Breadcrumbs aria-label="breadcrumb">
            <MuiLink
                component={Link}
                href="/"
                underline="hover"
                color="inherit"
                sx={{ display: 'flex', alignItems: 'center' }}
            >
                <Home size={16} style={{ marginRight: 4 }} />
                Home
            </MuiLink>
            <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
                <Compass size={16} style={{ marginRight: 4 }} />
                Tours
            </Typography>
        </Breadcrumbs>
    );
}
