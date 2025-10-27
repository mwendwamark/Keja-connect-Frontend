import React ,{useEffect}from "react";
import { Helmet } from "react-helmet";
import "./About.css";
import Navbar from "../../Components/Navbar/Navbar";
import ImageCarousel from "../../Components/ImageCarousel/ImageCarousel";
import Footer from "../../Components/Footer/Footer";
import AboutHero from "./Hero/AboutHero";
import MissionAnsVission from "./MissionAndVission/MissionAnsVission";
import CTA from "../HomePage/CTA/CTA"
import AOS from "aos";
import Services from "./Services/Services";
const About = () => {
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
      <Helmet>
        <title>About - Jamii Hostels | Student Housing Made Simple</title>
        <meta
          name="description"
          content="Learn about Jamii Hostels' mission to simplify student accommodation search. We connect university students with quality housing solutions near their campus."
        />
        <meta
          name="keywords"
          content="Jamii Hostels, student accommodation, university housing, hostel finder"
        />
      </Helmet>

      <AboutHero />
      <MissionAnsVission />
      <Services/>
      <CTA/>
      <Footer />
    </>
  );
};

export default About;
