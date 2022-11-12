import React, { useReducer, useEffect } from "react";
import { movieDetailReducer, initDetail } from "../reducers/Reducers";
import { Link } from "react-router-dom";
import placeholder from "../images/comingsoon.png";
import "../css/App.css";

import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Detail = (props) => {
  const currentMovie = props.location.state.movie;
  const currentId = props.location.state.movie.id;
  const [trailer, trailerDispatch] = useReducer(movieDetailReducer, initDetail);

  function formatDate() {
    let currentDate = currentMovie.release_date.split("-");
    let [year, month, day] = currentDate;

    function formatMonth(month) {
      return Number(month) >= 10 ? month : month.slice(1);
    }

    const months = [
      "skip-this-month",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return `${months[formatMonth(month)]}  ${day}, ${year}`;
  }

  // use the passed in prop currentId to fetch the correct trailer
  useEffect(() => {
    async function fetchTrailer() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${currentId}/videos?api_key=${process.env.REACT_APP_API_KEY}& language=en - US`
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
            <div className="details-container" style={{
              backgroundImage: `url(${poster})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}>
              <div className="details_trailer_container">
                <div className="details">
                  <div className="details-heading">
                    <h1 className="details-title">{currentMovie.original_title}</h1>
                    <p className="details-date">Release Date: {formatDate()}</p>
                  </div>
                  <p className="overview">{currentMovie.overview}</p>
                  <button className="play-button">
                    <FontAwesomeIcon icon={faPlay} size="sm" className="playIcon" />
                    Play
                  </button>
                </div>
                {TrailersDisplay()}
              </div>
              <Link to="/" className="return">
                <p>Return Home</p>
              </Link>
            </div>
          )}
      </div>
    );
  };

  // ADD RENDER LOGIC for diff reducer states on details.
  return <div>{renderDetails()}</div>;
};

export default Detail;
