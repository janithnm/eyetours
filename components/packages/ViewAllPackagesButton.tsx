'use client';

import { Button } from '@mui/material';
import Link from 'next/link';

export default function ViewAllPackagesButton() {
    return (
        <Button
            component={Link}
            href="/tours"
            variant="outlined"
            size="large"
            sx={{
                borderRadius: 50,
                px: 5,
                py: 1.5,
                borderWidth: 2,
                '&:hover': { borderWidth: 2 }
            }}
        >
            View All Packages
        </Button>
    );
}
