import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import Logo from "../assets/login-mobile.png";

function Navbar() {
  // Function to check screen size
  const isSmallScreen = window.innerWidth <= 768;

  return (
    <nav className="navbar1">
      {/* Render logo only if it's not a small screen */}
      {!isSmallScreen && <img src={Logo} alt="Logo" className="logo-navbar1" />}
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
