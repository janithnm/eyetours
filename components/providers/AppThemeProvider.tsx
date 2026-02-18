'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { usePathname } from 'next/navigation';
import theme from '@/themes/theme';
import adminTheme from '@/themes/adminTheme';

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');
    const activeTheme = isAdmin ? adminTheme : theme;

    return (
        <AppRouterCacheProvider>
            <ThemeProvider theme={activeTheme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}
