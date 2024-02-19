import React from "react";
import Navbar from "../../Components/Navbar";
import "./Home.css";
function Home() {
  return (
    <section>
      <Navbar />
      <section className="home-container">
        <section className="first-section">
          <section className="first-section-left">
            <h1 className="header-first-section">
              Enhance Your <span className="highlight">Social Media </span>
              Presence Today
            </h1>
            <h6>
              Unlock Your Potential with Authentic Followers – Elevate Your
              Engagement, Amplify Your Influence, and Dominate the Social Scene.
            </h6>
          </section>
          <section className="first-section-right"></section>
        </section>
      </section>
    </section>
  );
}

export default Home;
