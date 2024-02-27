import { styled, alpha, createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { MovieType } from '../types/ApiResponseTypes';
import { useState } from 'react';
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

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

    const handleSearch = async () => {
        const { data } = await api.get(`search/movie`, {
            params: {
                query: searchText,
                api_key: import.meta.env.VITE_API_KEY,
            },
        });
        setSearchResultsMovies(data.results);
        console.log(data)
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color="primary">
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
                            <SearchIconWrapper onClick={handleSearch}>
                                <SearchIcon color="secondary" />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                value={searchText}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyPress}
                            />
                        </Search>
                    </Toolbar>
                </AppBar>
            </Box>
            <ul className="flex flex-wrap p-4">
                {searchResultsMovies &&
                    searchResultsMovies.map((movie: MovieType) => (
                        <li key={movie.id} className="w-2/12 mb-48">
                            <Link to={`../movies/${movie.id}`} reloadDocument>
                                <Box sx={{ width: 300, height: 50, mb: 4, mx: "auto" }} >
                                    {" "}
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
                        </li>
                    ))}
            </ul>
        </ThemeProvider>
    );
}