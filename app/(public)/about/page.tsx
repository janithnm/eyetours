import { Box } from '@mui/material';
import AboutHero from '@/components/about/AboutHero';
import AboutMissionVision from '@/components/about/AboutMissionVision';
import AboutFeatures from '@/components/about/AboutFeatures';
import TeamSection from '@/components/about/TeamSection';
import PartnersSection from '@/components/about/PartnersSection';
import { getTeamMembers, getPartners } from '@/app/actions/about';

export const metadata = {
    title: 'About Us | TravelMaster',
    description: 'Learn about our journey, our team, and our mission to create unforgettable Sri Lankan experiences.',
};

export default async function AboutPage() {
    // Fetch data on the server
    const { data: team } = await getTeamMembers();
    const { data: partners } = await getPartners();

    return (
        <Box>
            <AboutHero />
            <AboutMissionVision />
            <AboutFeatures />
            <TeamSection team={team} />
            <PartnersSection partners={partners} />
        </Box>
    );
}
