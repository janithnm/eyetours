'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Box, Button, Typography, TextField, Checkbox, FormControlLabel,
    Grid, Paper, Stepper, Step, StepLabel, Container, Slider, Radio, RadioGroup,
    Chip, Avatar, Card, CardContent, Divider, Alert, CircularProgress
} from '@mui/material';
// @ts-ignore
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Loader2 } from 'lucide-react';

import { inquirySchema, InquiryFormValues } from '@/lib/validations';
import { submitCustomTrip } from "@/app/actions/inquiries";
import { PlannerOption } from '@/app/actions/planner';

const steps = [
    'Regions', 'Travel Style', 'Dates', 'Travelers',
    'Accommodation', 'Experiences', 'Budget', 'Contact'
];

interface CustomPlannerProps {
    options?: {
        regions: PlannerOption[];
        travelStyles: PlannerOption[];
        accommodationTypes: PlannerOption[];
        experiences: PlannerOption[];
    };
}

export default function CustomPlanner({ options }: CustomPlannerProps) {
    const [activeStep, setActiveStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    // Defaults if not provided
    const regions = options?.regions || [];
    const travelStyles = options?.travelStyles || [];
    const accommodationTypes = options?.accommodationTypes || [];
    const experiences = options?.experiences || [];

    const { control, handleSubmit, trigger, watch, setValue, reset, formState: { errors } } = useForm<InquiryFormValues>({
        resolver: zodResolver(inquirySchema),
        defaultValues: {
            regions: [],
            travelStyle: '',
            startDate: new Date(),
            endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // +14 days default
            adults: 2,
            children: 0,
            infants: 0,
            accommodationType: '',
            experiences: [],
            budgetMin: 1000,
            budgetMax: 2000,
            name: '',
            email: '',
        }
    });

    const handleNext = async () => {
        let valid = false;
        const currentField = getFieldForStep(activeStep);
        if (currentField) {
            // @ts-ignore
            valid = await trigger(currentField);
        } else {
            valid = true;
        }

        if (valid) {
            setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
        }
    };

    const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));

    const getFieldForStep = (step: number) => {
        switch (step) {
            case 0: return 'regions';
            case 1: return 'travelStyle';
            case 2: return ['startDate', 'endDate'];
            case 3: return ['adults', 'children', 'infants'];
            case 4: return 'accommodationType';
            case 5: return 'experiences';
            case 6: return ['budgetMin', 'budgetMax'];
            case 7: return ['name', 'email', 'countryCode', 'phone'];
            default: return undefined;
        }
    };

    const onSubmit = async (data: InquiryFormValues) => {
        setIsSubmitting(true);
        setServerError(null);

        const formData = new FormData();
        formData.append('regions', JSON.stringify(data.regions));
        formData.append('travelStyle', data.travelStyle);
        formData.append('startDate', data.startDate.toISOString());
        formData.append('endDate', data.endDate.toISOString());
        formData.append('adults', data.adults.toString());
        formData.append('children', data.children ? data.children.toString() : '0');
        formData.append('infants', data.infants ? data.infants.toString() : '0');
        formData.append('accommodationType', data.accommodationType);
        formData.append('experiences', JSON.stringify(data.experiences));
        formData.append('budgetMin', data.budgetMin.toString());
        formData.append('budgetMax', data.budgetMax.toString());
        formData.append('name', data.name);
        formData.append('email', data.email);
        if (data.countryCode) formData.append('countryCode', data.countryCode);
        if (data.phone) formData.append('phone', data.phone);
        if (data.additionalInfo) formData.append('additionalInfo', data.additionalInfo);

        const res = await submitCustomTrip(null, formData);

        if (res.success) {
            setSubmitSuccess(true);
            setIsSubmitting(false);
            reset();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            console.error(res.errors || res.message);
            setServerError(res.message || 'Something went wrong. Please try again.');
            setIsSubmitting(false);
        }
    };

    // Helper to generic Section Title
    const SectionHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
        <Box mb={4} textAlign="center">
            <Typography variant="h4" fontFamily="serif" fontWeight="bold" color="primary.main" gutterBottom>
                {title}
            </Typography>
            {subtitle && <Typography variant="body1" color="text.secondary">{subtitle}</Typography>}
        </Box>
    );

    if (submitSuccess) {
        return (
            <Container maxWidth="md" sx={{ py: 10 }}>
                <Paper elevation={3} sx={{ p: 5, borderRadius: 4, textAlign: 'center' }}>
                    <Box sx={{ color: 'success.main', mb: 2 }}>
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                    </Box>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>Itinerary Request Received!</Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        Thank you for sharing your dream trip details. Our travel experts are already reviewing your preferences and will craft a personalized itinerary for you.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mb={4}>
                        You will receive an email confirmation shortly at <strong>{watch('email')}</strong>.
                    </Typography>
                    <Button variant="contained" href="/" size="large" sx={{ borderRadius: 50 }}>
                        Return Home
                    </Button>
                </Paper>
            </Container>
        );
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Container maxWidth="md" sx={{ py: 8 }}>
                <Paper elevation={0} sx={{ p: { xs: 2, md: 5 }, borderRadius: 4, bgcolor: 'transparent' }}>
                    {/* Stepper (Simplified dots or standard) */}
                    <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 6, display: { xs: 'none', md: 'flex' } }}>
                        {steps.map((label) => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
                    </Stepper>

                    {/* Mobile Stepper Text */}
                    <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 4, textAlign: 'center' }}>
                        <Typography variant="overline" color="text.secondary">Step {activeStep + 1} of {steps.length}</Typography>
                        <Typography variant="h6">{steps[activeStep]}</Typography>
                    </Box>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {serverError && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {serverError}
                            </Alert>
                        )}

                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={activeStep}
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Paper elevation={4} sx={{ p: 4, borderRadius: 4, minHeight: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                                    {/* STEP 0: REGIONS */}
                                    {activeStep === 0 && (
                                        <Box>
                                            <SectionHeader title="Which regions would you like to visit?" subtitle="Select as many as you wish." />
                                            <Grid container spacing={2}>
                                                <Controller
                                                    name="regions"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <>
                                                            {regions.map((region) => (
                                                                <Grid size={{ xs: 6, sm: 4 }} key={region.id}>
                                                                    <Card
                                                                        variant="outlined"
                                                                        sx={{
                                                                            cursor: 'pointer',
                                                                            borderColor: field.value.includes(region.label) ? 'secondary.main' : 'divider',
                                                                            bgcolor: field.value.includes(region.label) ? 'secondary.light' : 'background.paper',
                                                                            transition: 'all 0.2s',
                                                                            '&:hover': { borderColor: 'secondary.main' }
                                                                        }}
                                                                        onClick={() => {
                                                                            const newValue = field.value.includes(region.label)
                                                                                ? field.value.filter(v => v !== region.label)
                                                                                : [...field.value, region.label];
                                                                            field.onChange(newValue);
                                                                        }}
                                                                    >
                                                                        <Box p={3} textAlign="center">
                                                                            <Typography variant="subtitle1" fontWeight="bold" color={field.value.includes(region.label) ? 'white' : 'text.primary'}>
                                                                                {region.label}
                                                                            </Typography>
                                                                            {/* Optionally display description if needed */}
                                                                        </Box>
                                                                    </Card>
                                                                </Grid>
                                                            ))}
                                                            {regions.length === 0 && <Typography width="100%" textAlign="center" color="text.secondary">No regions available.</Typography>}
                                                        </>
                                                    )}
                                                />
                                            </Grid>
                                            {errors.regions && <Typography color="error" mt={2} textAlign="center">{errors.regions.message}</Typography>}
                                        </Box>
                                    )}

                                    {/* STEP 1: TRAVEL STYLE */}
                                    {activeStep === 1 && (
                                        <Box>
                                            <SectionHeader title="What's your preferred travel style?" subtitle="Please select one option." />
                                            <Controller
                                                name="travelStyle"
                                                control={control}
                                                render={({ field }) => (
                                                    <RadioGroup {...field} sx={{ gap: 2 }}>
                                                        {travelStyles.map((style) => (
                                                            <Paper
                                                                key={style.id}
                                                                variant="outlined"
                                                                sx={{
                                                                    p: 2,
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    borderColor: field.value === style.label ? 'primary.main' : 'divider',
                                                                    bgcolor: field.value === style.label ? 'primary.light' : 'transparent'
                                                                }}
                                                            >
                                                                <FormControlLabel
                                                                    value={style.label}
                                                                    control={<Radio />}
                                                                    label={
                                                                        <Box>
                                                                            <Typography variant="subtitle1" fontWeight="bold">{style.label}</Typography>
                                                                            {style.description && <Typography variant="body2" color="text.secondary">{style.description}</Typography>}
                                                                        </Box>
                                                                    }
                                                                    sx={{ width: '100%', m: 0 }}
                                                                />
                                                            </Paper>
                                                        ))}
                                                        {travelStyles.length === 0 && <Typography textAlign="center" color="text.secondary">No travel styles available.</Typography>}
                                                    </RadioGroup>
                                                )}
                                            />
                                            {errors.travelStyle && <Typography color="error" mt={2}>{errors.travelStyle.message}</Typography>}
                                        </Box>
                                    )}

                                    {/* STEP 2: DATES */}
                                    {activeStep === 2 && (
                                        <Box>
                                            <SectionHeader title="When do you want to travel?" subtitle="Ideally, plan 2 weeks in advance." />
                                            <Grid container spacing={3} justifyContent="center">
                                                <Grid size={{ xs: 12, sm: 6 }}>
                                                    <Controller
                                                        name="startDate"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <DatePicker
                                                                label="Start Date"
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                                slotProps={{ textField: { fullWidth: true, error: !!errors.startDate, helperText: errors.startDate?.message } }}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid size={{ xs: 12, sm: 6 }}>
                                                    <Controller
                                                        name="endDate"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <DatePicker
                                                                label="End Date"
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                                slotProps={{ textField: { fullWidth: true, error: !!errors.endDate, helperText: errors.endDate?.message } }}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    )}

                                    {/* STEP 3: TRAVELERS */}
                                    {activeStep === 3 && (
                                        <Box>
                                            <SectionHeader title="Who will be traveling?" subtitle="" />
                                            {(['adults', 'children'] as const).map((type) => (
                                                <Box key={type} mb={3} display="flex" alignItems="center" justifyContent="space-between" sx={{ borderBottom: '1px solid #eee', pb: 2 }}>
                                                    <Box>
                                                        <Typography variant="h6" textTransform="capitalize">{type}</Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {type === 'adults' ? 'Age 12+' : type === 'children' ? 'Age 2-12' : 'Under 2'}
                                                        </Typography>
                                                    </Box>
                                                    <Controller
                                                        name={type}
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Box display="flex" alignItems="center" gap={2}>
                                                                <Button variant="outlined" sx={{ minWidth: 40, borderRadius: '50%' }} onClick={() => field.onChange(Math.max(0, (field.value ?? 0) - 1))}>-</Button>
                                                                <Typography variant="h6" width={20} textAlign="center">{field.value ?? 0}</Typography>
                                                                <Button variant="outlined" sx={{ minWidth: 40, borderRadius: '50%' }} onClick={() => field.onChange((field.value ?? 0) + 1)}>+</Button>
                                                            </Box>
                                                        )}
                                                    />
                                                </Box>
                                            ))}
                                        </Box>
                                    )}

                                    {/* STEP 4: ACCOMMODATION */}
                                    {activeStep === 4 && (
                                        <Box>
                                            <SectionHeader title="What is your preferred accommodation type?" subtitle="Defined by local standards." />
                                            <Controller
                                                name="accommodationType"
                                                control={control}
                                                render={({ field }) => (
                                                    <Grid container spacing={2}>
                                                        {accommodationTypes.map((type) => {
                                                            const stars = (type.metadata as any)?.stars || 0;
                                                            return (
                                                                <Grid size={{ xs: 12 }} key={type.id}>
                                                                    <Card
                                                                        variant="outlined"
                                                                        sx={{
                                                                            cursor: 'pointer',
                                                                            borderColor: field.value === type.label ? 'secondary.main' : 'divider',
                                                                            borderWidth: field.value === type.label ? 2 : 1,
                                                                            bgcolor: field.value === type.label ? 'rgba(255, 159, 28, 0.05)' : 'transparent',
                                                                            transition: '0.2s'
                                                                        }}
                                                                        onClick={() => field.onChange(type.label)}
                                                                    >
                                                                        <Box p={2} display="flex" alignItems="center">
                                                                            <Box flex={1}>
                                                                                <Box display="flex" alignItems="center" gap={1}>
                                                                                    <Typography variant="h6">{type.label}</Typography>
                                                                                    <Box>
                                                                                        {[...Array(stars)].map((_, i) => <Box component="span" key={i} sx={{ color: 'secondary.main' }}>★</Box>)}
                                                                                    </Box>
                                                                                </Box>
                                                                                {type.description && <Typography variant="body2" color="text.secondary">{type.description}</Typography>}
                                                                            </Box>
                                                                            <Radio checked={field.value === type.label} />
                                                                        </Box>
                                                                    </Card>
                                                                </Grid>
                                                            );
                                                        })}
                                                        {accommodationTypes.length === 0 && <Typography width="100%" textAlign="center" color="text.secondary">No accommodation types available.</Typography>}
                                                    </Grid>
                                                )}
                                            />
                                            {errors.accommodationType && <Typography color="error" mt={2} textAlign="center">{errors.accommodationType.message}</Typography>}
                                        </Box>
                                    )}

                                    {/* STEP 5: EXPERIENCES */}
                                    {activeStep === 5 && (
                                        <Box>
                                            <SectionHeader title="What experiences are you looking for?" subtitle="Select as many as you wish." />
                                            <Grid container spacing={2}>
                                                <Controller
                                                    name="experiences"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <>
                                                            {experiences.map((exp) => (
                                                                <Grid size={{ xs: 6, sm: 4 }} key={exp.id}>
                                                                    <Chip
                                                                        label={exp.label}
                                                                        onClick={() => {
                                                                            const newValue = field.value.includes(exp.label)
                                                                                ? field.value.filter(e => e !== exp.label)
                                                                                : [...field.value, exp.label];
                                                                            field.onChange(newValue);
                                                                        }}
                                                                        color={field.value.includes(exp.label) ? 'primary' : 'default'}
                                                                        variant={field.value.includes(exp.label) ? 'filled' : 'outlined'}
                                                                        sx={{
                                                                            width: '100%',
                                                                            p: 2,
                                                                            fontSize: '0.9rem',
                                                                            justifyContent: 'flex-start'
                                                                        }}
                                                                    />
                                                                </Grid>
                                                            ))}
                                                            {experiences.length === 0 && <Typography width="100%" textAlign="center" color="text.secondary">No experiences available.</Typography>}
                                                        </>
                                                    )}
                                                />
                                            </Grid>
                                            {errors.experiences && <Typography color="error" mt={2} textAlign="center">{errors.experiences.message}</Typography>}
                                        </Box>
                                    )}

                                    {/* STEP 6: BUDGET */}
                                    {activeStep === 6 && (
                                        <Box>
                                            <SectionHeader title="What are you looking to spend?" subtitle="Per person (USD)" />
                                            <Typography variant="h5" align="center" color="primary.main" fontWeight="bold" gutterBottom>
                                                ${watch('budgetMin')} - ${watch('budgetMax')}
                                            </Typography>
                                            <Box px={5} py={2}>
                                                <Controller
                                                    name="budgetMin" // Simplified for slider, usually controls range
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Slider
                                                            getAriaLabel={() => 'Budget range'}
                                                            value={[watch('budgetMin'), watch('budgetMax')]}
                                                            onChange={(e, newVal) => {
                                                                if (Array.isArray(newVal)) {
                                                                    setValue('budgetMin', newVal[0]);
                                                                    setValue('budgetMax', newVal[1]);
                                                                }
                                                            }}
                                                            valueLabelDisplay="auto"
                                                            min={500}
                                                            max={10000}
                                                            step={100}
                                                            sx={{
                                                                color: 'secondary.main',
                                                                '& .MuiSlider-thumb': {
                                                                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                                                }
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Box>
                                            <Typography align="center" variant="body2" color="text.secondary">
                                                We recommend a minimum budget of $1,300 per person for a 14-day trip.
                                            </Typography>
                                        </Box>
                                    )}

                                    {/* STEP 7: CONTACT */}
                                    {activeStep === 7 && (
                                        <Box>
                                            <SectionHeader title="How can we best reach you?" subtitle="Review and submit" />
                                            <Grid container spacing={2}>
                                                <Grid size={{ xs: 12 }}>
                                                    <Controller name="name" control={control} render={({ field }) => <TextField {...field} fullWidth label="Full Name" error={!!errors.name} helperText={errors.name?.message} />} />
                                                </Grid>
                                                <Grid size={{ xs: 12 }}>
                                                    <Controller name="email" control={control} render={({ field }) => <TextField {...field} fullWidth label="Email" error={!!errors.email} helperText={errors.email?.message} />} />
                                                </Grid>
                                                <Grid size={{ xs: 4 }}>
                                                    <Controller name="countryCode" control={control} render={({ field }) => <TextField {...field} fullWidth label="Code" placeholder="+1" />} />
                                                </Grid>
                                                <Grid size={{ xs: 8 }}>
                                                    <Controller name="phone" control={control} render={({ field }) => <TextField {...field} fullWidth label="Phone" />} />
                                                </Grid>
                                                <Grid size={{ xs: 12 }}>
                                                    <Controller name="additionalInfo" control={control} render={({ field }) => <TextField {...field} fullWidth multiline rows={3} label="Additional Information" />} />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    )}

                                </Paper>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, maxWidth: 'md', mx: 'auto' }}>
                            <Button
                                disabled={activeStep === 0 || isSubmitting}
                                onClick={handleBack}
                                variant="outlined"
                                sx={{ borderRadius: 50, px: 4 }}
                            >
                                Back
                            </Button>

                            {activeStep === steps.length - 1 ? (
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    disabled={isSubmitting}
                                    startIcon={isSubmitting ? <Loader2 className="animate-spin" /> : null}
                                    sx={{ borderRadius: 50, px: 6, py: 1.5, fontSize: '1.1rem' }}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleNext}
                                    variant="contained"
                                    size="large"
                                    sx={{ borderRadius: 50, px: 6, py: 1.5, fontSize: '1.1rem' }}
                                >
                                    Next Step
                                </Button>
                            )}
                        </Box>
                    </form>
                </Paper>
            </Container>
        </LocalizationProvider>
    );
}
