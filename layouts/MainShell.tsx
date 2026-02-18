import MainAppBar from "@/components/layouts/MainAppBar";
import MainFooter from "@/components/layouts/MainFooter";
import { Box } from "@mui/material";
import { getSiteSettings } from "@/app/actions/settings";

export default async function MainShell({ children }: { children: React.ReactNode }) {
  const settingsRes = await getSiteSettings();
  const settings = settingsRes.success ? settingsRes.data : {};

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <MainAppBar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <MainFooter settings={settings} />
    </Box>
  );
}