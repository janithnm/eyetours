import { getPackageBySlug } from '@/app/actions/packages';
import { getSiteSettings } from '@/app/actions/settings';
import PackageDetail from '@/components/packages/PackageDetail';
import { notFound } from 'next/navigation';

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { data: pkg, success } = await getPackageBySlug(slug);
    const { data: settings } = await getSiteSettings();
    const showPrice = settings?.showPrice ?? true;

    if (!success || !pkg) {
        notFound();
    }

    return <PackageDetail pkg={pkg} showPrice={showPrice} />;
}
