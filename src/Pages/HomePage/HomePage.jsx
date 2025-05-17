import React, { useEffect, lazy, Suspense } from "react";
import { NavLink } from "react-router-dom";
import "./HomePage.css";
// Lazy load the Testimonials component
const Testimonials = lazy(() => import("../../assets/Testimonial/Testimonials"));
import landlordimg from "../../assets/Hero-landlord.png";
import studentimg from "../../assets/Hero-student.png";
import introImg from "../../assets/Home-intro-img.png";
import chooseUs1 from "../../assets/choose1.png";
import chooseUs2 from "../../assets/choose2.png";
import Navbar from "../../Components/Navbar/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../../Components/Footer/Footer"

const HomePage = () => {
  useEffect(() => {
    // Initialize AOS with custom settings
    AOS.init({
      duration: 1200,
      easing: 'ease-out-cubic',
      once: true,
      mirror: false,
      disable: 'mobile'
    });

    // Add resize event listener to refresh AOS on window resize
    window.addEventListener('resize', () => {
      AOS.refresh();
    });

    return () => {
      window.removeEventListener('resize', () => {
        AOS.refresh();
      });
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="home-page">
        <div className="home-hero-section container">
          <div className="hero-title" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">
            <span>Keja Connect</span>
            <h1>Streamline your hostel hunting experience</h1>{" "}
            <p>
              Students can find and reserve the perfect hostels, while landlords
              list and manage their properties—all in one place.
            </p>
            <NavLink to="/role-selection" aria-label="Get started with Keja Connect">Get started </NavLink>
          </div>

          <div className="hero-images" data-aos="fade-left" data-aos-delay="300" data-aos-duration="1200" data-aos-easing="linear">
            <div className="hero-image-student" data-aos="flip-left" data-aos-delay="500" data-aos-duration="800" data-aos-easing="linear">
              <div className="hero-student-contents">
                <p className="hero-welcome">Welcome!</p>
                <p className="hero-role">I am a student</p>
                <NavLink className="hero-register" to="/student/signup" aria-label="Register as a student">
                  Register
                </NavLink>
              </div>
              <div className="student-img">
                <img 
                  src={studentimg} 
                  alt="Student using Keja Connect platform" 
                  width="159" 
                  height="200"
                  loading="lazy"
                  fetchpriority="low"
                />
              </div>
            </div>

            <div className="hero-image-landlord" data-aos="flip-right" data-aos-delay="900" data-aos-duration="1000" data-aos-easing="linear">
              <div className="hero-landlord-contents">
                {" "}
                <p className="hero-welcome">Welcome!</p>
                <p className="hero-role">I am a Landlord</p>
                <NavLink className="hero-register" to="/landlord/signup" aria-label="Register as a landlord">
                  Register
                </NavLink>
              </div>{" "}
              <div className="landlord-img">
                <img 
                  src={landlordimg} 
                  alt="Landlord using Keja Connect platform" 
                  width="235" 
                  height="200"
                  fetchpriority="high"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="home-introduction-section">
          <div className="intro-image-contents container">
            <div className="intro-image" data-aos="zoom-in-right" data-aos-delay="200" data-aos-duration="1000" data-aos-easing="linear">
              <img 
                src={introImg} 
                alt="Students finding accommodation through Keja Connect" 
                width="800" 
                height="600"
                loading="lazy"
              />
            </div>
            <div className="intro-contents" data-aos="fade-up-left" data-aos-delay="400" data-aos-duration="1000" data-aos-easing="linear">
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
          <div className="intro-section-data" data-aos="fade-up" data-aos-delay="100">
            <div className="data-item" data-aos="zoom-in" data-aos-delay="300" data-aos-duration="800" data-aos-easing="linear">
              <h2 className="data-number">8475+</h2>
              <p className="data-label">Students</p>
            </div>
            <div className="data-item" data-aos="zoom-in" data-aos-delay="300" data-aos-duration="800" data-aos-easing="linear">
              <h2 className="data-number">594+</h2>
              <p className="data-label">Landlords</p>
            </div>
            <div className="data-item" data-aos="zoom-in" data-aos-delay="300" data-aos-duration="800" data-aos-easing="linear">
              <h2 className="data-number">12065+</h2>
              <p className="data-label">Hostels</p>
            </div>
          </div>
        </div>

        <div className="why-choose-us-section container section">
          <div className="why-choose-us-title" data-aos="fade-up" data-aos-delay="100" data-aos-duration="800" data-aos-easing="linear">
            <h3>DISCOVER & GROW</h3>
            <h2 className="h2-heading">Why choose us?</h2>
          </div>
          <div className="why-choose-us-students container" data-aos="fade-right" data-aos-delay="200" data-aos-duration="1000" data-aos-easing="linear">
            <div className="why-choose-us-student-contents" data-aos="fade-up" data-aos-delay="300" data-aos-duration="800" data-aos-easing="linear">
              <h3>FOR STUDENTS</h3>
              <h2>Reduce the hassle for hostel hunting</h2>
              <p>
                Discover a wide range of hostels with detailed information,
                including location, price, amenities, and images. Easily book
                your preferred hostel, manage your bookings, and view your
                booking history. Your home away from home is just a few clicks
                away!
              </p>
              <NavLink to="/student/signup" aria-label="Create a student account to find hostels"> Student account</NavLink>
            </div>
            <div className="why-choose-us-student-image" data-aos="zoom-in" data-aos-delay="400" data-aos-duration="800" data-aos-easing="linear">
              <img 
                src={chooseUs1} 
                alt="Students benefiting from Keja Connect services" 
                width="113" 
                height="100"
                loading="lazy"
              />
            </div>
          </div>

          <div className="why-choose-us-landlords container" data-aos="fade-left" data-aos-delay="200" data-aos-duration="1000">
            <div className="why-choose-us-landlord-image" data-aos="zoom-in" data-aos-delay="400" data-aos-duration="800">
              <img 
                src={chooseUs2} 
                alt="Landlords managing properties on Keja Connect" 
                width="164" 
                height="120"
                loading="lazy"
              />
            </div>
            <div className="why-choose-us-landlord-contents" data-aos="fade-up" data-aos-delay="300" data-aos-duration="800">
              <h3>FOR LANDLORDS</h3>
              <h2>Scale up your rental business effortlessly</h2>
              <p>
                List your hostels and reach thousands of potential student
                tenants. Manage your listings, track bookings, and calculate
                your earnings effortlessly through your personalized dashboard.
                Keja Connect makes it simple to fill your rooms and grow your
                business.
              </p>

              <NavLink to="/landlord/signup" aria-label="Create a landlord account to list properties"> Landlord account</NavLink>

            </div>{" "}
          </div>
        </div>

        <div className="featured-hostels-section"></div>

        <div className="testimonial-section" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">
          <div className="testimonial-items" data-aos="zoom-in" data-aos-delay="300" data-aos-duration="800">
            <Suspense fallback={<div>Loading testimonials...</div>}>
              <Testimonials />
            </Suspense>
          </div>
        </div> 

        <div className="home-cta-section container section section-bottom" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">
          <div className="home-cta-container" data-aos="zoom-in" data-aos-delay="300" data-aos-duration="800">
            <h2>Ready to find your perfect student accommodation?</h2>
            <p>Join thousands of students who have found their ideal hostel through Keja Connect.</p>
            <div className="cta-buttons" data-aos="fade-up" data-aos-delay="500" data-aos-duration="800">
              <NavLink to="/hostels" className="cta-button" aria-label="View available hostels" data-aos="fade-right" data-aos-delay="600" data-aos-duration="800">Browse Hostels</NavLink>
              <NavLink to="/about" className="cta-button cta-secondary" aria-label="Learn more about Jamii Hostels" data-aos="fade-left" data-aos-delay="700" data-aos-duration="800">Learn More</NavLink>
            </div>
          </div>
        </div>      
      </div>
      <Footer/>
    </>
  );
};

export default HomePage;