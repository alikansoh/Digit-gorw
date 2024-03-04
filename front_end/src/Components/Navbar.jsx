import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import Logo from "../assets/login-mobile.png";

function Navbar() {
  // Function to check screen size

  return (
    <nav className="navbar1">
      
      <Link to={"/"}><img src={Logo} alt="Logo" className="logo-navbar1" /> </Link>
      <ul className="right menu">
        <li><NavLink exact to={"/"} className={({isActive}) => (isActive ? "active-style" : 'none')} >Home</NavLink></li>
        <li><NavLink to={"/services"}className={({isActive}) => (isActive ? "active-style" : 'none')} >Services</NavLink></li>
        <li><NavLink to={"/contactUs"} className={({isActive}) => (isActive ? "active-style" : 'none')}>Contact Us</NavLink></li>
        <li><NavLink to={"/aboutUS"}  className={({isActive}) => (isActive ? "active-style" : 'none')} >About Us</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;
