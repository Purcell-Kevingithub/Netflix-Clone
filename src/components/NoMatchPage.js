import React from "react";
import { Link } from "react-router-dom";

const NoMatchPage = () => {
  return (
    <div className="no-match">
      <p className="no-match-heading">Page does not exist.</p>
      <Link to="/">
        <p>Return Home</p>
      </Link>
    </div>
  );
};

export default NoMatchPage;
