import { z } from 'zod';
import { isValidEmail, isValidMobile } from '@/utils/validation';

export const inquirySchema = z.object({
    // Step 1: Regions
    regions: z.array(z.string()).min(1, 'Please select at least one region'),

    // Step 2: Travel Style
    travelStyle: z.string().min(1, 'Please select a travel style'),

    // Step 3: Dates
    startDate: z.date({ message: 'Please select a start date' }),
    endDate: z.date({ message: 'Please select an end date' }),
    // Optional: Add refinement to check endDate > startDate

    // Step 4: Travelers
    adults: z.number().min(1, 'At least 1 adult is required'),
    children: z.number().min(0, 'Cannot be negative'),
    infants: z.number().min(0, 'Cannot be negative'),

    // Step 5: Accommodation
    accommodationType: z.string().min(1, 'Please select an accommodation type'),

    // Step 6: Experiences
    experiences: z.array(z.string()).min(1, 'Please select at least one experience'),

    // Step 7: Budget
    budgetMin: z.number().min(0),
    budgetMax: z.number().min(0),

    // Step 8: Contact
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().refine(isValidEmail, { message: 'Invalid email address' }),
    countryCode: z.string().optional(),
    phone: z.string().optional().refine(val => !val || isValidMobile(val), { message: 'Invalid phone number' }),
    additionalInfo: z.string().optional(),
}).refine(data => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;
