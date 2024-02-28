import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MoviePage from "./pages/Movie.tsx";
import GenrePage from "./pages/Genre.tsx";
import NewSearchPage from "./pages/NewSearch.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/movies/:id",
    element: <MoviePage />,
  },
  {
    path: "/search/:query",
    element: <NewSearchPage />
  },
  {
    path: "/genres/:id",
    element: <GenrePage />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
