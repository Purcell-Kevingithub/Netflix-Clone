import React from "react";
import { Link } from 'react-router-dom';

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";


const Movie = ({ movie, num }) => {
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  return (
    <div className="movie">
      <p>{num}</p>
      <h6>{movie.original_title}</h6>
      <div>
        <Link 
        to={{
          pathname: "/details",
          state: { movie }
        }}
        >
          <img
            alt={`The movie titled: ${movie.original_title}`}
            src={poster}
          />
  
        <p>({movie.release_date})</p>
        </Link>
      </div>
    </div>
  );
};

export default Movie;