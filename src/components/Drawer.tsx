import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { IconButton, ThemeProvider, Typography, createTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import api from '../services/api';
import { useEffect, useState } from 'react';
import { GenreType } from '../types/ApiResponseTypes';
import { Link } from 'react-router-dom';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0A1E28',
        },
        secondary: {
            main: '#69F58C',
        },
    },
});

export default function GenreDrawer() {
    const [open, setOpen] = useState(false);
    const [moviesGenres, setMoviesGenres] = useState<GenreType[]>();

    async function fetchMoviesGenres() {
        const { data } = await api.get(
            `genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}`
        );
        setMoviesGenres(data.genres);
    }

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    useEffect(() => {
        fetchMoviesGenres();
    }, []);

    const DrawerList = (
        <Box sx={{ 
                width: 250, 
                height: "100%", 
                bgcolor: "#0A1E28", 
                color: "#69F58C" 
            }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
            <Typography variant='h6' paddingX={2} sx={{ textDecoration: "underline" }}>
                Genres
            </Typography>
                {moviesGenres &&
                    moviesGenres.map((genres) => (
                        <ListItem key={genres.name} disablePadding>
                            <Link to={`../genres/${genres.id}`} reloadDocument className="hover:bg-[#50738C]">
                                <ListItemButton>
                                    <ListItemText primary={genres.name} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))
                }
            </List>
            <Divider />
        </Box>
    );

    return (
        <ThemeProvider theme={theme}>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={toggleDrawer(true)}
            >
                <MenuIcon />
            </IconButton>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </ThemeProvider>
    );
}