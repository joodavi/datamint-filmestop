import { useEffect, useState } from "react";
import { MovieType } from "./types/ApiResponseTypes";
import api from "./services/api";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import blankImage from './assets/blank_image.png';
import Carousel from "./components/Carousel";
import AppBarSearch from "./components/AppBarSearch";

export default function App() {
    const [popularMovies, setPopularMovies] = useState<MovieType[]>();
    const [trendingMovies, setTrendingMovies] = useState<MovieType[]>();

    async function fetchTrendingMovies() {
        const { data } = await api.get(
            `trending/movie/day?api_key=${import.meta.env.VITE_API_KEY}`,
        );
        setTrendingMovies(data.results);
    }

    async function fetchPopularMovies() {
        const { data } = await api.get(
            `movie/popular?api_key=${import.meta.env.VITE_API_KEY}`
        );
        setPopularMovies(data.results);
    }

    useEffect(() => {
        fetchTrendingMovies();
        fetchPopularMovies();
    }, []);

    return (
        <>
            <AppBarSearch />
            <Box>
                <Typography variant="h4" className="p-4 underline">
                    Popular Movies
                </Typography>
                <Carousel className="flex gap-4 px-4">
                    {popularMovies &&
                        popularMovies.map((movie: MovieType) => (
                            <Box marginBottom={"208px"} key={movie.id} sx={{
                                width: "25%"
                            }}>
                                <Link to={`movies/${movie.id}`}>
                                    <Box sx={{ width: 300, height: 250 }} >
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
            <Box>
                <Typography variant="h4" className="p-4 underline">
                    Trending Movies
                </Typography>
                <Carousel className="flex gap-4 p-4">
                    {trendingMovies &&
                        trendingMovies.map((movie: MovieType) => (
                            <Box marginBottom={"208px"} key={movie.id} sx={{
                                width: "25%"
                            }}>
                                <Link to={`movies/${movie.id}`}>
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
                </Carousel>
            </Box>
        </>
    );
}