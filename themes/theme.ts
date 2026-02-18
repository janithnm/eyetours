'use client';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { Inter, Playfair_Display } from 'next/font/google';

// Load fonts
const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    display: 'swap',
});

// Augment the palette interface
declare module '@mui/material/styles' {
    interface Palette {
        neutral: Palette['primary'];
    }
    interface PaletteOptions {
        neutral?: PaletteOptions['primary'];
    }
}

// Create the base theme
let theme = createTheme({
    typography: {
        fontFamily: inter.style.fontFamily,
        h1: {
            fontFamily: playfair.style.fontFamily,
            fontWeight: 700,
        },
        h2: {
            fontFamily: playfair.style.fontFamily,
            fontWeight: 600,
        },
        h3: {
            fontFamily: playfair.style.fontFamily,
            fontWeight: 600,
        },
        h4: {
            fontFamily: playfair.style.fontFamily,
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
            main: '#1E3A8A', // Deep Blue (Logo Text/Dark Segments)
            light: '#3B82F6',
            dark: '#172554',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#FF9F1C', // Vibrant Orange (Airplane)
            light: '#FFB74D',
            dark: '#F57C00',
            contrastText: '#ffffff',
        },
        neutral: {
            main: '#64748B',
            light: '#94A3B8',
            dark: '#334155',
            contrastText: '#ffffff',
        },
        background: {
            default: '#F8FAFC', // Slate 50
            paper: '#ffffff',
        },
        text: {
            primary: '#1E293B',
            secondary: '#64748B',
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 50, // Pill shaped buttons for modern look
                    padding: '10px 24px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    },
                },
                containedPrimary: {
                    background: 'linear-gradient(to right, #1E3A8A, #3B82F6)', // Elegant Deep Blue to Ocean Blue
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)',
                    overflow: 'hidden',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
    },
});

theme = responsiveFontSizes(theme);

export default theme;
