import React from "react";
import Navbar from "../../Components/Navbar";
import headerImage from "../../assets/header-home.png";
import Footer from "../../Components/Footer";
import card1 from "../../assets/card-1.jpg";
import card2 from "../../assets/card-2.png";
import card3 from "../../assets/card-3.jpg";
import thirdSectionVideo from "../../assets/video.mp4";
import tiktok from "../../assets/tiktok-image.png";
import instagram from "../../assets/instagram-image.png";
import facebook from "../../assets/facebook-image.png";
import twitter from "../../assets/x-image.png";
import youtube from "../../assets/youtube-image.png";
import linkedin from "../../assets/linkedin-image.png";
import { Link } from "react-router-dom";
function Home() {
  return (
    <section className="page-container">

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
            <Link to={"/services"} className="btn-header">Our Services</Link>
          </section>
          <section className="second-section-right">
            <img src={headerImage} alt="header" className="header-image" />
          </section>
        </section>
        <section className="second-section">
          <h1 className="header-second-section">Why Digit Crops?</h1>
          <section className="second-section-content">
            <div className="card">
              <img src={card1} alt="" />
              <h3 className="card-header1">1. Instant Delivery Guaranteed</h3>
              <p>
                Get your active users in no time. Orders typically process
                within minutes of purchase.
              </p>
            </div>
            <div className="card">
              <img src={card2} alt="" />
              <h3 className="card-header1">2. High Quality Followers</h3>
              <p>
                We offer the best quality followers the market has to offer.
                Boost your high follower count with no fake Instagram followers!
              </p>
            </div>

            <div className="card">
              <img src={card3} alt="" />
              <h3 className="card-header1">3. 24/7 Customer Support</h3>
              <p>
                There is nothing worse than dealing with bad customer support.
                We got your back. Dedicated support team.
              </p>
            </div>
          </section>
        </section>
        <section className="third-section">
          <h1 className="header-second-section">How does Digit Grow Work?</h1>
          <section className="third-section-content">
            <video
              className="third-section-img"
              autoPlay
              controls={false}
              muted
              loop
            >
              <source src={thirdSectionVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <section className="third-section-right">
              <section className="third-section-text-1">
                <span className="number">1</span>
                <section>
                  <h2 className="header-numeration">
                    Select the package right for you
                  </h2>
                  <section className=""></section>
                  <p className="text-description-number">
                    Choose from dozens of popular social networks using the
                    links at the top of the page.
                  </p>
                </section>
              </section>
              <section className="third-section-text-1">
                <span className="number">2</span>
                <section>
                  <h2 className="header-numeration">
                    Provide necessary information
                  </h2>
                  <section className=""></section>
                  <p className="text-description-number">
                    Enter the URL of your content or your social media username
                    when prompted.
                  </p>
                </section>
              </section>

              <section className="third-section-text-1">
                <span className="number">3</span>
                <section>
                  <h2 className="header-numeration">Checkout securely </h2>
                  <section className=""></section>
                  <p className="text-description-number">
                    Complete the secure online payment process, and we'll begin
                    delivering your order.
                  </p>
                </section>
              </section>
            </section>
          </section>
        </section>
        <section className="forth-section">
          <h1 className="header-second-section">Discover our services</h1>
          <section className="forth-section-content">
            <section className="forth-section-card">
              <section className="forth-section-card-brand">
                <img src={tiktok} className="card-forth-img" alt="tiktok" />
                <h3 className="card-forth">Tiktok</h3>
              </section>
              <section className="forth-section-description">
                <p>Buy Cheap and Instant TikTok Followers, Likes and Views</p>
              </section>
            </section>

            <section className="forth-section-card">
              <section className="forth-section-card-brand">
                <img src={instagram} className="card-forth-img" alt="tiktok" />
                <h3 className="card-forth">Instagram</h3>
              </section>
              <section className="forth-section-description">
                <p>Buy Cheap and Real Instagram Followers, Likes and Views</p>
              </section>
            </section>

            <section className="forth-section-card">
              <section className="forth-section-card-brand">
                <img src={facebook} className="card-forth-img" alt="tiktok" />
                <h3 className="card-forth">Facebook</h3>
              </section>
              <section className="forth-section-description">
                <p>Buy Cheapest and Real Facebook Followers, Likes and Views</p>
              </section>
            </section>

            <section className="forth-section-card">
              <section className="forth-section-card-brand">
                <img src={twitter} className="card-forth-img" alt="tiktok" />
                <h3 className="card-forth">Twitter</h3>
              </section>
              <section className="forth-section-description">
                <p>Buy Cheap and Instant Twitter Followers, Likes and Views </p>
              </section>
            </section>

            <section className="forth-section-card">
              <section className="forth-section-card-brand">
                <img src={youtube} className="card-forth-img" alt="tiktok" />
                <h3 className="card-forth">Youtube</h3>
              </section>
              <section className="forth-section-description">
                <p>Buy Cheap and Real YouTube Subscribers, Watch Hours Likes and Views</p>
              </section>
            </section>

            <section className="forth-section-card">
              <section className="forth-section-card-brand">
                <img src={linkedin} className="card-forth-img" alt="tiktok" />
                <h3 className="card-forth">LinkedIn</h3>
              </section>
              <section className="forth-section-description">
                <p>Buy Cheap and Instant LinkedIn Company and Profiles Followers</p>
              </section>
            </section>

           
          </section>
        </section>
      </section>
      <Footer/>

    </section>
  );
}

export default Home;
