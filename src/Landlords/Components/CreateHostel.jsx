import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const CreateHostel = () => {
  const [hostelData, setHostelData] = useState({
    hostel_name: "",
    location: "",
    price_per_month: "",
    hostel_type: "",
    toilet: false,
    kitchen: false,
    wifi: false,
    description: "",
  });
  const [images, setImages] = useState([]);

  // Handle change for hostel details
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setHostelData({
      ...hostelData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData to handle file upload
    const formData = new FormData();
    // Append hostel data
    Object.keys(hostelData).forEach((key) => {
      formData.append(key, hostelData[key]);
    });

    // Append each image file
    Array.from(images).forEach((image) => {
      formData.append("images[]", image);
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/hostels",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log("Hostel created:", response.data);
      toast.success("Hostel created");
    } catch (error) {
      console.error("Error creating hostel:", error);
      toast.error("Hostel not created");
    }
  };

  return (
    <>
    <ToastContainer/>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Hostel Name</label>
          <input
            type="text"
            name="hostel_name"
            value={hostelData.hostel_name}
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
          <label>Hostel Type</label>
          <input
            type="text"
            name="hostel_type"
            value={hostelData.hostel_type}
            onChange={handleChange}
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
          <label>WiFi</label>
          <input
            type="checkbox"
            name="wifi"
            checked={hostelData.wifi}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={hostelData.description}
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
