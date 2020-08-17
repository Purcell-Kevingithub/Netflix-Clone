import React from 'react';
import { Link } from 'react-router-dom';


const NoMatchPage = () => {

    return (
      <div className="no-match">
        <Link to='/'><p>Return Home</p></Link> 
        <h3>
         This page does not exist.
        </h3>
      </div>
    );
}

export default NoMatchPage;