import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./LandlordSignup.css";
import Navbar from "../../Components/Navbar/Navbar";
import img from "../../assets/LandlordSignup.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

const LandlordSignup = () => {
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

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    const landlordData = {
      landlord: {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        email,
        password,
      },
    };

    try {
      const response = await fetch("http://localhost:3000/landlord/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(landlordData),
      });

      const result = await response.json();
      console.log(result); // Debug: check what you're receiving

      if (response.ok) {
        // Adjusted according to the response structure from your backend
        localStorage.setItem("token", result.status.token);
        localStorage.setItem("landlord_id", result.status.data.id); // Store the landlord ID
        toast.success("Account created successfully");
        navigate("/landlord/login");
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
        <title>Landlord Signup | KejaConnect - Manage Your Properties</title>
        <meta
          name="description"
          content="Sign up for KejaConnect as a landlord to manage your properties and connect with students. Create your account and streamline your rental business."
        />
        <meta
          name="keywords"
          content="landlord signup, KejaConnect, property management, student accommodation, Kenya hostels, landlord dashboard"
        />
        <link
          rel="canonical"
          href="https://kejaconnect.vercel.app/landlord/signup"
        />

        {/* Open Graph / Facebook Meta Tags */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://kejaconnect.vercel.app/landlord/signup"
        />
        <meta
          property="og:title"
          content="Landlord Signup | KejaConnect - Manage Your Properties"
        />
        <meta
          property="og:description"
          content="Sign up for KejaConnect as a landlord to manage your properties and connect with students. Create your account and streamline your rental business."
        />
        {/* <meta
          property="og:image"
          content="https://kejaconnect.vercel.app/images/landlord-signup-og.jpg"
        /> */}

        {/* Twitter Meta Tags */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://kejaconnect.vercel.app/landlord/signup"
        />
        <meta
          property="twitter:title"
          content="Landlord Signup | KejaConnect - Manage Your Properties"
        />
        <meta
          property="twitter:description"
          content="Sign up for KejaConnect as a landlord to manage your properties and connect with students. Create your account and streamline your rental business."
        />
        {/* <meta
          property="twitter:image"
          content="https://kejaconnect.vercel.app/images/landlord-signup-twitter.jpg"
        />        */}
        {/* Robots Meta Tag */}
        <meta name="robots" content="index, follow" />
      </Helmet>{" "}
      <Navbar />
      <div className="landlord-signup-page container">
        <div className="landlord-signup-container">
          <div className="landlord-signup-image">
            <img src={img} alt="landlord-Sign-up-image" />
            <div className="landlord-overlay-text">
              <h1 className="h2-heading">Create a Landlord's account</h1>
              <p>Join our platform to manage properties and more</p>
            </div>
          </div>

          <div className="landlord-signup-form">
            <form onSubmit={handleSubmit}>
              <div className="landlord-signup-title">
                <h1 className="h2-heading">Sign up</h1>
              </div>
              <div className="landlord-names">
                <div className="landlord-first-name">
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
                <div className="landlord-last-name">
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
              <div className="landlord-phone-number-input">
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
              <div className="landlord-email-input">
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
              <div className="landlord-password-input">
                <label htmlFor="password">Password</label>
                <div className="landlord-password-field">
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
                    className="landlord-eye-icon"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div className="landlord-password-confirmation">
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
              <button className="landlord-signup-btn" type="submit">
                Create Account
              </button>
              <div className="landlord-have-an-account">
                <p>
                  Have an account?{" "}
                  <span>
                    <NavLink to="/landlord/login">Login</NavLink>
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

export default LandlordSignup;
