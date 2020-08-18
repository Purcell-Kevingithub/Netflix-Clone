import React from "react";
import { Link } from 'react-router-dom';
import netflix from '../images/netflix.png';
import Search from "./Search";

const Header = (props) => {
  const clickChange = () => {
    props.displayFalse();
    props.changeGenre();
  }

  return (
    <div className="App-header">
    <Link to='/'><img alt='poster' src={netflix} onClick={clickChange}/></Link> 
    <Search search={props.search} displayTrue={props.displayTrue} displayGenre={props.displayGenre} />
    </div>
  );
};

export default Header;