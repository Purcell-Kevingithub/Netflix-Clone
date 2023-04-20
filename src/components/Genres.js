import React, { useReducer, useEffect } from "react";
import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import {
  MOVIE_POPULAR_URL,
  COMEDY_POPULAR_URL,
  HORRORMYSTERY_POPULAR_URL,
  DOCUMENTARY_POPULAR_URL,
  ROMANCE_POPULAR_URL,
  SCIFI_POPULAR_URL,
} from "../apis/endPoints";
import * as Reducers from "../reducers/Reducers";
import Myslider from "./Carousel";



const Genres = () => {
  // Init state with useReducer instead of useState becasue allows dispatch calls for each fetch request.
  // This is a more complicated state object.
  const [state, dispatch] = useReducer(
    Reducers.genreReducer,
    Reducers.initialState
  );

  const [comedyState, comedydispatch] = useReducer(
    Reducers.genreReducer,
    Reducers.initComedy
  );
  const [hmState, horrorMysterydispatch] = useReducer(
    Reducers.genreReducer,
    Reducers.inithm
  );
  const [documentaryState, documentaryDispatch] = useReducer(
    Reducers.genreReducer,
    Reducers.initDocumentary
  );
  const [romanceState, romanceDispatch] = useReducer(
    Reducers.genreReducer,
    Reducers.initRomance
  );
  const [scifiState, ScifiDispatch] = useReducer(
    Reducers.genreReducer,
    Reducers.initScifi
  );

  // This mimics life cycle componentDidMount and componentDidUpdate. We can make api requests and then dispatch
  // state from reducers. This only dispatches for success and brings back the api request from the search typed.
  useEffect(() => {
    fetch(MOVIE_POPULAR_URL)
      .then((response) => response.json())
      .then((jsonResponse) => {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.results,
        });
      });

    fetch(COMEDY_POPULAR_URL)
      .then((response) => response.json())
      .then((jsonResponse) => {
        comedydispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.results,
        });
      });

    fetch(HORRORMYSTERY_POPULAR_URL)
      .then((response) => response.json())
      .then((jsonResponse) => {
        horrorMysterydispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.results,
        });
      });

    fetch(DOCUMENTARY_POPULAR_URL)
      .then((response) => response.json())
      .then((jsonResponse) => {
        const filterAdult = jsonResponse?.results?.filter((movie) => {
          return !movie.original_title.toLowerCase().includes("porn");
        });
        documentaryDispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: filterAdult,
        });
      });

    fetch(ROMANCE_POPULAR_URL)
      .then((response) => response.json())
      .then((jsonResponse) => {
        romanceDispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.results,
        });
      });

    fetch(SCIFI_POPULAR_URL)
      .then((response) => response.json())
      .then((jsonResponse) => {
        ScifiDispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.results,
        });
      });

    // Returning an empty array as second argument here to prevent infinite requests.An empty array only makes the request once so
    // useeffect acts like componenetdidmount. It will continue to make requests if data passed into array is not equivalent to previous request.
  }, []);

  // the movies errormsg and loading props are destructed from the current state and then passed as props below
  const renderMovies = (currentState) => {
    return (
      <div className="genre-grid">
        {/* If loading and no error show loading message */}
        {currentState.loading && !currentState.errorMessage ? (
          <div className="loader-container">
            <Loader type="TailSpin" color="#ee3424" height={80} width={80} />
          </div>
        ) : // if there is an error messge display it
          currentState.errorMessage ? (
            <div className="errorMessage">{currentState.errorMessage}</div>
          ) : (
            // This is the final case where not loading or an error. Movie payload is mapped over for each result and passed down as a movie prop
            <Myslider movieArr={currentState.movies} />
          )}
      </div>
    );
  };

  return (
    <div className="genres">
      <div className="genre">
        <p className="genre-title">New Releases</p>
        {renderMovies(state)}
      </div>
      <div className="genre">
        <p className="genre-title">Horror</p>
        {renderMovies(hmState)}
      </div>
      <div className="genre">
        <p className="genre-title">Comedy</p>
        {renderMovies(comedyState)}
      </div>
      <div className="genre">
        <p className="genre-title">Documentary</p>
        {renderMovies(documentaryState)}
      </div>
      <div className="genre">
        <p className="genre-title">Romance</p>
        {renderMovies(romanceState)}
      </div>
      <div className="genre">
        <p className="genre-title">Science Fiction</p>
        {renderMovies(scifiState)}
      </div>
    </div>
  );
};

export default Genres;
