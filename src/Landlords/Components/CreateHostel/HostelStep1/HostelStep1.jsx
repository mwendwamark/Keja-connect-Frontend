import React, { useEffect, useState } from "react";
import "./HostelStep1.css";
import axios from "axios";

const HostelStep1 = ({ hostelData, handleChange }) => {
const [universities, setUniversities] = useState([]); // State to store universities
const [loading, setLoading] = useState(false); // State to handle loading

// Fetch universities from the backend
useEffect(() => {
  const fetchUniversities = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/universities"); // Adjust the endpoint as needed
      setUniversities(response.data);
    } catch (error) {
      console.error("Error fetching universities:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchUniversities();
}, []);
  return (
    <div className="hostel-form">
      <div className="hostel-form__header">
        <h2>Tell us about your hostel</h2>
        <p>Please fill out all the information.</p>
      </div>
      <div className="hostel-form__fields">

        <div className="hostel-form__field">
          <label>Hostel Name</label>
          <input
            type="text"
            name="name"
            value={hostelData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Location */}
        {/* location */}
        <div className="hostel-form__field">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={hostelData.location}
            onChange={handleChange}
            required
          />
        </div>

        {/* University Dropdown */}
        <div className="hostel-form__field">
          <label>Nearest University</label>
          <select
            name="university_id" // Ensure this matches the key in hostelData
            value={hostelData.university_id || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select Nearest University</option>
            {loading ? (
              <option disabled>Loading universities...</option>
            ) : (
              universities.map((university) => (
                <option key={university.id} value={university.id}>
                  {university.name}
                </option>
              ))
            )}
          </select>
        </div>


        <div className="hostel-form__field">
          <label>Room Type</label>
          <select
            name="room_type"
            value={hostelData.room_type}
            onChange={handleChange}
            required
          >
            <option value="">Select Room Type</option>
            <option value="Single Room">Single Room</option>
            <option value="Double Room">Double Room</option>
            <option value="Bedsitter">Bedsitter</option>
            <option value="One Bedroom">One Bedroom</option>
            <option value="Two Bedroom">Two Bedroom</option>
            <option value="Three Bedroom">Three Bedroom</option>
          </select>
        </div>

        <div className="hostel-form__field">
          <label>Number of Bedrooms</label>
          <input
            type="number"
            name="bedrooms"
            value={hostelData.bedrooms}
            onChange={handleChange}
            required
          />
        </div>

        <div className="hostel-form__field">
          <label>Available Units</label>
          <input
            type="number"
            name="available_units"
            value={hostelData.available_units}
            onChange={handleChange}
            required
          />
        </div>

        <div className="hostel-form__field">
          <label>Max Occupancy</label>
          <input
            type="number"
            name="max_occupancy"
            value={hostelData.max_occupancy}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default HostelStep1;

