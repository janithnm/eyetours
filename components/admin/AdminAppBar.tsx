'use client';

import { AppBar, Avatar, Box, IconButton, Toolbar, Typography, Badge, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon, Bell, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { getInquiryStats } from '@/app/actions/inquiries';

export default function AdminAppBar({ onMenuClick }: { onMenuClick: () => void }) {
    const { data: session } = authClient.useSession();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const router = useRouter();
    const [notifications, setNotifications] = useState(0);

    useEffect(() => {
        const fetchStats = async () => {
            const stats = await getInquiryStats();
            setNotifications(stats.pending);
        };
        fetchStats();
    }, []);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await authClient.signOut();
        router.push('/admin/login');
    };

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                bgcolor: 'background.paper',
                borderBottom: '1px solid',
                borderColor: 'divider',
                color: 'text.primary',
            }}
        >
            <Toolbar sx={{ minHeight: { xs: 50, md: 64 } }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={onMenuClick}
                    sx={{ mr: 2, display: { md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                    Dashboard
                </Typography>

                <Box display="flex" alignItems="center" gap={2}>
                    <IconButton size="large" color="inherit">
                        <Badge badgeContent={notifications} color="error">
                            <Bell size={20} />
                        </Badge>
                    </IconButton>

                    <Box display="flex" alignItems="center" gap={1} onClick={handleMenu} sx={{ cursor: 'pointer' }}>
                        <Typography variant="subtitle2" fontWeight="bold" display={{ xs: 'none', sm: 'block' }}>
                            {session?.user?.name || 'Admin'}
                        </Typography>
                        <Avatar
                            src={session?.user?.image || undefined}
                            alt={session?.user?.name || 'Admin'}
                            sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}
                        >
                            {!session?.user?.image && <User size={18} />}
                        </Avatar>
                    </Box>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
