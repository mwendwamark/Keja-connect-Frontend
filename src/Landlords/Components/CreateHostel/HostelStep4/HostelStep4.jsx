import React from "react";
import "./HostelStep4.css";
import { IoWifiOutline } from "react-icons/io5";
import {  FaDog, FaSwimmingPool } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import {  MdSmokeFree, MdShower } from "react-icons/md";
import { RiFirstAidKitLine, RiHotelBedFill } from "react-icons/ri";
import { BiCctv } from "react-icons/bi";
import { TbAirConditioning } from "react-icons/tb";

const HostelStep4 = ({ hostelData, handleChange }) => {
  const amenities = [
    { name: "wifi", icon: <IoWifiOutline />, label: "Wi-Fi" },
    { name: "swimming_pool", icon: <FaSwimmingPool />, label: "Swimming Pool" },
    { name: "gym", icon: <CgGym />, label: "Gym" },

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
    { name: "pet_friendly", icon: <FaDog />, label: "Pets Allowed" },
    {
      name: "air_conditioner",
      icon: <TbAirConditioning />,
      label: "Air Conditioner",
    },
  ];

  return (
    <div className="step-container container">
      <div className="step-container-header">
        <h2>Any standout amenities</h2>
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

export default HostelStep4;
