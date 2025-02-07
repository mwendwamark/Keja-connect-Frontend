import React from "react";
import "./AmenitiesInfo.css";
import {
  IoWifiOutline,
  IoWaterOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { FaParking, FaSwimmingPool, FaBath, FaDoorOpen } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { MdKitchen, MdSmokeFree, MdShower } from "react-icons/md";
import { RiFirstAidKitLine, RiHotelBedFill } from "react-icons/ri";
import { BiCctv } from "react-icons/bi";
import { PiPottedPlant } from "react-icons/pi";

const AmenitiesInfo = ({ hostelData, handleChange }) => {
  const amenities = [
    { name: "wifi", icon: <IoWifiOutline />, label: "Wi-Fi" },
    { name: "parking", icon: <FaParking />, label: "Parking" },
    { name: "security", icon: <IoShieldCheckmarkOutline />, label: "Security" },
    { name: "kitchen", icon: <MdKitchen />, label: "Kitchen" },
    {
      name: "water_supply",
      icon: <IoWaterOutline />,
      label: "Good Water Supply",
    },
    { name: "swimming_pool", icon: <FaSwimmingPool />, label: "Swimming Pool" },
    { name: "gym", icon: <CgGym />, label: "Gym" },
    { name: "bathroom", icon: <FaBath />, label: "Bathroom" },
    { name: "wardrobe", icon: <FaDoorOpen />, label: "Wardrobe" },
    { name: "garden", icon: <PiPottedPlant />, label: "Garden" },
    { name: "smoke_alarm", icon: <MdSmokeFree />, label: "Smoke Alarm" },
    {
      name: "first_aid_kit",
      icon: <RiFirstAidKitLine />,
      label: "First Aid Kit",
    },
    { name: "hot_shower", icon: <MdShower />, label: "Hot Shower" },
    { name: "cctv_cameras", icon: <BiCctv />, label: "CCTV Cameras" },
    {
      name: "laundry_services",
      icon: <RiHotelBedFill />,
      label: "Laundry Services",
    },
  ];

  return (
    <div className="step-container container">
      <div className="step-container-header">
        <h2>What amenities does your hostel offer?</h2>
        <p>Choose the available amenities present in your property by clicking on the amenity</p>
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

export default AmenitiesInfo;
