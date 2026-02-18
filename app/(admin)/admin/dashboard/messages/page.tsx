'use client';

import { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, IconButton, Chip, Dialog, DialogTitle,
    DialogContent, DialogActions, Button, useTheme, useMediaQuery
} from '@mui/material';
import { Trash2, Mail, Eye, CheckCircle } from 'lucide-react';
import { getContactSubmissions, deleteContactSubmission, markContactAsRead } from '@/app/actions/contact';
import { format } from 'date-fns';

export default function MessagesPage() {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
    const theme = useTheme();

    const fetchMessages = async () => {
        setLoading(true);
        const res = await getContactSubmissions();
        if (res.success && res.data) {
            setMessages(res.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this message?')) {
            await deleteContactSubmission(id);
            fetchMessages();
        }
    };

    const handleView = async (msg: any) => {
        setSelectedMessage(msg);
        if (msg.status === 'new') {
            await markContactAsRead(msg.id);
            fetchMessages();
        }
    };

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" color="secondary.main" mb={4}>
                Contact Messages
            </Typography>

            <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 3, boxShadow: 3 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Subject</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {messages.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                                        <Typography color="text.secondary">No messages found</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                messages.map((msg) => (
                                    <TableRow key={msg.id} hover>
                                        <TableCell>{format(new Date(msg.createdAt), 'MMM dd, yyyy')}</TableCell>
                                        <TableCell>
                                            <Box>
                                                <Typography variant="body2" fontWeight="bold">{msg.name}</Typography>
                                                <Typography variant="caption" color="text.secondary">{msg.email}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{msg.subject}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={msg.status}
                                                size="small"
                                                color={msg.status === 'new' ? 'error' : 'success'}
                                                variant={msg.status === 'new' ? 'filled' : 'outlined'}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton color="primary" onClick={() => handleView(msg)}>
                                                <Eye size={18} />
                                            </IconButton>
                                            <IconButton color="error" onClick={() => handleDelete(msg.id)}>
                                                <Trash2 size={18} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* View Message Dialog */}
            {/* View Message Dialog */}
            <Dialog
                open={!!selectedMessage}
                onClose={() => setSelectedMessage(null)}
                fullWidth
                maxWidth="sm"
                fullScreen={useMediaQuery(theme.breakpoints.down('sm'))}
            >
                <DialogTitle>Message Details</DialogTitle>
                <DialogContent dividers>
                    {selectedMessage && (
                        <Box display="flex" flexDirection="column" gap={2}>
                            <Box>
                                <Typography variant="caption" fontWeight="bold" color="text.secondary">FROM</Typography>
                                <Typography variant="body1">{selectedMessage.name} &lt;{selectedMessage.email}&gt;</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" fontWeight="bold" color="text.secondary">SUBJECT</Typography>
                                <Typography variant="body1">{selectedMessage.subject}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" fontWeight="bold" color="text.secondary">MESSAGE</Typography>
                                <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.default', mt: 0.5, maxHeight: '300px', overflowY: 'auto' }}>
                                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{selectedMessage.message}</Typography>
                                </Paper>
                            </Box>
                            <Box>
                                <Typography variant="caption" fontWeight="bold" color="text.secondary">DATE</Typography>
                                <Typography variant="body2">{format(new Date(selectedMessage.createdAt), 'PPpp')}</Typography>
                            </Box>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSelectedMessage(null)} color="inherit">Close</Button>
                    <Button
                        variant="contained"
                        startIcon={<Mail />}
                        href={`mailto:${selectedMessage?.email}?subject=Re: ${selectedMessage?.subject}`}
                    >
                        Reply via Email
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
