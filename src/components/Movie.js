import React from "react";
import { Link } from 'react-router-dom';
import placeholder from '../images/comingsoon.png';



const Movie = ({ movie }) => {
  const poster =
    movie.poster_path === null ? placeholder : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  return (
    <div className="movie">
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