'use client';

import { useEffect, useState } from 'react';
import { getInquiries, getBookings, updateInquiryStatus, updateBookingStatus } from '@/app/actions/inquiries';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    IconButton, Chip, Alert, CircularProgress, Tabs, Tab, MenuItem, Select, Tooltip
} from '@mui/material';
import { Eye } from 'lucide-react';
import ViewInquiryModal from '@/components/admin/inquiries/ViewInquiryModal';

export default function InquiriesPage() {
    const [tab, setTab] = useState(0);
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);

    const fetchData = async () => {
        setLoading(true);
        const [inqRes, bookRes] = await Promise.all([getInquiries(), getBookings()]);

        if (inqRes.success) setInquiries(inqRes.data || []);
        else setError('Failed to fetch inquiries');

        if (bookRes.success) setBookings(bookRes.data || []);
        else setError('Failed to fetch bookings');

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleStatusChange = async (id: number, type: 'inquiry' | 'booking', newStatus: string) => {
        const action = type === 'inquiry' ? updateInquiryStatus : updateBookingStatus;
        const res = await action(id, newStatus);

        if (res.success) {
            fetchData(); // Refresh data
        } else {
            alert('Failed to update status');
        }
    };

    if (loading) return <Box display="flex" justifyContent="center" p={5}><CircularProgress /></Box>;

    const BOOKING_STATUSES = ['pending', 'confirmed', 'cancelled', 'completed'];
    const INQUIRY_STATUSES = ['pending', 'reviewed', 'contacted', 'booked', 'archived'];

    const StatusChip = ({ status }: { status: string }) => {
        let color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' = 'default';
        if (status === 'confirmed' || status === 'booked' || status === 'completed') color = 'success';
        if (status === 'pending') color = 'warning';
        if (status === 'cancelled') color = 'error';
        if (status === 'contacted' || status === 'reviewed') color = 'info';
        if (status === 'archived') color = 'default';

        return <Chip label={status} color={color} size="small" variant="outlined" sx={{ textTransform: 'capitalize' }} />;
    };

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" color="secondary.main" mb={4}>
                Inquiries & Bookings
            </Typography>

            <Paper sx={{ mb: 3, borderRadius: 3, overflow: 'hidden' }}>
                <Tabs
                    value={tab}
                    onChange={(_, v) => setTab(v)}
                    textColor="secondary"
                    indicatorColor="secondary"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab label={`Package Bookings (${bookings.length})`} />
                    <Tab label={`Custom Inquiries (${inquiries.length})`} />
                </Tabs>
            </Paper>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
                <Box sx={{ overflowX: 'auto' }}>
                    <Table>
                        <TableHead sx={{ bgcolor: 'grey.50' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Customer</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Details</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(tab === 0 ? bookings : inquiries).map((item) => (
                                <TableRow key={item.id} hover>
                                    <TableCell sx={{ color: 'text.secondary' }}>
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <Typography fontWeight="medium">{item.customerName}</Typography>
                                        <Typography variant="caption" display="block">{item.customerEmail}</Typography>
                                        <Typography variant="caption" color="text.secondary">{item.customerPhone}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        {tab === 0 ? (
                                            <>
                                                <Typography variant="body2" fontWeight="bold">{item.package?.title}</Typography>
                                                <Typography variant="caption">Travel Date: {new Date(item.travelDate).toLocaleDateString()}</Typography>
                                                <Typography variant="caption" display="block">People: {item.numberOfPeople}</Typography>
                                            </>
                                        ) : (
                                            <>
                                                <Typography variant="body2" sx={{ maxWidth: 300 }} noWrap>{item.message}</Typography>
                                                <Typography variant="caption">Budget: {item.budgetRange} | Dest: {item.destinations?.join(', ')}</Typography>
                                            </>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <StatusChip status={item.status} />
                                    </TableCell>
                                    <TableCell>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Tooltip title="View Details">
                                                <IconButton size="small" onClick={() => setSelectedInquiry(item)} color="primary">
                                                    <Eye size={18} />
                                                </IconButton>
                                            </Tooltip>

                                            <Select
                                                size="small"
                                                value={item.status}
                                                onChange={(e) => handleStatusChange(item.id, tab === 0 ? 'booking' : 'inquiry', e.target.value)}
                                                sx={{ fontSize: '0.8rem', minWidth: 120, height: 32 }}
                                            >
                                                {(tab === 0 ? BOOKING_STATUSES : INQUIRY_STATUSES).map((status) => (
                                                    <MenuItem key={status} value={status} sx={{ textTransform: 'capitalize' }}>
                                                        {status}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {(tab === 0 ? bookings : inquiries).length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                                        <Typography color="text.secondary">No items found.</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Box>
            </Paper>

            <ViewInquiryModal
                open={!!selectedInquiry}
                onClose={() => setSelectedInquiry(null)}
                inquiry={selectedInquiry}
            />
        </Box>
    );
}
