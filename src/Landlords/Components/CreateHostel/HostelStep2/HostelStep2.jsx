import React from "react";
import "../HostelStep1/HostelStep1.css";

const HostelStep2 = ({ hostelData, handleChange }) => {
  return (
    <div className="hostel-form">
      <div className="hostel-form__header">
        <h2>Tell us about your hostel</h2>
        <p>Please fill out all the information.</p>
      </div>{" "}
      {/* furnishing */}
      <div className="hostel-form__field">
        <label>Furnishing</label>
        <select
          name="furnishing"
          value={hostelData.furnishing}
          onChange={handleChange}
          required
        >
          <option value="">Select Funrishing Type</option>
          <option value="Fully Furnished">Fully Furnished</option>
          <option value="Semi Furnished">Semi Furnished</option>
          <option value="Unfurnished">Unfurnished</option>
        </select>
      </div>
      {/* Description */}
      <div className="hostel-form__field">
        <label>Description</label>
        <textarea
          className="hostel-form__textarea"
          name="description"
          value={hostelData.description}
          onChange={handleChange}
          required
        />
      </div>
    
      {/* nearby facilities */}
      <div className="hostel-form__field">
        <label>Nearby Facilities</label>
        <textarea
          className="hostel-form__textarea"
          name="nearby_facilities"
          value={hostelData.nearby_facilities}
          onChange={handleChange}
          required
        />
      </div>

      {/* Road Condition */}
      <div className="hostel-form__field">
        <label>Road Condition</label>
        <select
          name="road_condition"
          value={hostelData.road_condition || ""}
          onChange={handleChange}
        >
          <option value="">Select Road Condition</option>
          <option value="All Weather">All Weather</option>
          <option value="Murram">Murram</option>
          <option value="Tarmac">Tarmac</option>
          <option value="Cabros">Cabros</option>
        </select>
      </div>

      {/* Crime Rate Level */}
      <div className="hostel-form__field">
        <label>Crime Rate Level</label>
        <select
          name="crime_rate_level"
          value={hostelData.crime_rate_level || ""}
          onChange={handleChange}
        >
          <option value="">Select Crime Rate Level</option>
          <option value="Very Low">Very Low</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Very High">Very High</option>
        </select>
      </div>

      {/* Distance to Stage */}
      <div className="hostel-form__field">
        <label>Distance to Stage (meters)</label>
        <input
          type="number"
          name="distance_to_stage"
          value={hostelData.distance_to_stage || ""}
          onChange={handleChange}
          min="0"
          placeholder="Distance to nearest stage/bus stop in meters"
        />
      </div>
      
      {/* Flooding prone area  */}<div className="hostel-form__field checkbox-field">
        <label>
          <input
            type="checkbox"
            name="flooding_prone_area"
            checked={hostelData.flooding_prone_area}
            onChange={handleChange}
          />
          Flooding Prone Area
        </label>
      </div>
    </div>
  );
};

export default HostelStep2;
