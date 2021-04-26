import React from "react";
import { Link } from "react-router-dom";
// import netflix from '../images/netflix.png';
import netflix from "../images/Netflix_logo_red.svg";
import Search from "./Search";

const Header = (props) => {
  return (
    <div className="App-header">
      <Link to="/">
        <img src={netflix} alt="Netflix logo" />
      </Link>
      <Search search={props.search} />
    </div>
  );
};

export default Header;
