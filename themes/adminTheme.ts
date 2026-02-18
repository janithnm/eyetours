'use client';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { Inter, Outfit } from 'next/font/google';

// Load fonts
const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
});

const outfit = Outfit({
    subsets: ['latin'],
    display: 'swap',
});

// Create the admin theme
let adminTheme = createTheme({
    typography: {
        fontFamily: inter.style.fontFamily,
        h1: {
            fontFamily: outfit.style.fontFamily,
            fontWeight: 700,
        },
        h2: {
            fontFamily: outfit.style.fontFamily,
            fontWeight: 600,
        },
        h3: {
            fontFamily: outfit.style.fontFamily,
            fontWeight: 600,
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#fb8500', // Safety Orange (User Requested)
            light: '#ffb74d',
            dark: '#c65100',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#023047', // Prussian Blue (Complementary)
            light: '#219EBC',
            dark: '#001d3d',
            contrastText: '#ffffff',
        },
        background: {
            default: '#f8f9fa',
            paper: '#ffffff',
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    boxShadow: 'none',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff',
                    color: '#023047',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    borderRight: 'none',
                    backgroundColor: '#023047', // Dark sidebar for admin
                    color: '#ffffff',
                },
            },
        },
    },
});

adminTheme = responsiveFontSizes(adminTheme);

export default adminTheme;
