import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MovieType, CastType } from "../types/ApiResponseTypes";
import api from "../services/api";
import { Box, Card, CardContent, CardMedia, ThemeProvider, Typography, createTheme } from "@mui/material";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Carousel from "../components/Carousel";
import AppBarSearch from "../components/AppBarSearch";

import blankImage from '../assets/blank_image.png';
import blankPerson from '../assets/person_blank_image.png';

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

export default function MoviePage() {
    const { id } = useParams();

    const [movie, setMovie] = useState<MovieType>();
    const [moviesRelated, setMoviesRelated] = useState<MovieType[]>();
    const [castMovie, setCastMovie] = useState<CastType[]>();

    async function fetchMovieCast() {
        const { data } = await api.get(
            `movie/${id}/credits?api_key=${import.meta.env.VITE_API_KEY}`
        );
        setCastMovie(data.cast)
    }

    async function fetchRelatedMovies() {
        const { data } = await api.get(
            `movie/${id}/recommendations?api_key=${import.meta.env.VITE_API_KEY}`
        );
        setMoviesRelated(data.results);
    }

    async function fetchMovie() {
        const { data } = await api.get(
            `movie/${id}?api_key=${import.meta.env.VITE_API_KEY}`
        );
        setMovie(data);
    }

    useEffect(() => {
        fetchMovieCast();
        fetchRelatedMovies();
        fetchMovie();
    }, []);

    return (
        <Box sx={{ bgcolor: '#151515', height: "100vh" }}>
            <AppBarSearch />
            {movie && (
                <ThemeProvider theme={theme}>
                    <Box>
                        <img
                            src={`${import.meta.env.VITE_IMAGE_PROVIDER_BASEURL}/${movie.backdrop_path}`}
                            alt="Movie Backdrop"
                            className="w-screen h-screen object-cover" />
                        <Box sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%"
                        }}>
                            {/* <button className="bg-black bg-opacity-50 p-4 rounded-full">
                                <PlayCircleOutlineIcon sx={{ fontSize: 72 }} color="secondary" />
                            </button> */}
                        </Box>
                        <Box padding={4} sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: "#000000BF",
                            color: "fff"
                        }}>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "baseline",
                                fontStyle: "italic"
                            }}>
                                <Typography className="not-italic uppercase" variant="h2">
                                    {movie.title}
                                </Typography>
                                {movie.status !== "Released" ? (
                                    <Typography variant="h6">
                                        Movie Status: {movie.status}
                                    </Typography>
                                ) : (
                                    <></>
                                )}
                                <Box marginTop={4} sx={{
                                    display: "flex",
                                    gap: 2
                                }}>
                                    {movie.tagline ?
                                        <Typography variant="h6" color="secondary">
                                            "{movie.tagline}"
                                        </Typography> :
                                        <div />
                                    }
                                    {movie.runtime !== 0 ? (
                                        <Typography variant="h6">
                                            {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min
                                        </Typography>
                                    ) : (
                                        <div />
                                    )}
                                    {movie.release_date ? (
                                        <Typography variant="h6">
                                            {new Date(movie.release_date).getFullYear()}
                                        </Typography>
                                    ) : (
                                        <div />
                                    )}
                                </Box>
                            </Box>
                            <Typography variant="h6">
                                {movie.overview}
                            </Typography>
                            <Box marginTop={4} sx={{
                                display: "flex",
                                gap: 2
                            }}>
                                {moviesRelated && movie.genres.length > 0 ? (
                                    movie.genres.map((genre: any) => (
                                        <ThemeProvider theme={theme}>
                                            <Typography
                                                className="bg-[#0A1E28] text-[#69F58C] uppercase px-2 py-1 italic"
                                                variant="body2"
                                            >
                                                <Link to={`../genres/${genre.id}`}>
                                                    {genre.name}
                                                </Link>
                                            </Typography>
                                        </ThemeProvider>
                                    ))
                                ) : (
                                    <div />
                                )}
                            </Box>
                        </Box>
                    </Box>
                    <Typography variant="h4" className="p-4 underline">
                        Movie Cast
                    </Typography>
                    {castMovie && castMovie.length > 0 ? (
                        <Carousel>
                            {castMovie.map((cast: CastType) => (
                                <Box key={movie.id}>
                                    <Box sx={{ width: 100 }}>
                                        <Card>
                                            <CardMedia
                                                component="img"
                                                image={
                                                    cast.profile_path ?
                                                        `${import.meta.env.VITE_IMAGE_PROVIDER_BASEURL}/${cast.profile_path}` :
                                                        blankPerson
                                                }
                                                alt={movie.title || "Movie image"}
                                                sx={{ height: "100%", objectFit: "contain" }}
                                            />
                                        </Card>
                                        <CardContent className="flex items-center justify-between">
                                            <Box>
                                                <Typography variant="body2">
                                                    {cast.name.split(' ').slice(0, 2).join(' ')}
                                                </Typography>
                                                <Typography variant="body1" color="secondary" className="italic">
                                                    {cast.character.split(' ').slice(0, 2).join(' ')}
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Box>
                                </Box>
                            ))}
                        </Carousel>
                    ) : (
                        <div />
                    )}
                    {moviesRelated && moviesRelated.length > 0 ? (
                        <Box>
                            <Typography variant="h4" className="p-4 underline">
                                Related Movies
                            </Typography>
                            <Carousel className="flex gap-4 mx-4">
                                {moviesRelated.map((movie: MovieType) => (
                                    <Box key={movie.id}>
                                        <Link to={`../movies/${movie.id}`} reloadDocument>
                                            <Box sx={{ width: 300 }}>
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
                            </Carousel>
                        </Box>
                    ) : (
                        <div />
                    )}
                </ThemeProvider>
            )}
        </Box>
    );
}