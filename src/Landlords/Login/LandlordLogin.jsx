// import React, { useState, useEffect } from "react";
// import "./LandlordLogin.css";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// function LandlordLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState([]);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//    function handleSubmit(e) {
//      e.preventDefault();

//      fetch("http://localhost:3000/landlord-login", {
//        method: "POST",
//        headers: { "Content-Type": "application/json" },
//        body: JSON.stringify({ email, password }),
//      }).then((r) => {
//        if (r.ok) {
//          r.json().then((user) => {
//            localStorage.setItem("user", JSON.stringify(user));
//            navigate("/landlord-dashboard");
//          });
//        } else {
//          r.json().then((e) => setErrors([e.error]));
//        }
//      });
//    }

//   return (
//     <div className="landlord-login-page">
//       <div className="landlord-login-container">
//         <h1 className="login-heading">Landlord Login</h1>
//         <form className="landlord-login-form" onSubmit={handleSubmit}>
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
// }

// export default LandlordLogin;

import React, { useState, useEffect } from "react";
import "./LandlordLogin.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
        r.json().then((e) => setErrors([e.error])); // Assuming error is a string
      }
    });
  }

  return (
    <div className="landlord-login-page">
      <div className="landlord-login-container">
        <h1 className="login-heading">Landlord Login</h1>
        <form className="landlord-login-form" onSubmit={handleSubmit}>
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
}

export default LandlordLogin;

