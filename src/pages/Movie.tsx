import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MovieType, CastType } from "../types/ApiResponseTypes";
import api from "../services/api";

import { Box, Card, CardContent, CardMedia, ThemeProvider, Typography, createTheme } from "@mui/material";
import SearchAppBar from "../components/AppBar";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
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

  // Aqui tem todos os filmes relacionados
  const [movie, setMovie] = useState<MovieType>();
  const [moviesRelated, setMoviesRelated] = useState<MovieType[]>();
  const [castMovie, setCastMovie] = useState<CastType[]>();

  async function fetchMovieCast() {
    const { data } = await api.get(`movie/${id}/credits`, {
      params: {
        api_key: import.meta.env.VITE_API_KEY,
      }
    })

    setCastMovie(data.cast)
  }

  async function fetchRelatedMovies() {
    const { data } = await api.get(`movie/${id}/recommendations`, {
      params: {
        api_key: import.meta.env.VITE_API_KEY,
      },
    });

    setMoviesRelated(data.results);
  }

  // Função que busca os dados do filme cujo id foi informado por parametro da requisição
  async function fetchMovie() {
    const { data } = await api.get(`movie/${id}`, {
      params: {
        api_key: import.meta.env.VITE_API_KEY,
      },
    });

    setMovie(data);
  }

  useEffect(() => {
    fetchMovieCast();
    fetchRelatedMovies();
    fetchMovie();
  }, []);

  return (
    <Box sx={{ bgcolor: '#151515', height: "100vh" }}>
      <SearchAppBar />
      {movie && (
        <ThemeProvider theme={theme}>
          <div>
            <img
              src={`${import.meta.env.VITE_IMAGE_PROVIDER_BASEURL}/${movie.backdrop_path}`}
              alt="Movie Backdrop"
              className="w-screen h-screen object-cover" />
            <div className="absolute top-0 left-0 right-0 flex justify-center items-center h-full">
              <button className="bg-black bg-opacity-50 p-4 rounded-full">
                <PlayCircleOutlineIcon sx={{ fontSize: 72 }} color="secondary" />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-4 text-white">
              <div className="flex flex-col items-baseline gap-4 italic">
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
                <div className="flex gap-4 mb-4">
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
                </div>
              </div>
              <Typography variant="h6">
                {movie.overview}
              </Typography>
              <div className="flex gap-2 mt-4">
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
              </div>
            </div>
          </div>
          <Typography variant="h4" className="p-4 underline">
            Movie Cast
          </Typography>
          {castMovie && castMovie.length > 0 ? (
            <ul className="flex gap-4 mx-4">
              {castMovie.map((cast: CastType) => (
                <li key={movie.id}>
                  <Box sx={{ width: 200 }}>
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
                      <div className="flex flex-col">
                        <Typography variant="body2">
                          {cast.name}
                        </Typography>
                        <Typography variant="body1" color="secondary" className="italic">
                          {cast.character}
                        </Typography>
                      </div>
                    </CardContent>
                  </Box>
                </li>
              ))}
            </ul>
          ) : (
            <div />
          )}
          {moviesRelated && moviesRelated.length > 0 ? (
            <>
              <Typography variant="h4" className="p-4 underline">
                Related Movies
              </Typography>
              <ul className="flex gap-4 mx-4">
                {moviesRelated.map((movie: MovieType) => (
                  <li key={movie.id}>
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
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div />
          )}
        </ThemeProvider>
      )}
    </Box>
  );
}