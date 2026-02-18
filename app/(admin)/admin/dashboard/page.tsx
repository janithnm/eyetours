'use client';

import { Box, Grid, Typography, Card, CardContent, Stack, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Tooltip, CircularProgress } from '@mui/material';
import { Package, FileText, MessageSquare, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getDashboardStats } from '@/app/actions/dashboard';
import { getRecentActivity } from '@/app/actions/inquiries';
import ViewInquiryModal from '@/components/admin/inquiries/ViewInquiryModal';

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({
        totalInquiries: 0,
        pendingInquiries: 0,
        totalPackages: 0,
        totalPosts: 0,
    });
    const [recentActivity, setRecentActivity] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            const [statsRes, activityRes] = await Promise.all([
                getDashboardStats(),
                getRecentActivity(20)
            ]);

            if (statsRes.success && statsRes.data) {
                setStats({
                    totalInquiries: statsRes.data.totalInquiries,
                    pendingInquiries: statsRes.data.pendingInquiries,
                    totalPackages: statsRes.data.totalPackages,
                    totalPosts: statsRes.data.totalPosts
                });
            }

            if (activityRes.success) {
                setRecentActivity(activityRes.data || []);
            }
            setLoading(false);
        };
        fetchDashboardData();
    }, []);

    const dashboardStats = [
        { title: 'Total Inquiries', value: stats.totalInquiries, icon: MessageSquare, color: '#fb8500' },
        { title: 'Pending Review', value: stats.pendingInquiries, icon: MessageSquare, color: '#d00000' },
        { title: 'Blog Posts', value: stats.totalPosts, icon: FileText, color: '#023047' },
        { title: 'Total Packages', value: stats.totalPackages, icon: Package, color: '#8ecae6' },
    ];

    if (loading) return <Box display="flex" justifyContent="center" p={5}><CircularProgress /></Box>;

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom color="secondary.main">
                Welcome Back, Admin
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
                Here&apos;s what&apos;s happening with your travel agency today.
            </Typography>

            {/* Stats Grid */}
            <Grid container spacing={3} mb={6}>
                {dashboardStats.map((stat, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 4 }}>
                            <CardContent>
                                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">
                                            {stat.title}
                                        </Typography>
                                        <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
                                            {stat.value}
                                        </Typography>
                                    </Box>
                                    <Avatar sx={{ bgcolor: stat.color, width: 48, height: 48 }}>
                                        <stat.icon size={24} color="white" />
                                    </Avatar>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Recent Activity Section */}
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Recent Activity
            </Typography>
            {recentActivity.length > 0 ? (
                <TableContainer component={Card} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 4, maxHeight: 600 }}>
                    <Table stickyHeader>
                        <TableHead sx={{ bgcolor: 'grey.50' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Customer</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Details</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recentActivity.map((item) => (
                                <TableRow key={`${item.type}-${item.id}`} hover>
                                    <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={item.type === 'booking' ? 'Booking' : 'Inquiry'}
                                            size="small"
                                            color={item.type === 'booking' ? 'primary' : 'secondary'}
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" fontWeight="bold">{item.customerName}</Typography>
                                        <Typography variant="caption" color="text.secondary">{item.customerEmail}</Typography>
                                    </TableCell>
                                    <TableCell sx={{ maxWidth: 300 }}>
                                        {item.type === 'booking' ? (
                                            <Box>
                                                <Typography variant="body2" fontWeight="medium">{item.package?.title}</Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    Travel Date: {new Date(item.travelDate).toLocaleDateString()}
                                                </Typography>
                                            </Box>
                                        ) : (
                                            <Typography variant="body2" noWrap>{item.message}</Typography>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={item.status}
                                            size="small"
                                            sx={{ textTransform: 'capitalize' }}
                                            color={item.status === 'pending' ? 'warning' : 'success'}
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title="View Details">
                                            <IconButton size="small" onClick={() => setSelectedInquiry(item)} color="primary">
                                                <Eye size={18} />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 4, minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography color="text.secondary">No recent activity found.</Typography>
                </Card>
            )}

            <ViewInquiryModal
                open={!!selectedInquiry}
                onClose={() => setSelectedInquiry(null)}
                inquiry={selectedInquiry}
            />
        </Box>
    );
}
