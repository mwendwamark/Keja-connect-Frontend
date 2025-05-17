import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import './About.css';
import Navbar from '../../Components/Navbar/Navbar';
import ImageCarousel from '../../Components/ImageCarousel/ImageCarousel';
import Footer from '../../Components/Footer/Footer';
import { IoSearch } from "react-icons/io5";
import { TbView360Number } from "react-icons/tb";
import { GrSecure } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// Import carousel images
import hostel1 from "../../assets/carousel-images/hostel1.jpg";
import hostel2 from "../../assets/carousel-images/hostel2.jpg";
import hostel3 from "../../assets/carousel-images/hostel3.jpg";
import hostel4 from "../../assets/carousel-images/hostel4.jpg";

const About = () => {
  const carouselImages = [hostel1, hostel2, hostel3, hostel4];

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
      <Helmet>
        <title>About - Jamii Hostels | Student Housing Made Simple</title>
        <meta name="description" content="Learn about Jamii Hostels' mission to simplify student accommodation search. We connect university students with quality housing solutions near their campus." />
        <meta name="keywords" content="Jamii Hostels, student accommodation, university housing, hostel finder" />
      </Helmet>

      <div className="about-page section">
        <section className="about-hero-section container">
          <div className="about-hero-carousel" data-aos="fade-down" data-aos-delay="100" data-aos-duration="1000" data-aos-easing="linear">
            <ImageCarousel images={carouselImages} />
          </div>
          <div className="floating-shape" data-aos="zoom-in" data-aos-delay="300" data-aos-duration="800" data-aos-easing="linear"></div>
          <div className="floating-shape" data-aos="zoom-in" data-aos-delay="500" data-aos-duration="800" data-aos-easing="linear"></div>
          <div className="about-hero-content" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000" data-aos-easing="linear">
            <h3>About Us</h3>
            <h1>Simplifying Student Housing Search</h1>
            <p>At Jamii Hostels, we understand the challenges students face when searching for accommodation. Our platform connects university students with quality hostels, making it easy to <NavLink to="/hostels" className="inline-link">find your ideal living space</NavLink> from the comfort of your screen.</p>
          </div>
        </section>        

        <section className="about-mission-section container">
          <div className="about-mission-container section section-bottom" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000" data-aos-easing="linear">
            <div className="about-mission-text" data-aos="fade-right" data-aos-delay="300" data-aos-duration="800" data-aos-easing="linear">
              <h3>Mission</h3>
              <h2>Our Mission</h2>
              <p>We're dedicated to transforming the way university students find accommodation. By providing a comprehensive platform that showcases detailed hostel listings, virtual tours, and seamless booking processes, we eliminate the stress and uncertainty from your housing search. <NavLink to="/role-selection" className="inline-link">Browse, compare, and secure</NavLink> your ideal student accommodation—all from your device.</p>
            </div>
          </div>
        </section>

        <section className="about-services-section section-bottom">
          <div className="about-services-container section section-bottom">
            <div className="about-services-container-title" data-aos="fade-up" data-aos-delay="100" data-aos-duration="800" data-aos-easing="linear">
              <h3>Services</h3>
              <h2>What we offer</h2>
            </div>
          
          <div className="about-services-grid container section">
            <div className="about-service-card" data-aos="flip-left" data-aos-delay="200" data-aos-duration="1000" data-aos-easing="linear">
              <div className="about-service-title">
               <IoSearch className='about-icons' data-aos="zoom-in" data-aos-delay="400" data-aos-duration="800" data-aos-easing="linear"/>
               <h3>Easy Search</h3>
              </div>
              <p>Find your perfect student accommodation effortlessly with our advanced search filters. Filter by location, price range, amenities, and distance from your university to discover the ideal hostel that matches your preferences. <NavLink to="/hostels" className="inline-link">Start searching now</NavLink>.</p>
            </div>
            <div className="about-service-card" data-aos="flip-up" data-aos-delay="300" data-aos-duration="1000" data-aos-easing="linear">
              <div className="about-service-title">
               <TbView360Number className='about-icons' data-aos="zoom-in" data-aos-delay="500" data-aos-duration="800" data-aos-easing="linear"/>
               <h3>Virtual Tours</h3>
               </div>
              <p>Experience your future home from anywhere with our immersive virtual tours. Browse through high-quality photos, 360° room views, and detailed floor plans to make informed decisions about your accommodation without physical visits. <NavLink to="/hostels" className="inline-link">Explore available hostels</NavLink>.</p>
            </div>
            <div className="about-service-card" data-aos="flip-right" data-aos-delay="400" data-aos-duration="1000" data-aos-easing="linear">
              <div className="about-service-title">
               <GrSecure className="about-icons" data-aos="zoom-in" data-aos-delay="600" data-aos-duration="800" data-aos-easing="linear"/>
               <h3>Secure & Easy Booking</h3>
              </div>
              <p>Reserve your chosen hostel with confidence through our secure booking platform. Enjoy transparent pricing, instant confirmation, and safe payment processing, making your accommodation booking process smooth and worry-free. <NavLink to="/role-selection" className="inline-link">Create an account</NavLink> to get started.</p>
            </div>
          </div>
         </div>
        </section>

        <section className="values-section container section section-bottom" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000" data-aos-easing="linear">
          <h2>Why Choose Us</h2>
          <div className="values-grid">
            <div className="value-item" data-aos="zoom-in-right" data-aos-delay="200" data-aos-duration="800" data-aos-easing="linear">
              <h3>Time-Saving</h3>
              <p>No more traveling around campus looking for accommodation. <NavLink to="/" className="inline-link">Learn more</NavLink> about how we save you time.</p>
            </div>
            <div className="value-item" data-aos="zoom-in" data-aos-delay="300" data-aos-duration="800" data-aos-easing="linear">
              <h3>Verified Listings</h3>
              <p>All hostels are verified to ensure you get exactly what you see. <NavLink to="/faqs" className="inline-link">Read our FAQs</NavLink> to learn about our verification process.</p>
            </div>
            <div className="value-item" data-aos="zoom-in-left" data-aos-delay="400" data-aos-duration="800" data-aos-easing="linear">
              <h3>Student Community</h3>
              <p>Join a community of students who share reviews and experiences. <NavLink to="/contacts" className="inline-link">Contact us</NavLink> to learn more about our student community.</p>
            </div>
          </div>
        </section>

        <div className="home-cta-section container section section-bottom" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000" data-aos-easing="linear">
          <div className="home-cta-container" data-aos="zoom-in" data-aos-delay="300" data-aos-duration="800" data-aos-easing="linear">
            <h2>Ready to find your perfect student accommodation?</h2>
            <p>Join thousands of students who have found their ideal hostel through Jamii Hostels.</p>
            <div className="cta-buttons" data-aos="fade-up" data-aos-delay="500" data-aos-duration="800" data-aos-easing="linear">
              <NavLink to="/hostels" className="cta-button" data-aos="fade-right" data-aos-delay="600" data-aos-duration="800" data-aos-easing="linear">Browse Hostels</NavLink>
              <NavLink to="/about" className="cta-button cta-secondary" data-aos="fade-left" data-aos-delay="700" data-aos-duration="800" data-aos-easing="linear">Learn More</NavLink>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
