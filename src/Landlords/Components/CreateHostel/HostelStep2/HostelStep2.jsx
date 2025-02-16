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
    </div>
  );
};

export default HostelStep2;
