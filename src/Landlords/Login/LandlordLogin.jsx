import React, { useState, useEffect } from "react";
import "./LandlordLogin.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, NavLink } from "react-router-dom";
import img from "../../assets/landlordlogin.png";
import Navbar from "../../Components/Navbar/Navbar";

function LandlordLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]); // Clear the error messages after 5 seconds
      }, 5000);

      return () => clearTimeout(timer); // Cleanup the timer if the component unmounts or re-renders
    }
  }, [errors]);

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:3000/landlord-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/landlord-dashboard");
        });
      } else {
        r.json().then((e) => setErrors([e.error])); // Make the error messages to be an array
      }
    });
  }

  return (
    <>
      <Navbar />
      <div className="landlord-login-page container">
        <div className="landlord-login-container container">
          <div className="landlord-login-image">
            <img src={img} alt="landlord" />
          </div>

          <form className="landlord-login-form" onSubmit={handleSubmit}>
            <div className="landlord-login-form-title">
              <h1 className="h2-heading">Welcome back!</h1>
              <p>Login</p>
            </div>
            <div className="landlord-login-input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="landlord-login-password">
              <label htmlFor="password">Password</label>
              <div className="landlord-login-password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="landlord-login-eye-icon"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="landlord-forgot-pass">
              <NavLink to="/forgot-password">Forgot password?</NavLink>
            </div>

            <div className="error-messages">
              {errors.map((error, index) => (
                <p key={index} style={{ color: "red" }}>
                  {error}
                </p>
              ))}
            </div>

            <button type="submit" className="landlord-login-btn">
              Login
            </button>
            <div className="landlord-dont-have-account">
              <p>
                Don't have an account?
                <NavLink to="/landlord-signup">Signup</NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LandlordLogin;
