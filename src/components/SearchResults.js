import React from "react";
import { Link } from "react-router-dom";

const renderResults = (movies) => {

  return (
    movies?.length > 0 &&
    movies?.filter(movie => movie?.poster_path)?.map((movie, index) => {
      const poster = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`

      return (
        <div className="results-movie" key={index}>
          <div className="hover01">
            <Link
              to={{
                pathname: "/details",
                state: { movie },
              }}
            >
              <figure>
                <img
                  alt={`The movie titled: ${movie.original_title}`}
                  src={poster}
                  className="result-image"
                />
              </figure>
            </Link>
          </div>
        </div>
      );
    })
  );
};

const SearchResults = ({ results }) => {
  const movies = results?.movies;

  return <div className="results-grid">{renderResults(movies)}</div>;
};

export default SearchResults;
