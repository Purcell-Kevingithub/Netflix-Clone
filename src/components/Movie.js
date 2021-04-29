import React from "react";
import { Link } from "react-router-dom";
import placeholder from "../images/comingsoon.png";

const Movie = ({ movie }) => {
  const { original_title, poster_path } = movie;
  const poster =
    movie.poster_path === null
      ? placeholder
      : `https://image.tmdb.org/t/p/w500/${poster_path}`;
  return (
    <div className="movie">
      <Link
        // passing the state as a prop through link
        to={{
          pathname: "/details",
          state: { movie },
        }}
      >
        <img
          alt={`The movie titled: ${original_title}`}
          src={poster}
          className="movie-image"
        />
      </Link>
      <div></div>
    </div>
  );
};

export default Movie;
