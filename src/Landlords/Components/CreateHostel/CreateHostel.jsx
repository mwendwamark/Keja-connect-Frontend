import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
// import LandlordNavbar from "../LandlordNavbar/LandlordNavbar";
import "./CreateHostel.css"; // Import the new CSS file
import LandlordNavbar from "../../LandlordNavbar/LandlordNavbar";

const CreateHostel = () => {
  const [hostelData, setHostelData] = useState({
    name: "",
    location: "",
    price_per_month: "",
    room_type: "",
    bedrooms: "",
    toilet: false,
    kitchen: false,
    study_room: false,
    wifi: false,
    bathroom: false,
    wardrobe: false,
    laundry_services: false,
    balcony: false,
    garden: false,
    swimming_pool: false,
    gym: false,
    available_units: "",
    parking: false,
    tokens: false,
    cctv_cameras: false,
    hot_shower: false,
    air_conditioner: false,
    smoke_alarm: false,
    first_aid_kit: false,
    water_supply: "",
    security: "",
  });

  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const landlordId = localStorage.getItem("landlord_id");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setHostelData({
      ...hostelData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(hostelData).forEach((key) => {
      formData.append(`hostel[${key}]`, hostelData[key]);
    });

    Array.from(images).forEach((image) => {
      formData.append("hostel[images][]", image);
    });

    formData.append("hostel[landlord_id]", landlordId);

    try {
      const response = await axios.post(
        "http://localhost:3000/hostels",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Hostel created:", response.data);
      setImageUrls(response.data.image_urls);
      toast.success("Hostel created successfully!");
    } catch (error) {
      console.error("Error creating hostel:", error);
      toast.error("Failed to create hostel. Please try again.");
    }
  };

  return (
    <>
      <LandlordNavbar/>
      <ToastContainer />
      <div className="create-hostel-form">
        <h1>Host Your Home</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Text and Number Inputs */}
            <div className="form-group">
              <label>Hostel Name</label>
              <input
                type="text"
                name="name"
                value={hostelData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={hostelData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Price per Month</label>
              <input
                type="number"
                name="price_per_month"
                value={hostelData.price_per_month}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Room Type</label>
              <input
                type="text"
                name="room_type"
                value={hostelData.room_type}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={hostelData.bedrooms}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Available Units</label>
              <input
                type="number"
                name="available_units"
                value={hostelData.available_units}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Water Supply</label>
              <input
                type="text"
                name="water_supply"
                value={hostelData.water_supply}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Security</label>
              <input
                type="text"
                name="security"
                value={hostelData.security}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Checkbox Inputs */}
          <div className="form-grid">
            {[
              "toilet",
              "kitchen",
              "study_room",
              "wifi",
              "bathroom",
              "wardrobe",
              "laundry_services",
              "balcony",
              "garden",
              "swimming_pool",
              "gym",
              "parking",
              "tokens",
              "cctv_cameras",
              "hot_shower",
              "air_conditioner",
              "smoke_alarm",
              "first_aid_kit",
            ].map((amenity) => (
              <div className="checkbox-group" key={amenity}>
                <input
                  type="checkbox"
                  name={amenity}
                  checked={hostelData[amenity]}
                  onChange={handleChange}
                />
                <label>{amenity.replace(/_/g, " ")}</label>
              </div>
            ))}
          </div>

          {/* Image Upload */}
          <div className="form-group">
            <label>Images</label>
            <input
              type="file"
              name="images"
              multiple
              onChange={handleImageChange}
            />
            <div className="image-preview">
              {imageUrls.map((url, index) => (
                <img key={index} src={url} alt={`Hostel ${index + 1}`} />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-button">
            Create Hostel
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateHostel;