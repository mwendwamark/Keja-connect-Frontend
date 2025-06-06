import React, { useEffect, useState } from "react";
import "./HostelStep1.css";
import axios from "axios";
import { API_ENDPOINTS } from "../../../../config/api";

const HostelStep1 = ({ hostelData, handleChange }) => {
  const [universities, setUniversities] = useState([]); // State to store universities
  const [loading, setLoading] = useState(false); // State to handle loading

  // Fetch universities from the backend
  useEffect(() => {
    const fetchUniversities = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_ENDPOINTS.GENERAL.UNIVERSITIES);
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
    <div className="hostel-form-container">
      <div className="hostel-form">
        <div className="hostel-form__header">
          <h2>Tell us about your hostel</h2>
          <p>Please fill out all the information.</p>
        </div>
        <div className="hostel-form__fields">
          {/* Hostel Name */}
          <div className="hostel-form__field">
            <label htmlFor="hostel-name">Hostel Name</label>
            <input
              id="hostel-name"
              type="text"
              name="name"
              value={hostelData.name}
              onChange={handleChange}
              required
              placeholder="Enter hostel name"
            />
          </div>

          {/* Location */}
          <div className="hostel-form__field">
            <label htmlFor="hostel-location">Location</label>
            <input
              id="hostel-location"
              type="text"
              name="location"
              value={hostelData.location}
              onChange={handleChange}
              required
              placeholder="Enter hostel location"
            />
          </div>

          {/* University Dropdown */}
          <div className="hostel-form__field">
            <label htmlFor="hostel-university">Nearest University</label>
            <select
              id="hostel-university"
              name="university_id"
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

          {/* Room Type */}
          <div className="hostel-form__field">
            <label htmlFor="hostel-room-type">Room Type</label>
            <select
              id="hostel-room-type"
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
            <label htmlFor="hostel-floor-level">Floor Level</label>
            <input
              id="hostel-floor-level"
              type="number"
              name="floor_level"
              value={hostelData.floor_level}
              onChange={handleChange}
              min="0"
              placeholder="Enter floor level (0 for ground floor)"
            />
          </div>

          {/* Number of Bedrooms */}
          <div className="hostel-form__field">
            <label htmlFor="hostel-bedrooms">Number of Bedrooms</label>
            <input
              id="hostel-bedrooms"
              type="number"
              name="bedrooms"
              value={hostelData.bedrooms}
              onChange={handleChange}
              required
              min="1"
              placeholder="Enter number of bedrooms"
            />
          </div>

          {/* Available Units */}
          {/* <div className="hostel-form__field">
            <label htmlFor="hostel-available-units">Available Units</label>
            <input
              id="hostel-available-units"
              type="number"
              name="available_units"
              value={hostelData.available_units}
              onChange={handleChange}
              required
              min="0"
              placeholder="Enter available units"
            />
          </div> */}

          {/* Max Occupancy */}
          <div className="hostel-form__field">
            <label htmlFor="hostel-max-occupancy">Max Occupancy</label>
            <input
              id="hostel-max-occupancy"
              type="number"
              name="max_occupancy"
              value={hostelData.max_occupancy}
              onChange={handleChange}
              required
              min="1"
              placeholder="Enter max occupancy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelStep1;
