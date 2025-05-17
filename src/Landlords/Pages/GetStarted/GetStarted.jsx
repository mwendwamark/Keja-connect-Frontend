import React, { useEffect } from "react";
import LandlordNavbar from "../../Components/LandlordNavbar/LandlordNavbar";
import { NavLink } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
import "./GetStarted.css";
import ScrollReveal from "scrollreveal";

const GetStarted = () => {
  useEffect(() => {
    const sr = ScrollReveal({
      reset: false,
      distance: "50px",
      duration: 1000,
      delay: 200,
      easing: "ease-in-out",
    });

    sr.reveal(".get-started-top", {
      origin: "top",
      duration: 1200,
    });

    const contentContainers = document.querySelectorAll(".content-container");
    contentContainers.forEach((container, index) => {
      sr.reveal(container, {
        origin: index % 2 === 0 ? "left" : "right", 
        duration: 2000,
        delay: index * 200, 
      });
    });

    sr.reveal(".get-started-bottom", {
      origin: "bottom",
      duration: 1200,
      delay: 300,
    });
  }, []);

  return (
    <>
      <LandlordNavbar />
      <div className="get-started container">
        <div className="get-started-top">
          <div className="left-side">
            <h1>It is easy to get started with Keja Connect</h1>
          </div>
          <div className="right-side">
            {[
              {
                title: "1. Tell us about your place",
                description:
                  "Share some basic information like where your place is and how many students it can accommodate",
                imgSrc:
                  "https://a0.muscache.com/4ea/air/v2/pictures/da2e1a40-a92b-449e-8575-d8208cc5d409.jpg",
              },
              {
                title: "2. Make it stand out",
                description:
                  "Add 5 or more photos of your property plus a brief description",
                imgSrc:
                  "https://a0.muscache.com/4ea/air/v2/pictures/bfc0bc89-58cb-4525-a26e-7b23b750ee00.jpg",
              },
              {
                title: "3. Finish up and publish",
                description: "Choose your price then publish your listing",
                imgSrc:
                  "https://a0.muscache.com/4ea/air/v2/pictures/c0634c73-9109-4710-8968-3e927df1191c.jpg",
              },
            ].map((content, index) => (
              <div key={index} className="content-container">
                <div className="contents">
                  <h3>{content.title}</h3>
                  <p>{content.description}</p>
                </div>
                <div className="contents-image">
                  <img src={content.imgSrc} alt="content illustration" loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="get-started-bottom">
          <NavLink className="get-started-btn" to="/create-hostel">
            Get Started
            <BsArrowRightShort className="arrow-icon" />
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default GetStarted;