import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Collapse, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

const menuItems = [
    { label: 'Home', path: '/home' },
    { label: 'Programs', path: '/programs' },
    // { label: 'History', path: '/history' },
    // { label: 'Results', path: '/results' },
]

function TopAppBar({ mode, onToggleMode }: { mode: 'light' | 'dark', onToggleMode: () => void }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const isSelected = (path: string) => {
        return location.pathname === path;
    }
    
    const handleToggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
                color: mode === 'dark' ? '#fff' : '#111',
            }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <IconButton 
                        color="inherit" 
                        edge="start" 
                        onClick={handleToggleMenu} 
                        sx={{ display: { xs: 'block', sm: 'none' } }}
                    >
                        {menuOpen ? <CloseIcon /> : <MenuIcon />}
                    </IconButton>

                    <Typography variant="h2" component="h1" sx={{ flexGrow: { xs: 1, sm: 0 }, textAlign: { xs: 'center', sm: 'left' }, ml: { sm: 0 } }}>
                        <b><i>the </i>WOD</b>
                    </Typography>

                    <Box sx={{ 
                        display: { xs: 'none', sm: 'flex' }, 
                        alignItems: 'center', 
                        gap: 1, 
                        flexGrow: 1, 
                        justifyContent: 'flex-end' 
                    }}>
                        {menuItems.map((item) => (
                            <Button component={Link}
                                to={item.path}
                                variant={isSelected(item.path) ? "contained" : "text"}
                                key={item.path}
                            >
                                <b>{item.label}</b>
                            </Button>
                        ))}
                    </Box>

                    <IconButton
                        onClick={onToggleMode}
                        sx={{ ml: { sm: 1 } }}
                    >
                        {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Collapse in={menuOpen} sx={{ display: { sm: 'none' } }}>
                <Box sx={{ 
                    backgroundColor: 'background.paper', 
                    color: mode === 'dark' ? '#fff' : '#111',
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                }}>
                    <List>
                        {menuItems.map((item) => (
                            <ListItem key={item.path} disablePadding>
                                <ListItemButton 
                                    component={Link} 
                                    to={item.path} 
                                    onClick={() => setMenuOpen(false)}
                                    selected={isSelected(item.path)}
                                >
                                    <ListItemText primary={item.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Collapse>

            <Box sx={{ display: 'none' }}>
                {/* Removed redundant desktop menu box as it's now inside the AppBar for desktop */}
            </Box>
        </Box>
    )
}

export default TopAppBar;