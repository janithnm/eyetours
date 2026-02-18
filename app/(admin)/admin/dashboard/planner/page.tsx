'use client';

import { useState, useEffect } from 'react';
import {
    Box, Typography, Button, Paper, Tabs, Tab,
    IconButton, List, ListItem, ListItemText, ListItemSecondaryAction,
    Chip, Divider
} from '@mui/material';
import { Plus, Edit2, Trash2, GripVertical } from 'lucide-react';
import { getPlannerOptions, deletePlannerOption } from '@/app/actions/planner';
import PlannerOptionForm from '@/components/admin/planner/PlannerOptionForm';
import { toast } from 'sonner';

const CATEGORIES = ['region', 'travelStyle', 'accommodation', 'experience'];
const CAT_LABELS: Record<string, string> = {
    'region': 'Regions',
    'travelStyle': 'Travel Styles',
    'accommodation': 'Accommodation',
    'experience': 'Experiences'
};

export default function PlannerOptionsPage() {
    const [activeTab, setActiveTab] = useState(0);
    const [options, setOptions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [formOpen, setFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    const activeCategory = CATEGORIES[activeTab];

    const fetchOptions = async () => {
        setLoading(true);
        const res = await getPlannerOptions(activeCategory);
        if (res.success && res.data) {
            setOptions(res.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOptions();
    }, [activeTab]);

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this option?')) {
            const res = await deletePlannerOption(id);
            if (res.success) {
                toast.success('Option deleted');
                fetchOptions();
            } else {
                toast.error('Failed to delete');
            }
        }
    };

    const handleEdit = (item: any) => {
        setEditingItem(item);
        setFormOpen(true);
    };

    const handleAdd = () => {
        setEditingItem(null);
        setFormOpen(true);
    };

    const handleCloseForm = () => {
        setFormOpen(false);
        setEditingItem(null);
        fetchOptions();
    };

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4" fontWeight="bold">
                    Planner Options
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Plus size={18} />}
                    onClick={handleAdd}
                >
                    Add Option
                </Button>
            </Box>

            <Paper sx={{ mb: 4 }}>
                <Tabs
                    value={activeTab}
                    onChange={(e, val) => setActiveTab(val)}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                >
                    {CATEGORIES.map((cat) => (
                        <Tab key={cat} label={CAT_LABELS[cat] || cat} />
                    ))}
                </Tabs>
            </Paper>

            <Paper>
                <List>
                    {options.length === 0 && !loading && (
                        <ListItem>
                            <ListItemText primary="No options found. Add one to get started." sx={{ textAlign: 'center', color: 'text.secondary', py: 4 }} />
                        </ListItem>
                    )}

                    {options.map((item, index) => (
                        <Box key={item.id}>
                            <ListItem>
                                <ListItemText
                                    primary={
                                        <Box display="flex" alignItems="center" gap={2}>
                                            <Typography variant="subtitle1" fontWeight="medium">
                                                {item.label}
                                            </Typography>
                                            {!item.active && <Chip label="Inactive" size="small" />}
                                            {item.category === 'accommodation' && item.metadata?.stars && (
                                                <Chip label={`${item.metadata.stars} Stars`} size="small" variant="outlined" color="warning" />
                                            )}
                                        </Box>
                                    }
                                    secondary={item.description}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton onClick={() => handleEdit(item)} color="primary">
                                        <Edit2 size={18} />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(item.id)} color="error">
                                        <Trash2 size={18} />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            {index < options.length - 1 && <Divider />}
                        </Box>
                    ))}
                </List>
            </Paper>

            <PlannerOptionForm
                open={formOpen}
                onClose={handleCloseForm}
                initialData={editingItem}
                categories={CATEGORIES}
            />
        </Box>
    );
}
