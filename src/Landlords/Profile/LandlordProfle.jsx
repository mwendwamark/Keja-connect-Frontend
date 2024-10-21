import React from "react";
import { useNavigate } from "react-router-dom";

const LandlordProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/landlord/login");
  };

  if (!user) {
    navigate("/landlord/login");
    return null;
  }

  return (
    <div className="profile-page">
      <h1>Landlord Profile</h1>
      <p>
        <strong>First Name:</strong> {user.first_name}
      </p>
      <p>
        <strong>Last Name:</strong> {user.last_name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone Number:</strong> {user.phone_number}
      </p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LandlordProfile;
