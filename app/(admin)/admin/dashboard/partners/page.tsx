'use client';

import { useEffect, useState } from 'react';
import { getAdminPartners, deletePartner } from '@/app/actions/about';
import {
    Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    IconButton, Avatar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { Edit, Trash2, Plus, ExternalLink } from 'lucide-react';
import PartnerForm from '@/components/admin/about/PartnerForm';

export default function PartnersPage() {
    const [partners, setPartners] = useState<any[]>([]);
    const [openForm, setOpenForm] = useState(false);
    const [editingPartner, setEditingPartner] = useState<any>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const fetchPartners = async () => {
        const { success, data } = await getAdminPartners();
        if (success) setPartners(data || []);
    };

    useEffect(() => {
        fetchPartners();
    }, []);

    const handleEdit = (partner: any) => {
        setEditingPartner(partner);
        setOpenForm(true);
    };

    const handleAdd = () => {
        setEditingPartner(null);
        setOpenForm(true);
    };

    const handleDelete = async () => {
        if (deleteId) {
            await deletePartner(deleteId);
            setDeleteId(null);
            fetchPartners();
        }
    };

    return (
        <Box>
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }} gap={2} mb={4}>
                <Typography variant="h4" fontWeight="bold" color="secondary.main">Partners</Typography>
                <Button variant="contained" startIcon={<Plus />} onClick={handleAdd}>Add Partner</Button>
            </Box>

            <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
                <Box sx={{ overflowX: 'auto' }}>
                    <Table>
                        <TableHead sx={{ bgcolor: 'grey.50' }}>
                            <TableRow>
                                <TableCell>Logo</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Website</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Order</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {partners.map((partner) => (
                                <TableRow key={partner.id} hover>
                                    <TableCell>
                                        <Avatar src={partner.logo} alt={partner.name} variant="rounded" sx={{ width: 56, height: 56 }} />
                                    </TableCell>
                                    <TableCell>{partner.name}</TableCell>
                                    <TableCell sx={{ color: 'text.secondary' }}>
                                        {partner.website && (
                                            <a href={partner.website} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                {partner.website} <ExternalLink size={12} />
                                            </a>
                                        )}
                                    </TableCell>
                                    <TableCell>{partner.active ? 'Active' : 'Inactive'}</TableCell>
                                    <TableCell>{partner.order}</TableCell>
                                    <TableCell align="right">
                                        <IconButton color="primary" onClick={() => handleEdit(partner)}><Edit size={18} /></IconButton>
                                        <IconButton color="error" onClick={() => setDeleteId(partner.id)}><Trash2 size={18} /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </Paper>

            <PartnerForm
                open={openForm}
                onClose={() => setOpenForm(false)}
                onSuccess={fetchPartners}
                initialData={editingPartner}
            />

            <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this partner?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteId(null)}>Cancel</Button>
                    <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
