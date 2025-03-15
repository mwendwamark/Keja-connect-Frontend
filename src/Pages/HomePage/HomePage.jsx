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
                comfortable and affordable accommodation near their
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
            </div>{" "}
          </div>
        </div>

        <div className="featured-hostels-section"></div>

        <div className="testimonial-section">
          <div className="testimonial-items">
            <Testimonials />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

// import React, { useEffect, lazy, Suspense, useState, useCallback } from "react";
// import { NavLink } from "react-router-dom";
// import "./HomePage.css";

// // Lazy load components
// const Testimonials = lazy(() => import("../../assets/Testimonial/Testimonials"));
// const Navbar = lazy(() => import("../../Components/Navbar/Navbar"));

// // Import images with dynamic import for better code splitting
// const HomePage = () => {
//   const [images, setImages] = useState({
//     landlordimg: null,
//     studentimg: null,
//     introImg: null,
//     chooseUs1: null,
//     chooseUs2: null
//   });

//   // Load images asynchronously
//   useEffect(() => {
//     const loadImages = async () => {
//       const [landlord, student, intro, choose1, choose2] = await Promise.all([
//         import("../../assets/Hero-landlord.png"),
//         import("../../assets/Hero-student.png"),
//         import("../../assets/Home-intro-img.png"),
//         import("../../assets/choose1.png"),
//         import("../../assets/choose2.png")
//       ]);

//       setImages({
//         landlordimg: landlord.default,
//         studentimg: student.default,
//         introImg: intro.default,
//         chooseUs1: choose1.default,
//         chooseUs2: choose2.default
//       });
//     };

//     loadImages();
//   }, []);

//   // ScrollReveal optimization
//   const applyScrollReveal = useCallback(() => {
//     // Only import ScrollReveal when needed
//     import('scrollreveal').then(ScrollRevealModule => {
//       const ScrollReveal = ScrollRevealModule.default;
//       const sr = ScrollReveal({
//         reset: false,
//         distance: "60px",
//         duration: 2500,
//         delay: 400,
//       });

//       const isMobile = window.innerWidth <= 1024;
      
//       // Use batch reveal for similar elements
//       sr.reveal(".hero-title", { 
//         origin: isMobile ? "bottom" : "left", 
//         duration: isMobile ? 2000 : 2500 
//       });
      
//       sr.reveal(".hero-images", { 
//         origin: isMobile ? "bottom" : "right", 
//         delay: isMobile ? 300 : 500 
//       });
      
//       sr.reveal(".intro-image", { 
//         origin: isMobile ? "bottom" : "left", 
//         delay: 300 
//       });
      
//       sr.reveal(".intro-contents", { 
//         origin: isMobile ? "bottom" : "right", 
//         delay: 500 
//       });
      
//       // Use single call with interval for similar items
//       sr.reveal(".data-item", {
//         interval: 200,
//         origin: "bottom",
//         delay: 600,
//       });
      
//       sr.reveal(".why-choose-us-students", { 
//         origin: isMobile ? "bottom" : "left", 
//         delay: 400 
//       });
      
//       sr.reveal(".why-choose-us-landlords", { 
//         origin: isMobile ? "bottom" : "right", 
//         delay: 400 
//       });
//     });
//   }, []);

//   // Optimize useEffect with IntersectionObserver
//   useEffect(() => {
//     // Only run ScrollReveal when the component is visible
//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           applyScrollReveal();
//           observer.disconnect();
//         }
//       });
//     }, { threshold: 0.1 });
    
//     observer.observe(document.querySelector('.home-page'));
    
//     // Cleanup function
//     return () => {
//       observer.disconnect();
//     };
//   }, [applyScrollReveal]);

//   // Memoize section data
//   const sectionData = [
//     { number: "8475+", label: "Students" },
//     { number: "594+", label: "Landlords" },
//     { number: "12065+", label: "Hostels" }
//   ];

//   return (
//     <>
//       <Suspense fallback={<div>Loading...</div>}>
//         <Navbar />
//       </Suspense>
      
//       <div className="home-page">
//         <div className="home-hero-section container">
//           <div className="hero-title">
//             <h3>Keja Connect</h3>
//             <h1>Streamline your hostel hunting experience</h1>
//             <p>
//               Students can find and reserve the perfect hostels, while landlords
//               list and manage their properties—all in one place.
//             </p>
//             <NavLink to="/role-selection">Get started</NavLink>
//           </div>

//           <div className="hero-images">
//             <div className="hero-image-student">
//               <div className="hero-student-contents">
//                 <p className="hero-welcome">Welcome!</p>
//                 <p className="hero-role">I am a student</p>
//                 <NavLink className="hero-register" to="/student/signup">
//                   Register
//                 </NavLink>
//               </div>
//               <div className="student-img">
//                 {images.studentimg && (
//                   <img 
//                     src={images.studentimg} 
//                     alt="student-image" 
//                     loading="lazy"
//                     width="100%"
//                     height="auto"
//                   />
//                 )}
//               </div>
//             </div>

//             <div className="hero-image-landlord">
//               <div className="hero-landlord-contents">
//                 <p className="hero-welcome">Welcome!</p>
//                 <p className="hero-role">I am a Landlord</p>
//                 <NavLink className="hero-register" to="/landlord/signup">
//                   Register
//                 </NavLink>
//               </div>
//               <div className="landlord-img">
//                 {images.landlordimg && (
//                   <img 
//                     src={images.landlordimg} 
//                     alt="landlord-image" 
//                     loading="lazy"
//                     width="100%"
//                     height="auto"
//                   />
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="home-introduction-section">
//           <div className="intro-image-contents container">
//             <div className="intro-image">
//               {images.introImg && (
//                 <img 
//                   src={images.introImg} 
//                   alt="Introduction" 
//                   loading="lazy"
//                   width="100%"
//                   height="auto"
//                 />
//               )}
//             </div>
//             <div className="intro-contents">
//               <h3>Introduction</h3>
//               <h2 className="h2-heading">
//                 Find your perfect home away from home
//               </h2>
//               <p>
//                 Keja Connect is the ultimate platform for students seeking
//                 comfortable and affordable accommodation near their
//                 universities. We bridge the gap between students and hostel
//                 owners, providing a seamless and efficient booking experience.
//               </p>
//             </div>
//           </div>
          
//           <div className="intro-section-data">
//             {sectionData.map((item, index) => (
//               <div className="data-item" key={index}>
//                 <h2 className="data-number">{item.number}</h2>
//                 <p className="data-label">{item.label}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="why-choose-us-section container section">
//           <div className="why-choose-us-title">
//             <h3>DISCOVER & GROW</h3>
//             <h2 className="h2-heading">Why choose us?</h2>
//           </div>
//           <div className="why-choose-us-students container">
//             <div className="why-choose-us-student-contents">
//               <h3>FOR STUDENTS</h3>
//               <h2>Reduce the hassle for hostel hunting</h2>
//               <p>
//                 Discover a wide range of hostels with detailed information,
//                 including location, price, amenities, and images. Easily book
//                 your preferred hostel, manage your bookings, and view your
//                 booking history. Your home away from home is just a few clicks
//                 away!
//               </p>
//             </div>
//             <div className="why-choose-us-student-image">
//               {images.chooseUs1 && (
//                 <img 
//                   src={images.chooseUs1} 
//                   alt="Why Choose Us - Students" 
//                   loading="lazy"
//                   width="100%"
//                   height="auto"
//                 />
//               )}
//             </div>
//           </div>

//           <div className="why-choose-us-landlords container">
//             <div className="why-choose-us-landlord-image">
//               {images.chooseUs2 && (
//                 <img 
//                   src={images.chooseUs2} 
//                   alt="Why Choose Us - Landlords" 
//                   loading="lazy"
//                   width="100%"
//                   height="auto"
//                 />
//               )}
//             </div>
//             <div className="why-choose-us-landlord-contents">
//               <h3>FOR LANDLORDS</h3>
//               <h2>Scale up your rental business effortlessly</h2>
//               <p>
//                 List your hostels and reach thousands of potential student
//                 tenants. Manage your listings, track bookings, and calculate
//                 your earnings effortlessly through your personalized dashboard.
//                 Keja Connect makes it simple to fill your rooms and grow your
//                 business.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="featured-hostels-section"></div>

//         <div className="testimonial-section">
//           <div className="testimonial-items">
//             <Suspense fallback={<div>Loading testimonials...</div>}>
//               <Testimonials />
//             </Suspense>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HomePage;