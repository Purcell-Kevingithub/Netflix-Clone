import SearchResults from './SearchResults';
import Myslider from './Carousel';
import React, { useReducer, useEffect } from "react";
import  { MOVIE_POPULAR_URL, COMEDY_POPULAR_URL, HORRORMYSTERY_POPULAR_URL, DOCUMENTARY_POPULAR_URL, ROMANCE_POPULAR_URL, SCIFI_POPULAR_URL } from "../apis/endPoints";
import * as Reducers from '../reducers/Reducers';

const Genres = (props) => {
  // Init state with useReducer instead of useState becasue allows dispatch calls for each fetch request. 
  // This is a more complicated state object.
  const [state, dispatch] = useReducer(Reducers.movieReducer, Reducers.initialState);
  const [comedyState, comedydispatch] = useReducer(Reducers.comedyReducer, Reducers.initComedy);
  const [hmState, horrorMysterydispatch] = useReducer(Reducers.hmReducer, Reducers.inithm);
  const [documentaryState, documentaryDispatch] = useReducer(Reducers.documentaryReducer, Reducers.initDocumentary)
  const [romanceState, romanceDispatch] = useReducer(Reducers.romanceReducer, Reducers.initRomance)
  const [scifiState, ScifiDispatch] = useReducer(Reducers.scifiReducer, Reducers.initScifi)
  // This mimics life cycle componentDidMount and componentDidUpdate. We can make api requests and then dispatch 
  // state from reducers. This only dispatches for success and brings back the api request from the search typed.
    useEffect(() => {
        fetch(MOVIE_POPULAR_URL)
            .then(response => response.json())
            .then(jsonResponse => {
            dispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.results
            });
        });
          
        fetch(COMEDY_POPULAR_URL)
            .then(response => response.json())
            .then(jsonResponse => {
            comedydispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.results
            });
        })

        fetch(HORRORMYSTERY_POPULAR_URL)
          .then(response => response.json())
          .then(jsonResponse => {
          horrorMysterydispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.results
            });
          })

        fetch(DOCUMENTARY_POPULAR_URL)
          .then(response => response.json())
          .then(jsonResponse => {
          documentaryDispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.results
            });
          })

        fetch(ROMANCE_POPULAR_URL)
          .then(response => response.json())
          .then(jsonResponse => {
          romanceDispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.results
            });
          })

        fetch(SCIFI_POPULAR_URL)
          .then(response => response.json())
          .then(jsonResponse => {
          ScifiDispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.results
            });
          })
        // Returning an empty array as second argument here to prevent infinite requests.An empty array only makes the request once so 
        // useeffect acts like componenetdidmount. It will continue to make requests if data passed into array is not equivalent to previous request. 
  	}, []);


    // the movies errormsg and loading props are destructed from the current state and then passed as props below
    const renderMovies = (currentState) => {
      return ( 
        <div className="movies movie-grid">
        {/* If loading and no error show loading message */}
        {currentState.loading && !currentState.errorMessage 
        ? 
        (<span>loading... </span>) 
        : 
        // if there is an error messge display it
        currentState.errorMessage ? 
        (<div className="errorMessage">{currentState.errorMessage}</div>) 
        : 
        (// This is the final case where not loading or an error. Movie payload is mapped over for each result and passed down as a movie prop
        <Myslider movieArr={currentState.movies}/>)
        }
        </div>
      )
     }

    return (
        <div className="genres">
            <SearchResults results={props.searchState}/>
            <div className="first-genre">
              <h1 className="genre-title">New Releases</h1>
              {renderMovies(state)}
            </div>
            <div>
              <h1 className="genre-title">Horror</h1>
              {renderMovies(hmState)}     
            </div>
            <div>
              <h1 className="genre-title">Comedy</h1>
              {renderMovies(comedyState)}
            </div>

            <div>
              <h1 className="genre-title" >Documentary</h1>
              {renderMovies(documentaryState)}
            </div>
            <div>
              <h1 className="genre-title">Romance</h1>
              {renderMovies(romanceState)}
            </div>
            <div className="last-genre">
              <h1 className="genre-title">Science Fiction</h1>
              {renderMovies(scifiState)}
            </div>

        </div>
    );

}

export default Genres;