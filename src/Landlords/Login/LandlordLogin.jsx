import React from "react";
import "./LandlordLogin.css";
import { loginLandlord } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const LandlordLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginLandlord(formData);
      localStorage.setItem("user", JSON.stringify(response));
      navigate("/landlord-dashboard"); // Redirect to landlord dashboard
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="login-page">
        <div className="login-container">
          <div className="login-image">
            <img src="" alt="" />
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-email-input">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" />
            </div>
            <div className="password-email-input">
              <label htmlFor="password">Email</label>
              <input type="password" id="password" />
            </div>
            <div className="login-btn">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LandlordLogin;
