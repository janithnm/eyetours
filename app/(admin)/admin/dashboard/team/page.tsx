'use client';

import { useEffect, useState } from 'react';
import { getAdminTeamMembers, deleteTeamMember } from '@/app/actions/about';
import {
    Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    IconButton, Avatar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { Edit, Trash2, Plus } from 'lucide-react';
import TeamForm from '@/components/admin/about/TeamForm';

export default function TeamPage() {
    const [team, setTeam] = useState<any[]>([]);
    const [openForm, setOpenForm] = useState(false);
    const [editingMember, setEditingMember] = useState<any>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const fetchTeam = async () => {
        const { success, data } = await getAdminTeamMembers();
        if (success) setTeam(data || []);
    };

    useEffect(() => {
        fetchTeam();
    }, []);

    const handleEdit = (member: any) => {
        setEditingMember(member);
        setOpenForm(true);
    };

    const handleAdd = () => {
        setEditingMember(null);
        setOpenForm(true);
    };

    const handleDelete = async () => {
        if (deleteId) {
            await deleteTeamMember(deleteId);
            setDeleteId(null);
            fetchTeam();
        }
    };

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4" fontWeight="bold" color="secondary.main">Team Members</Typography>
                <Button variant="contained" startIcon={<Plus />} onClick={handleAdd}>Add Member</Button>
            </Box>

            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                <Table>
                    <TableHead sx={{ bgcolor: 'grey.50' }}>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Order</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {team.map((member) => (
                            <TableRow key={member.id} hover>
                                <TableCell>
                                    <Avatar src={member.image} alt={member.name} />
                                </TableCell>
                                <TableCell>{member.name}</TableCell>
                                <TableCell sx={{ color: 'text.secondary' }}>{member.role}</TableCell>
                                <TableCell>{member.active ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>{member.order}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="primary" onClick={() => handleEdit(member)}><Edit size={18} /></IconButton>
                                    <IconButton color="error" onClick={() => setDeleteId(member.id)}><Trash2 size={18} /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TeamForm
                open={openForm}
                onClose={() => setOpenForm(false)}
                onSuccess={fetchTeam}
                initialData={editingMember}
            />

            <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this member?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteId(null)}>Cancel</Button>
                    <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
