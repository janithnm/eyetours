import { Box } from '@mui/material';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'grey.100', maxWidth: '100vw', boxSizing: 'border-box' }}>
            <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, width: '100%' }}>
                {children}
            </Box>
        </Box>
    );
}
