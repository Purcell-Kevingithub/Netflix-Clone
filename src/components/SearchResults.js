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
            <div className="results-movie" key={index}>
                <div className="hover01">
                    <Link 
                    to={{
                        pathname: "/details",
                        state: { movie }
                    }}
                    >
                    <figure className="figure2">
                    <img
                        alt={`The movie titled: ${movie.original_title}`}
                        src={poster}
                        className="result-image"
                    />
                    </figure>
                    </Link>
                </div>
            </div>
            )
        })
    }

    return (
        <div className="results-grid" style={{display: display ? 'grid': 'none' }}>{renderResults()}</div>
      );
}

export default SearchResults;