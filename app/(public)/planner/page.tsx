import CustomPlanner from "@/components/public/CustomPlanner";
import { Box } from "@mui/material";
import { getPlannerOptions } from "@/app/actions/planner";

export default async function PlannerPage() {
    const { data: allOptions } = await getPlannerOptions();

    // Group options by category
    const options = {
        regions: allOptions?.filter(o => o.category === 'region' && o.active) || [],
        travelStyles: allOptions?.filter(o => o.category === 'travelStyle' && o.active) || [],
        accommodationTypes: allOptions?.filter(o => o.category === 'accommodation' && o.active) || [],
        experiences: allOptions?.filter(o => o.category === 'experience' && o.active) || []
    };

    return (
        <Box sx={{ pt: 12, minHeight: '100vh', background: 'linear-gradient(to bottom, #f0f4f8, #ffffff)' }}>
            <CustomPlanner options={options} />
        </Box>
    );
}
