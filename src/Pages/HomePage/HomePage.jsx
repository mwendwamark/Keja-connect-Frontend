import React, { useEffect } from "react";
import "./HomePage.css";
import Navbar from "../../Components/Navbar/Navbar";
import Hero from "./Hero/Hero";
import Intro from "./Intro.jsx/Intro";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";
import Testimonials from "./Testimonial/Testimonials";
import CTA from "./CTA/CTA";

import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../../Components/Footer/Footer";

const HomePage = () => {
  useEffect(() => {
    // Initialize AOS with custom settings
    AOS.init({
      duration: 1200,
      easing: "ease-out-cubic",
      once: true,
      mirror: false,
      disable: "mobile",
    });

    // Add resize event listener to refresh AOS on window resize
    const handleResize = () => {
      AOS.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <Navbar />
      <div className="homepage-wrapper">
        <Hero />
        <Intro />
        <WhyChooseUs />
        <Testimonials />
        <CTA />
      </div>
      <Footer/>
    </>
  );
};

export default HomePage;
