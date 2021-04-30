import React, { useReducer, useEffect } from "react";
import { movieDetailReducer, initDetail } from "../reducers/Reducers";
import { Link } from "react-router-dom";
import placeholder from "../images/comingsoon.png";
import TMDB_KEY from "../apis/Apikey";
import "../css/App.css";

const Detail = (props) => {
  const currentMovie = props.location.state.movie;
  const currentId = props.location.state.movie.id;
  const [trailer, trailerDispatch] = useReducer(movieDetailReducer, initDetail);

  // use the passed in prop currentId to fetch the correct trailer
  useEffect(() => {
    async function fetchTrailer() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${currentId}/videos?api_key=${TMDB_KEY}&language=en-US`
        );
        const json = await response.json();

        if (response.ok === true) {
          trailerDispatch({
            type: "SEARCH_DETAILS_SUCCESS",
            payload: [json.results[0]],
          });
        } else {
          trailerDispatch({
            type: "SEARCH_DETAILS_FAILURE",
            error: "something went wrong",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchTrailer();
  }, [currentId]);

  let poster =
    currentMovie.poster_path === null
      ? placeholder
      : `https://image.tmdb.org/t/p/w500/${currentMovie.poster_path}`;
  //  this function will display nothing when trailer state is empty and then it will display an
  // iframe once data is retrieved bc mapping will not cause an error vs directly accesing an index.
  const TrailersDisplay = () => {
    return (
      <div className="trailer">
        {/* return null if video doesn't exist or first render when ajax requests hasn't completed. */}
        {trailer.details.map((video) => {
          if (!video) {
            return null;
          }
          return (
            <iframe
              key={video.id}
              title={video.id}
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${video.key}`}
              allowFullScreen="allowFullScreen"
            />
          );
        })}
      </div>
    );
  };

  const renderDetails = () => {
    return (
      <div>
        {/* If loading and no error show loading message */}
        {trailer.loading && !trailer.errorMessage ? (
          <span>loading... </span>
        ) : // if there is an error messge display it
        trailer.errorMessage ? (
          <div className="errorMessage">{trailer.errorMessage}</div>
        ) : (
          // This is the final case where not loading or an error. Movie payload is mapped over for each result and passed down as a movie prop
          <div className="poster-container">
            <div
              className="poster"
              style={{
                backgroundImage: `url(${poster})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top",
                backgroundSize: "cover",
                height: "100%",
                width: "100%",
                position: "absolute",
                top: "0",
                left: "0",
                zIndex: "-1",
                opacity: ".65",
              }}
            >
              {/* <img
                src={poster}
                alt={currentMovie.original_title}
                className="trailer-image"
              /> */}
            </div>
            <div className="details-container">
              {TrailersDisplay()}
              <div className="details">
                <h1>{currentMovie.original_title}</h1>
                <h1>{currentMovie.release_date}</h1>
                <p>{currentMovie.overview}</p>
              </div>
              <div className="play-button-container">
                <button className="play-button">Play Movie</button>
                <Link to="/">
                  <p className="return">Return Home</p>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ADD RENDER LOGIC for diff reducer states on details.
  return <div>{renderDetails()}</div>;
};

export default Detail;
