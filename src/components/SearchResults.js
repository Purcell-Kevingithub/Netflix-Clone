import React from 'react';
import { Link } from 'react-router-dom';
import placeholder from '../images/comingsoon.png';

const SearchResults = ({results, display}) => {
    // array of results from search
    const movies = results.search;
    const renderResults = () => {    
        return movies.map((movie, index) => {
        const poster =
        movie.poster_path=== null ? placeholder : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

        return (
            <div className="movie" key={index}>
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
                    </Link>
                </div>
            </div>
            )
        })
    }

    return (
        <div style={{display: display ? 'block': 'none' }}>{renderResults()}</div>
      );
}

export default SearchResults;