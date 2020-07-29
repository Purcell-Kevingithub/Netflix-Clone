import React from "react";
import "../css/App.css";
import Header from "./Header";
import Genres from './Genres';
import Detail from './Moviedetails';
import NoMatchPage from './NoMatchPage';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// This is the main functional component where everything is attached. 
const App = () => {
    return (
    <div className="App grid">
      <Router>
      <Route path='/' component={Header}/>
        <Switch>
        <Route path="/" exact component={Genres}/>
        <Route path="/details" exact component={Detail} />
        <Route path="/404" component={NoMatchPage} />
        <Redirect to="/404" />
        </Switch>
      </Router>
    </div>
  );
};


export default App;