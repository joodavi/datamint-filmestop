import { styled, alpha, createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useParams } from 'react-router-dom';
import { MovieType } from '../types/ApiResponseTypes';
import { useEffect, useState } from 'react';
import api from '../services/api';
import { CardMedia, CardContent } from '@mui/material';
import { Card } from 'react-bootstrap';
import blankImage from '../assets/blank_image.png';
import GenreDrawer from '../components/Drawer';

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

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function SearchPage() {
    const [searchText, setSearchText] = useState('');
    const [searchResultsMovies, setSearchResultsMovies] = useState<MovieType[]>();

    const fetchSearch = async () => {
        const { data } = await api.get(`search/movie?`, {
            params: {
                query: searchText,
                api_key: import.meta.env.VITE_API_KEY,
            },
        });
        setSearchResultsMovies(data.results);
        console.log(data.results)
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            fetchSearch();
        }
    };

    useEffect(() => {
        fetchSearch();
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="sticky" color="primary">
                    <Toolbar>
                        <GenreDrawer />
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                            color="secondary"
                        >
                            <Link to="/">
                                filmesTOP.com
                            </Link>
                        </Typography>
                        <Search>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                value={searchText}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyPress}
                            />
                        </Search>
                        <Box marginX={2} p={0.85} sx={{
                            ":hover": {
                                bgcolor: "#50738C",
                                transition: "background-color 0.3s ease-in-out" // Adicionando uma transição suave
                            },
                            cursor: "pointer",
                            borderRadius: 1
                        }}>
                            <Link to={`../search/movie?${searchText}`} reloadDocument>
                                <SearchIcon color="secondary" />
                            </Link>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            {
                searchResultsMovies && searchResultsMovies.length > 0 ? (
                    <Box paddingY={4} sx={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center", listStyle: "none" }} >
                        {searchResultsMovies.map((movie: MovieType) => (
                            <Box key={movie.id} marginBottom={24} sx={{ width: "17.5%" }}>
                                <Link to={`../movies/${movie.id}`} reloadDocument>
                                    <Box sx={{ width: 300, height: 50, mb: 4, mx: "auto" }} >
                                        <Card>
                                            <CardMedia
                                                component="img"
                                                image={
                                                    movie.backdrop_path ?
                                                        `${import.meta.env.VITE_IMAGE_PROVIDER_BASEURL}/${movie.backdrop_path}` :
                                                        blankImage
                                                }
                                                alt={movie.title || "Movie image"}
                                                sx={{ height: "100%", objectFit: "contain" }}
                                                className="transition ease-in-out delay-5 hover:scale-110"
                                            />
                                        </Card>
                                        <CardContent className="flex items-center justify-between">
                                            <Typography variant="h6">
                                                {movie.title}
                                            </Typography>
                                        </CardContent>
                                    </Box>
                                </Link>
                            </Box>
                        ))}
                    </Box>
                ) : <></>
            }
        </ThemeProvider>
    );
}