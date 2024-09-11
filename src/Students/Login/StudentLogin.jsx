// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./StudentLogin.css";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const StudentLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState([]);
//   const navigate = useNavigate();

//   function handleSubmit(e) {
//     e.preventDefault();

//     fetch("http://localhost:3000/student-login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     }).then((r) => {
//       if (r.ok) {
//         r.json().then((user) => {
//           localStorage.setItem("user", JSON.stringify(user));
//           navigate("/hostels");
//         });
//       } else {
//         r.json().then((e) => setErrors([e.error])); // Update here
//       }
//     });
//   }

//   return (
//     <div className="student-login-page">
//       <div className="student-login-container">
//         <h1 className="login-heading">Student Login</h1>
//         <form className="student-login-form" onSubmit={handleSubmit}>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <label htmlFor="password">Password</label>
//           <div className="password-field">
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="eye-icon"
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </button>
//           </div>

//           <div className="error-messages">
//             {errors.map((error, index) => (
//               <p key={index} style={{ color: "red" }}>
//                 {error}
//               </p>
//             ))}
//           </div>

//           <button type="submit" className="login-btn">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default StudentLogin;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentLogin.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
        r.json().then((e) => setErrors([e.error])); // Assuming error is a string
      }
    });
  }

  return (
    <div className="student-login-page">
      <div className="student-login-container">
        <h1 className="login-heading">Student Login</h1>
        <form className="student-login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <div className="password-field">
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
              className="eye-icon"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="error-messages">
            {errors.map((error, index) => (
              <p key={index} style={{ color: "red" }}>
                {error}
              </p>
            ))}
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;

