import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import LandlordNavbar from "../LandlordNavbar/LandlordNavbar";

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
  const [imageUrls, setImageUrls] = useState([]); // New state for storing image URLs
  const landlordId = localStorage.getItem("landlord_id"); // Get the landlord ID from localStorage or wherever it's stored.

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

    // Append each image file
    Array.from(images).forEach((image) => {
      formData.append("hostel[images][]", image);
    });

    // Append the landlord ID
    formData.append("hostel[landlord_id]", landlordId);

    try {
      const response = await axios.post(
        "http://localhost:3000/hostels",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          // withCredentials: true,
        }
      );
      console.log("Hostel created:", response.data);
      setImageUrls(response.data.image_urls); // Update image URLs from backend response
      toast.success("Hostel created");
    } catch (error) {
      console.error("Error creating hostel:", error);
      toast.error("Hostel not created");
    }
  };

  return (
    <>
      <LandlordNavbar />
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div>
          {/* Display uploaded images */}
          {imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Hostel ${index + 1}`}
              style={{ width: "100px", height: "100px", margin: "5px" }}
            />
          ))}
        </div>

        <div>
          <label>Hostel Name</label>
          <input
            type="text"
            name="name"
            value={hostelData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={hostelData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Price per Month</label>
          <input
            type="number"
            name="price_per_month"
            value={hostelData.price_per_month}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Room Type</label>
          <input
            type="text"
            name="room_type"
            value={hostelData.room_type}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Bedrooms</label>
          <input
            type="number"
            name="bedrooms"
            value={hostelData.bedrooms}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Toilet</label>
          <input
            type="checkbox"
            name="toilet"
            checked={hostelData.toilet}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Kitchen</label>
          <input
            type="checkbox"
            name="kitchen"
            checked={hostelData.kitchen}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Study Room</label>
          <input
            type="checkbox"
            name="study_room"
            checked={hostelData.study_room}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>WiFi</label>
          <input
            type="checkbox"
            name="wifi"
            checked={hostelData.wifi}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Bathroom</label>
          <input
            type="checkbox"
            name="bathroom"
            checked={hostelData.bathroom}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Wardrobe</label>
          <input
            type="checkbox"
            name="wardrobe"
            checked={hostelData.wardrobe}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Laundry Services</label>
          <input
            type="checkbox"
            name="laundry_services"
            checked={hostelData.laundry_services}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Balcony</label>
          <input
            type="checkbox"
            name="balcony"
            checked={hostelData.balcony}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Garden</label>
          <input
            type="checkbox"
            name="garden"
            checked={hostelData.garden}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Swimming Pool</label>
          <input
            type="checkbox"
            name="swimming_pool"
            checked={hostelData.swimming_pool}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Gym</label>
          <input
            type="checkbox"
            name="gym"
            checked={hostelData.gym}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Available Units</label>
          <input
            type="number"
            name="available_units"
            value={hostelData.available_units}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Parking</label>
          <input
            type="checkbox"
            name="parking"
            checked={hostelData.parking}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Tokens</label>
          <input
            type="checkbox"
            name="tokens"
            checked={hostelData.tokens}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>CCTV Cameras</label>
          <input
            type="checkbox"
            name="cctv_cameras"
            checked={hostelData.cctv_cameras}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Hot Shower</label>
          <input
            type="checkbox"
            name="hot_shower"
            checked={hostelData.hot_shower}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Air Conditioner</label>
          <input
            type="checkbox"
            name="air_conditioner"
            checked={hostelData.air_conditioner}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Smoke Alarm</label>
          <input
            type="checkbox"
            name="smoke_alarm"
            checked={hostelData.smoke_alarm}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>First Aid Kit</label>
          <input
            type="checkbox"
            name="first_aid_kit"
            checked={hostelData.first_aid_kit}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Water Supply</label>
          <input
            type="text"
            name="water_supply"
            value={hostelData.water_supply}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Security</label>
          <input
            type="text"
            name="security"
            value={hostelData.security}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Images</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleImageChange}
          />
        </div>

        <button type="submit">Create Hostel</button>
      </form>
    </>
  );
};

export default CreateHostel;
