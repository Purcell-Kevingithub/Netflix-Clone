import React, { useReducer, useEffect } from "react";
import { Link } from "react-router-dom";

import dateFormat from "dateformat"
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../css/App.css";
import placeholder from "../images/comingsoon.png";
import { detailsReducer, initDetail } from "../reducers/Reducers";




const Detail = (props) => {
  const currentMovie = props?.location?.state?.movie;
  const currentId = props?.location?.state?.movie?.id;
  const [trailer, trailerDispatch] = useReducer(detailsReducer, initDetail);

  const releaseDate = currentMovie?.release_date
  const formattedDate = dateFormat(releaseDate, "longDate",);


  // use the passed in prop currentId to fetch the correct trailer
  useEffect(() => {
    async function fetchTrailer() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${currentId}/videos?api_key=${process.env.REACT_APP_API_KEY}& language=en - US`
        );
        console.log("🚀 ~ file: Moviedetails.js ~ line 28 ~ fetchTrailer ~ response", response)
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




  const TrailersDisplay = () => {
    return (
      <div className="trailer">
        {trailer?.details?.[0] && trailer?.details?.map((video) => {
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
      <div className="content-wrapper">
        <div className="before" style={{
          content: "",
          position: "absolute",
          left: "0",
          right: "0",
          zIndex: "-1",
          display: "block",
          backgroundImage: `url(${poster})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: '100%',
          height: '100%',
          filter: 'brightness(0.5)',
        }}></div>
        <div className="after">
          {trailer?.loading && !trailer?.errorMessage ? (
            <span>loading... </span>
          ) :
            trailer?.errorMessage ? (
              <div className="errorMessage">{trailer?.errorMessage}</div>
            ) : (
              <>
                <div className="details-trailer-container">
                  <div className="details">
                    <div className="details-heading">
                      <h1 className="details-title">{currentMovie?.original_title}</h1>
                      <p className="details-date">Release Date: {formattedDate}</p>
                    </div>
                    <p className="overview">{currentMovie?.overview}</p>
                    <button className="play-button">
                      <FontAwesomeIcon icon={faPlay} size="sm" className="playIcon" />
                      Play
                    </button>
                  </div>
                  {TrailersDisplay()}
                </div>
                <div className="return-container">
                  <Link to="/" className="return">
                    Return Home <span className="return-icon"><i class="fa fa-home"></i></span>
                  </Link>
                </div>
              </>
            )}
        </div>
      </div>
    );
  };

  return renderDetails()
}

export default Detail
