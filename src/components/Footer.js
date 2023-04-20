import React from "react";
import { getYear } from '../utility/general'


const Footer = () => {
  return (
    <footer className="footer">&#169; {getYear()} Kevin Purcell</footer>
  )
}

export default Footer;
