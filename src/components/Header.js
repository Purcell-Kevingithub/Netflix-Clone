import React from "react";
import { Link } from 'react-router-dom';
import netflix from '../images/netflix.png';

const Header = () => {
  return (
    <div>
      <header className="App-header">
      <Link to='/'><img alt='poster' src={netflix}/></Link> 
      </header>
    </div>
  );
};

export default Header;