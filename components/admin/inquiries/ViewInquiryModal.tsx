import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button,
    Typography, Grid, Box, Chip, Divider, Avatar
} from '@mui/material';
import { User, Calendar, MapPin, DollarSign, Mail, Phone, Users, Map } from 'lucide-react';

interface ViewInquiryModalProps {
    open: boolean;
    onClose: () => void;
    inquiry: any; // Type as Inquiry when types are available
}

export default function ViewInquiryModal({ open, onClose, inquiry }: ViewInquiryModalProps) {
    if (!inquiry) return null;

    const DetailItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: React.ReactNode }) => (
        <Box display="flex" alignItems="flex-start" gap={2} mb={2}>
            <Avatar sx={{ bgcolor: 'secondary.light', width: 32, height: 32 }}>
                <Icon size={16} color="white" />
            </Avatar>
            <Box>
                <Typography variant="caption" color="text.secondary" fontWeight="bold">
                    {label}
                </Typography>
                <Typography variant="body2" sx={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                    {value || 'N/A'}
                </Typography>
            </Box>
        </Box>
    );

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
                <Box>
                    <Typography variant="h6" fontWeight="bold">Inquiry Details</Typography>
                    <Typography variant="caption" color="text.secondary">ID: #{inquiry.id}</Typography>
                </Box>
                <Chip
                    label={inquiry.status}
                    color={inquiry.status === 'pending' ? 'warning' : 'success'}
                    variant="outlined"
                    size="small"
                    sx={{ textTransform: 'capitalize' }}
                />
            </DialogTitle>
            <DialogContent sx={{ p: 4 }}>
                <Grid container spacing={4}>
                    {/* Customer Info */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary.main">
                            Customer Information
                        </Typography>
                        <DetailItem icon={User} label="Name" value={inquiry.customerName} />
                        <DetailItem icon={Mail} label="Email" value={inquiry.customerEmail} />
                        <DetailItem icon={Phone} label="Phone" value={inquiry.customerPhone} />
                        {!inquiry.packageId && <DetailItem icon={Map} label="Nationality" value={inquiry.nationality} />}
                    </Grid>

                    {/* Trip Info */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary.main">
                            {inquiry.packageId ? 'Booking Details' : 'Trip Preferences'}
                        </Typography>
                        {inquiry.packageId ? (
                            <>
                                <DetailItem icon={MapPin} label="Package" value={inquiry.package?.title || `Package ID: ${inquiry.packageId}`} />
                                <DetailItem icon={Calendar} label="Travel Date" value={inquiry.travelDate ? new Date(inquiry.travelDate).toLocaleDateString() : 'N/A'} />
                                <DetailItem icon={Users} label="People" value={`${inquiry.numberOfPeople} people`} />
                            </>
                        ) : (
                            <>
                                <DetailItem icon={Calendar} label="Travel Dates" value={
                                    inquiry.arrivalDate ? new Date(inquiry.arrivalDate).toLocaleDateString() :
                                        (inquiry.message && inquiry.message.match(/Travel Dates: (.*)/)?.[1]) || 'See detailed message'
                                } />
                                <DetailItem icon={Users} label="Group Size" value={`${inquiry.numberOfAdults} Adults, ${inquiry.numberOfChildren} Children`} />
                                <DetailItem icon={DollarSign} label="Budget Range" value={inquiry.budgetRange} />
                                <DetailItem icon={MapPin} label="Destinations" value={inquiry.destinations?.join(', ')} />
                            </>
                        )}

                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Divider sx={{ my: 1 }} />
                    </Grid>

                    {/* Additional Details */}
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary.main">
                            Message & Interests
                        </Typography>
                        {inquiry.interests && inquiry.interests.length > 0 && (
                            <Box mb={2}>
                                <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block" mb={1}>
                                    Interests:
                                </Typography>
                                <Box display="flex" gap={1} flexWrap="wrap">
                                    {inquiry.interests.map((interest: string, i: number) => (
                                        <Chip key={i} label={interest} size="small" />
                                    ))}
                                </Box>
                            </Box>
                        )}
                        {inquiry.message && (
                            <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider', maxHeight: '300px', overflowY: 'auto' }}>
                                <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block" mb={1}>
                                    Customer Message:
                                </Typography>
                                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                    {inquiry.message}
                                </Typography>
                            </Box>
                        )}
                        {!inquiry.message && !inquiry.interests && (
                            <Typography variant="body2" color="text.secondary">No additional message or interests provided.</Typography>
                        )}
                    </Grid>

                    {/* Admin Notes */}
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary.main">
                            Admin Notes
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                            {inquiry.adminNotes || 'No notes added yet.'}
                        </Typography>
                    </Grid>

                </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                <Button onClick={onClose} variant="outlined" color="inherit">Close</Button>
            </DialogActions>
        </Dialog>
    );
}
