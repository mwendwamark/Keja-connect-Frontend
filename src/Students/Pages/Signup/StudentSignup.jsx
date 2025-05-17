import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./StudentSignup.css"; // Reusing the same CSS as LandlordSignup
import Navbar from "../../../Components/Navbar/Navbar";
import img from "../../../assets/StudentSignup.jpg"; // You can replace this with an appropriate image
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import { API_ENDPOINTS } from "../../../config/api";

const StudentSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    const studentData = {
      student: {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        email,
        password,
      },
    };

    try {
      const response = await fetch(API_ENDPOINTS.STUDENT.SIGNUP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.token);
        navigate("/student/login"); // Redirect to student dashboard after successful signup
        toast.success("Account created successfully");
      } else {
        setError(result.status.message);
        toast.error("Couldn't create account. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>
          Student Signup | KejaConnect - Affordable Student Accommodation
        </title>
        <meta
          name="description"
          content="Sign up for KejaConnect to access affordable student accommodation near universities. Create your account and find the perfect hostel for your student life."
        />
        <meta
          name="keywords"
          content="student signup, KejaConnect, affordable accommodation, student hostel, university housing, Kenya hostels"
        />
        <link
          rel="canonical"
          href="https://kejaconnect.vercel.app/student/signup"
        />

        {/* Open Graph / Facebook Meta Tags */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://kejaconnect.vercel.app/student/signup"
        />
        <meta
          property="og:title"
          content="Student Signup | KejaConnect - Affordable Student Accommodation"
        />
        <meta
          property="og:description"
          content="Sign up for KejaConnect to access affordable student accommodation near universities. Create your account and find the perfect hostel for your student life."
        />
        {/* <meta
          property="og:image"
          content="https://kejaconnect.vercel.app/images/student-signup-og.jpg"
        /> */}

        {/* Twitter Meta Tags */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://kejaconnect.vercel.app/student/signup"
        />
        <meta
          property="twitter:title"
          content="Student Signup | KejaConnect - Affordable Student Accommodation"
        />
        <meta
          property="twitter:description"
          content="Sign up for KejaConnect to access affordable student accommodation near universities. Create your account and find the perfect hostel for your student life."
        />
        {/* <meta
          property="twitter:image"
          content="https://kejaconnect.vercel.app/images/student-signup-twitter.jpg"
        /> */}

      {/* Robots Meta Tag */}
        <meta name="robots" content="index, follow" />
      </Helmet>
      <Navbar />
      <div className="student-signup-page container">
        <div className="student-signup-container">
          <div className="student-signup-image">
            <img src={img} alt="student-sign-up-image" loading="lazy"/>
            <div className="student-overlay-text">
              <h1 className="h2-heading">Create a Student's account</h1>
              <p>
                Join our platform to find the perfect home for your student life
              </p>
            </div>
          </div>

          <div className="student-signup-form">
            <form onSubmit={handleSubmit}>
              <div className="student-signup-title">
                <h1 className="h2-heading">Sign up</h1>
              </div>
              <div className="student-names">
                <div className="student-first-name">
                  <label htmlFor="first-name">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    id="first-name"
                    name="first_name"
                  />
                </div>
                <div className="student-last-name">
                  <label htmlFor="last-name">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    id="last-name"
                    name="last_name"
                  />
                </div>
              </div>
              <div className="student-phone-number-input">
                <label htmlFor="phone-number">Phone Number</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  id="phone-number"
                  name="phone_number"
                />
              </div>
              <div className="student-email-input">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  id="email"
                  name="email"
                />
              </div>
              <div className="student-password-input">
                <label htmlFor="password">Password</label>
                <div className="student-password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    id="password"
                    name="password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="student-eye-icon"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div className="student-password-confirmation">
                <label htmlFor="password-confirmation">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  id="password-confirmation"
                  name="password_confirmation"
                />
              </div>
              <div className="errors container">
                {error && <p style={{ color: "red" }}>{error}</p>}
              </div>
              <button className="student-signup-btn" type="submit">
                Create Account
              </button>

              <div className="student-have-an-account">
                <p>
                  Have an account?{" "}
                  <span>
                    <NavLink to="/student/login">Login</NavLink>
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default StudentSignup;
