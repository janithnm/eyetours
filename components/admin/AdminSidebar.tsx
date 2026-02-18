import { useEffect, useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme, useMediaQuery, Chip, Fade } from '@mui/material';
import { LayoutDashboard, Users, UserPlus, Image as ImageIcon, Map, FileText, Briefcase, Layers, Settings, MessageSquare, Package, LogOut, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { getInquiryStats } from '@/app/actions/inquiries';
import Image from 'next/image';

const drawerWidth = 280;

const menuItems = [
    { text: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { text: 'Packages', icon: Package, path: '/admin/dashboard/packages' },
    { text: 'Categories', icon: Layers, path: '/admin/dashboard/categories' },
    { text: 'Destinations', icon: Map, path: '/admin/dashboard/destinations' },
    { text: 'Blog Categories', icon: Layers, path: '/admin/dashboard/blog-categories' },
    { text: 'Blogs', icon: FileText, path: '/admin/dashboard/blogs' },
    { text: 'Inquiries', icon: MessageSquare, path: '/admin/dashboard/inquiries' },
    { text: 'Team', icon: Users, path: '/admin/dashboard/team' },
    { text: 'Partners', icon: Users, path: '/admin/dashboard/partners' },
    { text: 'Gallery', icon: ImageIcon, path: '/admin/dashboard/gallery' },
    { text: 'Planners', icon: RotateCcw, path: '/admin/dashboard/planner' },
    { text: 'Messages', icon: MessageSquare, path: '/admin/dashboard/messages' },
    { text: 'Settings', icon: Settings, path: '/admin/dashboard/settings' },
];

export default function AdminSidebar({ open, onClose }: { open: boolean, onClose: () => void }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const pathname = usePathname();
    const router = useRouter();
    const [pendingInquiries, setPendingInquiries] = useState(0);

    useEffect(() => {
        getInquiryStats().then(res => setPendingInquiries(res.pending));
    }, []);

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/admin/login');
                },
            },
        });
    };

    const drawerContent = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <Box
                    sx={{
                        width: 160,
                        height: 160,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',


                    }}
                >
                    <Image src="/virwhite.png" alt="Logo" width={160} height={160} className='w-full h-full' />
                </Box>

            </Box>

            <List sx={{ flexGrow: 1, px: 2 }}>
                {menuItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                            <Link href={item.path} style={{ textDecoration: 'none', width: '100%' }}>
                                <ListItemButton
                                    selected={isActive}
                                    sx={{
                                        borderRadius: 2,
                                        '&.Mui-selected': {
                                            bgcolor: 'primary.main',
                                            color: 'primary.contrastText',
                                            '&:hover': {
                                                bgcolor: 'primary.dark',
                                            },
                                            '& .MuiListItemIcon-root': {
                                                color: 'inherit',
                                            },
                                        },
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 40, color: isActive ? 'inherit' : 'primary.main' }}>
                                        <item.icon size={20} />
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 500 }} />
                                    {item.text === 'Inquiries' && pendingInquiries > 0 && (
                                        <Fade in={true}>
                                            <Chip
                                                label={pendingInquiries}
                                                size="small"
                                                color="error"
                                                sx={{
                                                    height: 20,
                                                    minWidth: 20,
                                                    fontSize: '0.7rem',
                                                    fontWeight: 'bold',
                                                    bgcolor: isActive ? 'white' : 'error.main',
                                                    color: isActive ? 'primary.main' : 'white'
                                                }}
                                            />
                                        </Fade>
                                    )}
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    );
                })}
            </List>

            <Box p={2}>
                <ListItemButton
                    onClick={handleLogout}
                    sx={{
                        borderRadius: 2,
                        color: 'error.main',
                        '&:hover': {
                            bgcolor: 'error.light',
                            color: 'error.contrastText',
                        }
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                        <LogOut size={20} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 600 }} />
                </ListItemButton>
            </Box>
        </Box>
    );

    return (
        <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={open}
                onClose={onClose}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Desktop Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: '1px solid rgba(0,0,0,0.08)' },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
}
