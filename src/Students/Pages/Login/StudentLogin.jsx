import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, NavLink } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./StudentLogin.css";
import Navbar from "../../../Components/Navbar/Navbar";
import img from "../../../assets/studentlogin.jpg";
import { API_ENDPOINTS } from "../../../config/api";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setError(null); // Clear the error after 8 seconds
      }, 8000);

      return () => clearTimeout(timeoutId); // Cleanup on component unmount or error change
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentData = {
      student: {
        email,
        password,
      },
    };

    try {
      const response = await fetch(API_ENDPOINTS.STUDENT.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      const result = await response.json();

      if (response.ok) {
        // Store token and user data
        const userData = { ...result.data.student, role: result.data.student.role || "student" };
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(userData)); // Save user data in localStorage
        toast.success("Logged in successfully!");
        // Redirect to Hostels page
        navigate("/hostels");
      } else {
        setError(result.status.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Helmet>
        <title>
          Student Login | KejaConnect - Affordable Student Accommodation
        </title>
        <meta
          name="description"
          content="Log in to KejaConnect to access affordable student accommodation near universities. Manage your bookings and find the perfect hostel."
        />
        <meta
          name="keywords"
          content="student login, KejaConnect, affordable accommodation, student hostel, university housing, Kenya hostels"
        />
        <link
          rel="canonical"
          href="https://kejaconnect.vercel.app/student/login"
        />

        {/* Open Graph / Facebook Meta Tags */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://kejaconnect.vercel.app/student/login"
        />
        <meta
          property="og:title"
          content="Student Login | KejaConnect - Affordable Student Accommodation"
        />
        <meta
          property="og:description"
          content="Log in to KejaConnect to access affordable student accommodation near universities. Manage your bookings and find the perfect hostel."
        />
        {/* <meta
          property="og:image"
          content="https://kejaconnect.vercel.app/images/student-login-og.jpg"
        /> */}

        {/* Twitter Meta Tags */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://kejaconnect.vercel.app/student/login"
        />
        <meta
          property="twitter:title"
          content="Student Login | KejaConnect - Affordable Student Accommodation"
        />
        <meta
          property="twitter:description"
          content="Log in to KejaConnect to access affordable student accommodation near universities. Manage your bookings and find the perfect hostel."
        />
        {/* <meta
          property="twitter:image"
          content="https://kejaconnect.vercel.app/images/student-login-twitter.jpg"
        /> */}

        {/* Robots Meta Tag */}
        <meta name="robots" content="index, follow" />
      </Helmet>
      <Navbar />
      <div className="student-login-page container">
        <div className="student-login-container">
          <div className="student-login-image">
            <img src={img} alt="student-login-image" loading="lazy"/>
            <div className="student-login-overlay-text">
              <h1 className="h2-heading">Welcome back!</h1>
              <p>Join our platform to manage properties and more</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="student-login-form">
            <div className="student-login-title">
              <h1 className="h2-heading">Login</h1>
            </div>
            <div className="student-login-email-input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                id="email"
                name="email"
              />
            </div>
            <div className="student-login-password-input">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                id="password"
                name="password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="student-login-eye-icon"
              >
                {" "}
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="student-forgot-password">
              <p>
                <NavLink to="/student/forgot-password">Forgot Password?</NavLink>
              </p>
            </div>
            <div className="errors container ">
              {error && (
                <p style={{ color: "red", padding: "0px 30px" }}>{error}</p>
              )}
            </div>
            <button className="student-login-btn" type="submit">
              Login
            </button>

            <div className="student-dont-have-an-account">
              <p>
                Don't have an account?{" "}
                <span>
                  <NavLink to="/student/signup">Signup</NavLink>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default StudentLogin;
