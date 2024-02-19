import React from "react";
import "./Navbar.css";
import Logo from "../assets/login-mobile.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <img src={Logo} alt="Logo" className="logo-navbar" />
      <ul className="right menu">
        <li><Link>Home</Link></li>
        <li><Link>Services</Link></li>
        <li><Link>Contact Us</Link></li>
        <li><Link>About Us</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
