import MainShell from "@/layouts/MainShell";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <MainShell>
            {children}
        </MainShell>
    );
}
