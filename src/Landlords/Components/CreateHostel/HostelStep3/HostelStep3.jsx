import React from "react";
import "./HostelStep3.css";
import { FaParking, FaBath, FaDoorOpen } from "react-icons/fa";
import { MdKitchen, MdBalcony } from "react-icons/md";
import { PiPottedPlant, PiToiletDuotone } from "react-icons/pi";
import { GiDesk } from "react-icons/gi";

const HostelStep3 = ({ hostelData, handleChange }) => {
  const amenities = [
    { name: "parking", icon: <FaParking />, label: "Parking" },
    { name: "kitchen", icon: <MdKitchen />, label: "Kitchen" },
    { name: "bathroom", icon: <FaBath />, label: "Bathroom" },
    { name: "wardrobe", icon: <FaDoorOpen />, label: "Wardrobe" },
    { name: "garden", icon: <PiPottedPlant />, label: "Garden" },
    { name: "toilet", icon: <PiToiletDuotone />, label: "Toilet" },
    { name: "study_room", icon: <GiDesk />, label: "Study Room" },
    { name: "balcony", icon: <MdBalcony />, label: "Balcony" },
  ];

  return (
    <div className="step-container container">
      <div className="step-container-header">
        <h2>What amenities does your hostel offer?</h2>
        <p>
          Choose the available amenities present in your property by clicking on
          the amenity
        </p>
      </div>
      <div className="amenities-form-grid">
        {amenities.map(({ name, icon, label }) => (
          <div className="checkbox-group" key={name}>
            <label>
              <input
                type="checkbox"
                name={name}
                checked={hostelData[name]}
                onChange={handleChange}
                className="hidden-checkbox"
              />
              <div className="custom-checkbox">
                {icon}
                <span>{label}</span>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostelStep3;
