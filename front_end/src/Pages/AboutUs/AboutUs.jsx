import React from "react";
import "./About-us.css";
import AboutUsImg from "../../assets/about-us.jpg";
import OurMission from "../../assets/ourMission.mp4";
import Logo from "../../assets/login-mobile.png";

function Aboutus() {
  return (
    <section className="aboutus">
      <section className="aboutus-section">
        <img src={AboutUsImg} alt="Aboutus" className="aboutus-img" />
        <section className="aboutus-text">
          <h1 className="aboutus-title">About Us</h1>
          <p className="aboutus-description">
            Welcome to Digit crops, your premier destination for enhancing your
            social media presence. We're passionate about helping individuals
            and businesses unlock their full potential in the digital world.
            With our expertise and commitment to authenticity, we're dedicated
            to providing you with the tools and resources you need to succeed.
          </p>
        </section>
      </section>
      <hr />
      <section className="aboutus-section">
        <video className="aboutus-img" autoPlay controls={false} muted loop>
          <source src={OurMission} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <section className="aboutus-text">
          <h1 className="aboutus-title">Our Mission</h1>
          <p className="aboutus-description">
            At Digit crops, our mission is simple: to empower you to thrive in
            the ever-evolving landscape of social media. We believe in the power
            of genuine connections and meaningful engagement, and we're here to
            support you every step of the way. Whether you're aiming to grow
            your following, increase your influence, or make a lasting impact,
            we're committed to helping you achieve your goals.
          </p>
        </section>
      </section>
      <hr />

      <section className="aboutus-section">
        <img src={Logo} alt="Aboutus" className="aboutus-img img-responsive" />
        <section className="aboutus-text">
          <h1 className="aboutus-title">Our Approach</h1>
          <p className="aboutus-description">
            At Digit crops, we take a holistic approach to social media success.
            We prioritize quality over quantity, focusing on building authentic
            relationships that drive real results. From personalized strategies
            to hands-on support, we're here to guide you on your journey to
            digital dominance. Join us today and experience the difference of
            Digit crops.
          </p>
        </section>
      </section>
    </section>
  );
}

export default Aboutus;
