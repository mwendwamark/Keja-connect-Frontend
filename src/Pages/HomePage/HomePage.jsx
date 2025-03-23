
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./HomePage.css";
import Testimonials from "../../assets/Testimonial/Testimonials";
import landlordimg from "../../assets/Hero-landlord.png";
import studentimg from "../../assets/Hero-student.png";
import introImg from "../../assets/Home-intro-img.png";
import chooseUs1 from "../../assets/choose1.png";
import chooseUs2 from "../../assets/choose2.png";
import Navbar from "../../Components/Navbar/Navbar";
import ScrollReveal from "scrollreveal";
import Footer from "../../Components/Footer/Footer"
const HomePage = () => {
  useEffect(() => {
    const sr = ScrollReveal({
      reset: false,
      distance: "60px",
      duration: 2500,
      delay: 400,
    });

    // Apply reveal effect to each section with specific settings

   const applyScrollReveal = () => {
     if (window.innerWidth <= 1024) {
       // For medium and smaller screens
       sr.reveal(".hero-title", { origin: "bottom", duration: 2000 });
       sr.reveal(".hero-images", { origin: "bottom", delay: 300 });
       sr.reveal(".intro-image", { origin: "bottom", delay: 300 });
       sr.reveal(".intro-contents", { origin: "bottom", delay: 500 });
       sr.reveal(".data-item", { interval: 200, origin: "bottom", delay: 600 });
       sr.reveal(".why-choose-us-students", { origin: "bottom", delay: 400 });
       sr.reveal(".why-choose-us-landlords", { origin: "bottom", delay: 400 });
     } else {
       // For large screens
       sr.reveal(".hero-title", { origin: "left" });
       sr.reveal(".hero-images", { origin: "right", delay: 500 });
       sr.reveal(".intro-image", { origin: "left", delay: 300 });
       sr.reveal(".intro-contents", { origin: "right", delay: 500 });
       sr.reveal(".data-item", {
         interval: 200,
         origin: "bottom",
         delay: 600,
       });
       sr.reveal(".why-choose-us-students", { origin: "left", delay: 400 });
       sr.reveal(".why-choose-us-landlords", { origin: "right", delay: 400 });
     }
   };

    applyScrollReveal();
  }, []);

  return (
    <>
      <Navbar />
      <div className="home-page">
        <div className="home-hero-section container">
          <div className="hero-title">
            <h3>Keja Connect</h3>
            <h1>Streamline your hostel hunting experience</h1>{" "}
            <p>
              Students can find and reserve the perfect hostels, while landlords
              list and manage their properties—all in one place.
            </p>
            <NavLink to="/role-selection">Get started </NavLink>
          </div>

          <div className="hero-images">
            <div className="hero-image-student">
              <div className="hero-student-contents">
                <p className="hero-welcome">Welcome!</p>
                <p className="hero-role">I am a student</p>
                <NavLink className="hero-register" to="/student/signup">
                  Register
                </NavLink>
              </div>
              <div className="student-img">
                <img src={studentimg} alt="student-image"  loading="lazy"/>
              </div>
            </div>

            <div className="hero-image-landlord">
              <div className="hero-landlord-contents">
                {" "}
                <p className="hero-welcome">Welcome!</p>
                <p className="hero-role">I am a Landlord</p>
                <NavLink className="hero-register" to="/landlord/signup">
                  Register
                </NavLink>
              </div>{" "}
              <div className="landlord-img">
                <img src={landlordimg} alt="landlord-image" />
              </div>
            </div>
          </div>
        </div>

        <div className="home-introduction-section">
          <div className="intro-image-contents container">
            <div className="intro-image">
              <img src={introImg} alt="" />
            </div>
            <div className="intro-contents">
              <h3>Introduction</h3>
              <h2 className="h2-heading">
                Find your perfect home away from home
              </h2>
              <p>
                Keja Connect is the ultimate platform for students seeking
                comfortable and affordable hostels near their
                universities. We bridge the gap between students and hostel
                owners, providing a seamless and efficient booking experience.

              </p>
            </div>{" "}
          </div>{" "}
          <div className="intro-section-data">
            <div className="data-item">
              <h2 className="data-number">8475+</h2>
              <p className="data-label">Students</p>
            </div>
            <div className="data-item">
              <h2 className="data-number">594+</h2>
              <p className="data-label">Landlords</p>
            </div>
            <div className="data-item">
              <h2 className="data-number">12065+</h2>
              <p className="data-label">Hostels</p>
            </div>
          </div>
        </div>

        <div className="why-choose-us-section container section">
          <div className="why-choose-us-title">
            <h3>DISCOVER & GROW</h3>
            <h2 className="h2-heading">Why choose us?</h2>
          </div>
          <div className="why-choose-us-students container">
            <div className="why-choose-us-student-contents">
              <h3>FOR STUDENTS</h3>
              <h2>Reduce the hassle for hostel hunting</h2>
              <p>
                Discover a wide range of hostels with detailed information,
                including location, price, amenities, and images. Easily book
                your preferred hostel, manage your bookings, and view your
                booking history. Your home away from home is just a few clicks
                away!
              </p>
              <NavLink to="/student/signup"> Student account</NavLink>
            </div>
            <div className="why-choose-us-student-image">
              <img src={chooseUs1} alt="" />
            </div>
          </div>

          <div className="why-choose-us-landlords container">
            <div className="why-choose-us-landlord-image">
              <img src={chooseUs2} alt="" />
            </div>
            <div className="why-choose-us-landlord-contents">
              <h3>FOR LANDLORDS</h3>
              <h2>Scale up your rental business effortlessly</h2>
              <p>
                List your hostels and reach thousands of potential student
                tenants. Manage your listings, track bookings, and calculate
                your earnings effortlessly through your personalized dashboard.
                Keja Connect makes it simple to fill your rooms and grow your
                business.
              </p>

              <NavLink to="/landlord/signup"> Landlord account</NavLink>

            </div>{" "}
          </div>
        </div>

        <div className="featured-hostels-section"></div>

        <div className="testimonial-section">
          <div className="testimonial-items">
            <Testimonials />
          </div>
        </div> 

        <div className="home-cta-section container section section-bottom">
          <div className="home-cta-container">
            <h2>Ready to find your perfect student accommodation?</h2>
            <p>Join thousands of students who have found their ideal hostel through Jamii Hostels.</p>
            <div className="cta-buttons">
              <NavLink to="/hostels" className="cta-button">Browse Hostels</NavLink>
              <NavLink to="/about" className="cta-button cta-secondary">Learn More</NavLink>
            </div>
          </div>
        </div>      
      </div>
      <Footer/>
    </>
  );
};

export default HomePage;