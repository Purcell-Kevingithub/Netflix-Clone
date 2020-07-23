import React, { useReducer, useEffect } from "react";
import { movieDetailReducer, initDetail} from '../reducers/Reducers';

const Detail = (props) => {
    const currentMovie = props.location.state.movie; 
    const currentId = props.location.state.movie.id;
    const [trailer, trailerDispatch] = useReducer(movieDetailReducer, initDetail);
    console.log(trailer.details)
    
  // not sure if id should be passed as argument to useeffect or fetchtrailer
    useEffect(() => {
        async function fetchTrailer() {
          try {
            const response = await fetch(
              `https://api.themoviedb.org/3/movie/${currentId}/videos?api_key=d80b050f4d8550ccb422ef14516b40e8&language=en-US`
            );
            const json = await response.json();

            if(response.ok === true){
              trailerDispatch({
                type: "SEARCH_DETAILS_SUCCESS",
                payload: [json.results[0]]
              });
            } else {
              trailerDispatch({
                  type: "SEARCH_DETAILS_FAILURE",
                  error: 'something went wrong'
                });
            }
          } catch (error) {
            console.log(error)
          }
        }

        fetchTrailer();
      }, [currentId]);


    const DEFAULT_PLACEHOLDER_IMAGE = "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";
    const poster =
    currentMovie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : `https://image.tmdb.org/t/p/w500/${currentMovie.poster_path}`;
    
//  this function will display nothing when trailer state is empty and then it will display an 
// iframe once data is retrieved bc mapping will not cause an error vs directly accesing an index.
    const TrailersDisplay = () => {
      return (
        <div>
          {trailer.details.map((video) => {
            if (!video) {
              return null;
            }
            return (
              <iframe
                key={video.id}
                title={video.id}
                width="420"
                height="315"
                src={`https://www.youtube.com/embed/${video.key}`}
                allowFullScreen="allowFullScreen"
              />
            );
          })}
        </div>
      );
     
    }
    
      const renderDetails = () => {
        return ( 
            <div>
            {/* If loading and no error show loading message */}
            {trailer.loading && !trailer.errorMessage 
            ? 
            (<span>loading... </span>) 
            : 
            // if there is an error messge display it
            trailer.errorMessage ? 
            (<div className="errorMessage">{trailer.errorMessage}</div>) 
            :  
            (// This is the final case where not loading or an error. Movie payload is mapped over for each result and passed down as a movie prop
            <div>
                <h6>{currentMovie.original_title}</h6>
                <img
                    alt={`The movie titled: ${currentMovie.original_title}`}
                    src={poster}
                    />
                    <p>{currentMovie.release_date}</p>
                    <p>{currentMovie.overview}</p>
                    {TrailersDisplay()}
            </div>
            ) 
            }
            </div>
        )
      }

    // ADD RENDER LOGIC for diff reducer states on details.
    return (
            <div>
                {renderDetails()}
            </div>
        );
}

export default Detail;