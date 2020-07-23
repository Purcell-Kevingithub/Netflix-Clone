import Search from "./Search";
import Myslider from './Carousel';
import React, { useReducer, useEffect } from "react";
import  { MOVIE_POPULAR_URL, COMEDY_POPULAR_URL } from "../apis/endPoints";
import * as Reducers from '../reducers/Reducers';

const Genres = () => {
  // Init state with useReducer instead of useState becasue allows dispatch calls for each fetch request. 
  // This is a more complicated state object.
  const [state, dispatch] = useReducer(Reducers.movieReducer, Reducers.initialState);
  const [comedyState, comedydispatch] = useReducer(Reducers.comedyReducer, Reducers.initComedy);
  const [hmState, horrorMysterydispatch] = useReducer(Reducers.hmReducer, Reducers.inithm);
  const [searchState, searchDispatch] = useReducer(Reducers.searchReducer, Reducers.initSearch)
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

        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=d80b050f4d8550ccb422ef14516b40e8&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=27,9648`)
          .then(response => response.json())
          .then(jsonResponse => {
          horrorMysterydispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.results
            });
          })
        // Returning an empty array as second argument here to prevent infinite requests.An empty array only makes the request once so 
        // useeffect acts like componenetdidmount. It will continue to make requests if data passed into array is not equivalent to previous request. 
  	}, []);

    // This search function is passed down as a prop to the child components search. This function is then ran in 
    // search component based on the value from user typing.
    const search = searchValue => {
      // Dispatch returns the load state objects here
    	searchDispatch({
      	type: "SEARCH_MOVIES_REQUEST"
      });
      // Here the value is passed as argument to this function from the search components is fetched.
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=d80b050f4d8550ccb422ef14516b40e8&language=en-US&query=${searchValue}&page=1&include_adult=false`)
        .then(response => response.json())
      	.then(jsonResponse => {
          // if Json response is true then the response is updated to the success case on reducer.
          
          searchDispatch({
            type: 'SEARCH_MOVIES_SUCCESS',
            payload: jsonResponse
          })
          
          // if (jsonResponse.Response === "True") {
          // 	dispatch({
          //       type: "SEARCH_MOVIES_SUCCESS",
          //       payload: jsonResponse
          //   });
          //   // If json response is false then the response is updated the failure case on reducer
        	// } else {
          // 	dispatch({
          //       type: "SEARCH_MOVIES_FAILURE",
          //       error: jsonResponse
          // 	});
          // }
      	});
	  };

    // the movies errormsg and loading props are destructed from the current state and then passed as props below
    const renderMovies = (state) => {
      return ( 
        <div className="movies movie-grid">
        {/* If loading and no error show loading message */}
        {state.loading && !state.errorMessage 
        ? 
        (<span>loading... </span>) 
        : 
        // if there is an error messge display it
        state.errorMessage ? 
        (<div className="errorMessage">{state.errorMessage}</div>) 
        : 
        (// This is the final case where not loading or an error. Movie payload is mapped over for each result and passed down as a movie prop
        <Myslider movieArr={state.movies}/>)
        }
        </div>
      )
     }

    return (
        <div>
            <Search search={search} />
            {renderMovies(state)}
            {renderMovies(comedyState)}
            {renderMovies(hmState)}
        </div>
    );

}

export default Genres;