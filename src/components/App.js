import React, { useReducer } from "react";
import TMDB_KEY from '../apis/Apikey';
import "../css/App.css";
import Header from "./Header";
import Genres from './Genres';
import Detail from './Moviedetails';
import NoMatchPage from './NoMatchPage';
import * as Reducers from '../reducers/Reducers';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// This is the main functional component where everything is attached. 
const App = () => {
  const [searchState, searchDispatch] = useReducer(Reducers.searchReducer, Reducers.initSearch)
  // This search function is passed down as a prop to the child components search. This function is then ran in 
    // search component based on the value from user typing.
    const search = searchValue => {
      // Dispatch returns the load state objects here. send search request to update state to fetching
    	searchDispatch({
      	type: "SEARCH_MOVIES_REQUEST"
      });
      // Here the value is passed as argument to this function from the search components is fetched.
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&language=en-US&query=${searchValue}&page=1&include_adult=false`)
        .then(response => {
          if(response.ok === true){
            return response.json();
          } else {
            searchDispatch({
                    type: "SEARCH_MOVIES_FAILURE",
                    error: response
              	});
          }   
        })
      	.then(jsonResponse => {
          // if Json response is true then the response is updated to the success case on reducer.
          searchDispatch({
            type: 'SEARCH_MOVIES_SUCCESS',
            payload: jsonResponse.results
          })
      	});
    };


    return (
    <div className="App grid">
      <Router>
        <Route
          path='/'
          render={(props) => (
            <Header {...props} search={search}/>
          )}
        />
        <Switch>  
        <Route
          exact
          path='/'
          render={(props) => (
            <Genres {...props} searchState={searchState} />
          )}
        />
        <Route path="/details" exact component={Detail} />
        <Route path="/404" component={NoMatchPage} />
        <Redirect to="/404" />
        </Switch>
      </Router>
    </div>
  );
};


export default App;