import React, { useEffect } from "react";
import "./SideBarService.css";

const AnimatedSidenav = () => {
  useEffect(() => {
    // Close the sidebar when the component mounts
    closeNav();
  }, []); // Empty dependency array ensures this effect runs only once

  const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  };

  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };

  return (
    <div className="sidenav-container">
      <div id="mySidenav" className="sidenav">
        <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
          &times;
        </a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
      </div>
      <span style={{ fontSize: "50px", cursor: "pointer" }} onClick={openNav}>
        &#9776;
      </span>
    </div>
  );
};

export default AnimatedSidenav;
