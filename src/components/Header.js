import React from "react";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <header className="App-header">
      <h3>This is the header</h3>
        <p style={{fontFamily: "Lucida Console"}}>here is the drop down menu</p>
        <p className="App-intro">Come see what's new and exciting.</p>
        <Link to='/'> Home Text </Link><br/>  
      </header>
    </div>
  );
};

export default Header;