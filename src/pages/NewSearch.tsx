import { useEffect, useState } from "react";
import { MovieType } from "../types/ApiResponseTypes";
import api from "../services/api";
import { Link, useParams } from "react-router-dom";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import blankImage from '../assets/blank_image.png';
import AppBarSearch from "../components/AppBarSearch";

export default function NewSearchPage() {
    const { query } = useParams();

    const [searchResult, setSearchResult] = useState<MovieType[]>();

    async function fetchSearch() {
        const { data } = await api.get(
            `search/movie?query=${query}&api_key=${import.meta.env.VITE_API_KEY}`
        );
        setSearchResult(data.results);
    }

    useEffect(() => {
        fetchSearch();
    }, []);

    return (
        <>
            <AppBarSearch />
            <ul className="flex flex-wrap p-4">
                {searchResult &&
                    searchResult.map((movie: MovieType) => (
                        <li key={movie.id} className="w-1/6 mb-52">
                            <Link to={`../movies/${movie.id}`}>
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
                        </li>
                    ))}
            </ul>
        </>
    );
}