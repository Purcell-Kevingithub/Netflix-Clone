import React from "react";
import "../css/App.css";
import Header from "./Header";
import Genres from './Genres';
import Detail from './Moviedetails';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// This is the main functional component where everything is attached. 
const App = () => {
    return (
    <div className="App grid">
      <Router>
        <Route path="/" exact component={Header}/>
        <Route path="/" exact component={Genres}/>
        <Route path="/details" exact component={Detail} />
      </Router>
    </div>
  );
};


export default App;