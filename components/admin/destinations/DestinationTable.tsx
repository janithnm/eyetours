'use client';

import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, IconButton, Chip, Box, Typography, Button, Switch
} from '@mui/material';
import { Edit, Trash2, Eye, Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteDestination, toggleDestinationStatus } from '@/app/actions/destinations';
import { useState } from 'react';
import { toast } from 'sonner';

export default function DestinationTable({ destinations }: { destinations: any[] }) {
    const router = useRouter();
    const [loadingId, setLoadingId] = useState<number | null>(null);

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this destination?')) {
            const res = await deleteDestination(id);
            if (res.success) {
                toast.success('Destination deleted');
            } else {
                toast.error('Failed to delete destination');
            }
        }
    };

    const handleToggleStatus = async (id: number, currentStatus: boolean) => {
        setLoadingId(id);
        const res = await toggleDestinationStatus(id, currentStatus);
        setLoadingId(null);
        if (res.success) {
            toast.success('Status updated');
        } else {
            toast.error('Failed to update status');
        }
    };

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" fontWeight="bold">Destinations</Typography>
                <Link href="/admin/dashboard/destinations/new">
                    <Button variant="contained" startIcon={<Plus />}>
                        Add Destination
                    </Button>
                </Link>
            </Box>

            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Table>
                    <TableHead sx={{ bgcolor: 'grey.50' }}>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {destinations.length > 0 ? (
                            destinations.map((dest) => (
                                <TableRow key={dest.id} hover>
                                    <TableCell>
                                        <Box
                                            component="img"
                                            src={dest.image || 'https://virgin-travel-app.b-cdn.net/common/placeholder.jpg'}
                                            alt={dest.name}
                                            sx={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 1 }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography fontWeight="medium">{dest.name}</Typography>
                                        <Typography variant="caption" color="text.secondary">/{dest.slug}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Switch
                                            size="small"
                                            checked={dest.active}
                                            disabled={loadingId === dest.id}
                                            onChange={() => handleToggleStatus(dest.id, dest.active)}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box display="flex" justifyContent="flex-end" gap={1}>
                                            <Link href={`/destinations/${dest.slug}`} target="_blank">
                                                <IconButton size="small" color="info"><Eye size={18} /></IconButton>
                                            </Link>
                                            <Link href={`/admin/dashboard/destinations/${dest.id}`}>
                                                <IconButton size="small" color="primary"><Edit size={18} /></IconButton>
                                            </Link>
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => handleDelete(dest.id)}
                                            >
                                                <Trash2 size={18} />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                                    <Typography color="text.secondary">No destinations found. Create one to get started.</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
