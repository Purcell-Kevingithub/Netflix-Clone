import React from "react";
import { Link } from 'react-router-dom';
import netflix from '../images/netflix.png';
import Search from "./Search";

const Header = (props) => {
  return (
    <div className="App-header">
    <Link to='/'><img alt='poster' src={netflix} onClick={props.displayFalse}/></Link> 
    <Search search={props.search} display={props.displayTrue} />
    </div>
  );
};

export default Header;