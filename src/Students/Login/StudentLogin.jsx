import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./StudentLogin.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import img from "../../assets/studentlogin.jpg";
import Navbar from "../../Components/Navbar/Navbar";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000); // Clear the error messages after 5 seconds

      return () => clearTimeout(timer); // Cleanup on component unmount or re-render
    }
  }, [errors]);

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:3000/student-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/hostels");
        });
      } else {
        r.json().then((e) => setErrors([e.error])); //make the error messages to be an array
      }
    });
  }

  return (
    <>
    <Navbar/>
      <div className="student-login-page container">
        <div className="student-login-container container">
          <div className="student-login-image">
            <img src={img} alt="student" />
          </div>
          <form className="student-login-form" onSubmit={handleSubmit}>
            <div className="student-login-form-title">
              <h1 className="h2-heading">Welcome back!</h1>
              <p>Login</p>
            </div>
            <div className="student-login-input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="student-login-password">
              <label htmlFor="password">Password</label>
              <div className="student-login-password-field">
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
                  className="student-login-eye-icon"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="student-forgot-pass">
              <NavLink to="/forgot-password">Forgot password?</NavLink>
            </div>

            <div className="error-messages">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>

            <button type="submit" className="student-login-btn">
              Login
            </button>

            <div className="student-dont-have-account">
              <p>
                Don't have an account?
                <NavLink to="/student-signup">Signup</NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default StudentLogin;
