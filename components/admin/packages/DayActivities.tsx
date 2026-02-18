import { Control, useFieldArray, UseFormRegister } from "react-hook-form";
import { Box, Button, TextField, Typography, IconButton } from "@mui/material";
import { Plus, Trash2 } from "lucide-react";

interface DayActivitiesProps {
    nestIndex: number;
    control: Control<any>;
    register: UseFormRegister<any>;
    errors: any;
}

export default function DayActivities({ nestIndex, control, register, errors }: DayActivitiesProps) {
    const { fields, remove, append } = useFieldArray({
        control,
        name: `itinerary.${nestIndex}.activities`
    });

    return (
        <Box sx={{ mt: 2, pl: 2, borderLeft: '2px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Activities</Typography>
            {fields.map((item, k) => (
                <Box key={item.id} sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
                    <Box display="flex" gap={2} mb={1}>
                        <TextField
                            label="Activity Title"
                            fullWidth
                            size="small"
                            {...register(`itinerary.${nestIndex}.activities.${k}.title` as const, { required: true })}
                            error={!!errors?.itinerary?.[nestIndex]?.activities?.[k]?.title}
                            helperText={errors?.itinerary?.[nestIndex]?.activities?.[k]?.title?.message}
                        />
                        <IconButton color="error" size="small" onClick={() => remove(k)}>
                            <Trash2 size={18} />
                        </IconButton>
                    </Box>
                    <TextField
                        label="Activity Description"
                        fullWidth
                        multiline
                        rows={2}
                        size="small"
                        {...register(`itinerary.${nestIndex}.activities.${k}.description` as const, { required: true })}
                        error={!!errors?.itinerary?.[nestIndex]?.activities?.[k]?.description}
                        helperText={errors?.itinerary?.[nestIndex]?.activities?.[k]?.description?.message}
                    />
                </Box>
            ))}
            <Button
                variant="outlined"
                size="small"
                startIcon={<Plus size={16} />}
                onClick={() => append({ title: "", description: "" })}
            >
                Add Activity
            </Button>
        </Box>
    );
}
