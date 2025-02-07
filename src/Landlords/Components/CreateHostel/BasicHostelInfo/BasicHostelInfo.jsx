import React from "react";

const BasicHostelInfo = ({ hostelData, handleChange }) => {
  return (
    <div className="step-container">
      <div className="step-container-header">
        <h2>Tell us about your hostel</h2>
        <p>
         Please fill out all the information.
        </p>
      </div>{" "}
      <div className="form-grid">
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
      </div>
    </div>
  );
};

export default BasicHostelInfo;
