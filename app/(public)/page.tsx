import HeroSection from "@/components/public/HeroSection";
import FeaturedPackages, { FeaturedPackagesSkeleton } from "@/components/packages/FeaturedPackages";
import { Suspense } from "react";
import HomeAboutSection from "@/components/home/HomeAboutSection";
import HomeDestinationsSection from "@/components/home/HomeDestinationsSection";
import CategoryMapSection from "@/components/home/CategoryMapSection";
import HomeBlogSection from "@/components/home/HomeBlogSection";
import HomeCTASection from "@/components/home/HomeCTASection";

export default function PublicPage() {
    return (
        <>
            <HeroSection />

            <HomeAboutSection />

            <HomeDestinationsSection />

            <CategoryMapSection />

            {/* Featured Packages */}
            <Suspense fallback={<FeaturedPackagesSkeleton />}>
                <FeaturedPackages />
            </Suspense>

            <HomeBlogSection />

            <HomeCTASection />
        </>
    );
}
