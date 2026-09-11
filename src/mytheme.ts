import { createTheme } from '@mui/material/styles';

export type themeMode = 'light' | 'dark';

export const getInitialThemeMode = (): themeMode => {
    const storedThemeMode = localStorage.getItem('themeMode');
    if (storedThemeMode === 'dark' || storedThemeMode === 'light') {
        return storedThemeMode as themeMode;
    }
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const buildAppTheme = (mode: themeMode) =>
    createTheme({
        palette: {
            mode,
            primary: {
                main: '#ff6b35',
            },
            secondary: {
                main: '#f7b267',
            },
            background: {
                default: mode === 'dark' ? '#0d1117' : '#f5f1eb',   
                paper: mode === 'dark' ? '#141b23' : '#fffdf9',
            },
            text: {
                primary: mode === 'dark' ? '#f4f7fb' : '#1b1b1f',
                secondary: mode === 'dark' ? '#a9b4c4' : '#5f6470',
            },
        },
        typography: {
            fontFamily: 'Rajdhani, Segoe UI, sans-serif',
            h1: {
                fontSize: '2.5rem',
                fontWeight: 700,
            },
            h2: {
                fontSize: '2rem',
                fontWeight: 600,
            },
            h3: {
                fontSize: '1.75rem',
                fontWeight: 600,
            },
            h6: {
                fontSize: '1rem',
                fontWeight: 500,
            },
            button: {
                textTransform: 'none',
                fontWeight: 600,
            }
        },
        shape: {
            borderRadius: 4,
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 4,
                        paddingInline: 18,
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: 'none',
                    },
                },
            }
        },
    });