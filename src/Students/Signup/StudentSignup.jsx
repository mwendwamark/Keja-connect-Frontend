import React, { useState, useEffect } from "react";
import "./StudentSignup.css";
import img from "../../assets/StudentSignup.jpg";
import { FcGoogle } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "../../Components/Navbar/Navbar";

const StudentSignup = () => {
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
    fetch("http://localhost:3000/student-signup", {
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

          window.location.href = "/student-login";
        });
      } else {
        r.json().then((e) => setErrors(e.errors));
      }
    });
  }

  return (
    <>
      <Navbar />
      <div className="signup-page container">
        <div className="signup-container container">
          <div className="signup-image">
            <img src={img} alt="Sign-up-image" />
            <div className="overlay-text">
              <h1 className="h2-heading">Create an account</h1>
              <p>Join Jamii Hostels to forget the hostel hunting hassle</p>
            </div>
          </div>

          <form
            className="signup-form"
            onSubmit={handleSubmit}
            autoComplete="on"
          >
            <div className="signup-title">
              <h1 className="h2-heading">Sign up</h1>
            </div>
            <div className="names-input">
              <div className="first-name">
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
              <div className="last-name">
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
            <div className="email-input">
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
            <div className="phone-number-input">
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

            <div className="password-input">
              <label htmlFor="password">Password</label>
              <div className="password-field">
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
                  className="eye-icon"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="password-confirmation-input">
              <label htmlFor="password-confirmation">Confirm Password</label>
              <div className="password-field">
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
                  className="eye-icon"
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
            <div className="signup-button">
              <button type="submit">Create Account</button>
            </div>
            <div className="signup-google-button">
              <FcGoogle />
              <p>Sign up with Google</p>
            </div>
            <div className="have-an-account">
              <p>
                Have an account?{" "}
                <span>
                  <NavLink to="/student-login">Login</NavLink>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default StudentSignup;
