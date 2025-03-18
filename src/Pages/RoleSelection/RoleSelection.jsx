import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import landlordImg from "../../assets/role-landlord.png"; // Your image path
import studentImg from "../../assets/role-student.png"; // Your image path
import "./RoleSelection.css";
import Navbar from "../../Components/Navbar/Navbar";

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole === "landlord") {
      navigate("/landlord/signup");
    } else if (selectedRole === "student") {
      navigate("/student/signup");
    } else {
      toast.error("Please select a role before continuing.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="role-selection-page container section">
        <div className="role-selection__container">
        <h3>What brings you here?</h3>
        <h2 className="h2-heading">
          Join Jamii Hostels today by creating an account
        </h2>
        <div className="role-selection-container">
          <div
            className={`role-card ${
              selectedRole === "landlord" ? "selected-landlord" : ""
            }`}
            onClick={() => handleRoleSelection("landlord")}
          >
            <h4>Landlord</h4>
            <img src={landlordImg} alt="Landlord" loading="lazy"/>
          </div>
          <div
            className={`role-card ${
              selectedRole === "student" ? "selected-student" : ""
            }`}
            onClick={() => handleRoleSelection("student")}
          >
            <h4>Student</h4>
            <img src={studentImg} alt="Student" loading="lazy" />
          </div>
        </div>
        <p>Select your role above</p>
        <button className="continue-btn" onClick={handleContinue}>
          Continue to Signup
        </button>
        <ToastContainer />
      </div>
    </div>
    </>
  );
};

export default RoleSelection;
