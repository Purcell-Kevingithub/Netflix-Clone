import React from "react";

const Footer = () => {
  function getYear() {
    return new Date().getFullYear();
  }

  return <footer className="footer">&#169; {getYear()} Kevin Purcell</footer>;
};

export default Footer;
