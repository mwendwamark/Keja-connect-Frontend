import React, { useState, useEffect } from "react";
import "./LandlordSignup.css";
import img from "../../assets/LandlordSignup.jpg";
import { FcGoogle } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LandlordSignup = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errors]);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/landlord-signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        phone_number,
        password,
        password_confirmation,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then(() => {
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhoneNumber("");
          setPassword("");
          setPasswordConfirmation("");
          setErrors([]);

          window.location.href = "/landlord-login";
        });
      } else {
        r.json().then((e) => setErrors(e.errors));
      }
    });
  }

  return (
    <>
      <div className="landlord-signup-page container">
        <div className="landlord-signup-container container">
          <div className="landlord-signup-image">
            <img src={img} alt="landlord-Sign-up-image" />
            <div className="landlord-overlay-text">
              <h1 className="h2-heading">Create a Landlord's</h1>
              <p>Join our platform to manage properties and more</p>
            </div>
          </div>

          <form
            className="landlord-signup-form"
            onSubmit={handleSubmit}
            autoComplete="on"
          >
            <div className="landlord-signup-title">
              <h1 className="h2-heading">Sign up</h1>
            </div>
            <div className="landlord-names-input">
              <div className="landlord-first-name">
                <label htmlFor="first-name">First name</label>
                <input
                  type="text"
                  id="first-name"
                  name="first_name"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="landlord-last-name">
                <label htmlFor="last-name">Last name</label>
                <input
                  type="text"
                  id="last-name"
                  name="last_name"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="landlord-email-input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="landlord-phone-number-input">
              <label htmlFor="phone-number">Phone number</label>
              <input
                type="text"
                id="phone-number"
                name="phone_number"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            <div className="landlord-password-input">
              <label htmlFor="password">Password</label>
              <div className="landlord-password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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

            <div className="landlord-password-confirmation-input">
              <label htmlFor="password-confirmation">Confirm Password</label>
              <div className="landlord-password-field">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="password-confirmation"
                  name="password_confirmation"
                  value={password_confirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="landlord-eye-icon"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div style={{ color: "red", fontSize: "14px", padding: "10px" }}>
              {errors.map((e, index) => (
                <p key={index}>{e}</p>
              ))}
            </div>
            <div className="landlord-signup-button">
              <button type="submit">Create Account</button>
            </div>
            <div className="landlord-signup-google-button">
              <FcGoogle />
              <p>Sign up with Google</p>
            </div>
            <div className="landlord-have-an-account">
              <p>
                Have an account?{" "}
                <span>
                  <NavLink to="/landlord-login">Login</NavLink>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LandlordSignup;
