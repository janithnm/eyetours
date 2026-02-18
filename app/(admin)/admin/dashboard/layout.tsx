'use client';

import { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminAppBar from '@/components/admin/AdminAppBar';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            <AdminSidebar open={mobileOpen} onClose={handleDrawerToggle} />

            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <AdminAppBar onMenuClick={handleDrawerToggle} />
                <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
