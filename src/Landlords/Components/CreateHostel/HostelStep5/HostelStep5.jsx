import React from "react";
import "./HostelStep5.css";

const HostelStep5 = ({ hostelData, handleChange }) => {
  return (
    <div className="hostel-form">
      <div className="hostel-form__header">
        <h2>Utility</h2>
        <p>
          Choose the available amenities present in your property by clicking on
          the amenity
        </p>
      </div>
      {/* electricity billing */}
      <div className="hostel-form__field">
        <label>Electricity Billing</label>
        <select
          name="electricity_billing"
          onChange={handleChange}
          value={hostelData.electricity_billing}
          required
        >
          <option value="">Select Electricity Billing type</option>
          <option value="Pre paid">Pre-paid (Tokens)</option>
          <option value="Post paid">Post-paid </option>
          <option value="Solar Pannel">Solar Panel</option>
        </select>
      </div>

      <div className="hostel-form__fields">
        {/* water supply */}
        <div className="hostel-form__field">
          <label>Water Supply</label>
          <input
            type="text"
            name="water_supply"
            value={hostelData.water_supply}
            onChange={handleChange}
            required
            placeholder="Describe water supply of your house"
          />
        </div>

        {/* Garbage collection */}
        <div className="hostel-form__field checkbox-field">
          <label>
            <input
              type="checkbox"
              name="garbage_collection_included"
              checked={hostelData.garbage_collection_included}
              onChange={handleChange}
            />
            Garbage Collection Included in Rent
          </label>
        </div>
        
        {!hostelData.garbage_collection_included && (
          <div className="hostel-form__field">
            <label>Garbage Collection Cost (KES)</label>
            <input
              type="number"
              name="garbage_collection_cost"
              value={hostelData.garbage_collection_cost}
              onChange={handleChange}
              min="0"
              placeholder="Cost in KES"
            />
          </div>
        )}
        
        <div className="hostel-form__field">
          <label>Garbage Collection Frequency</label>
          <select
            name="garbage_collection_frequency"
            value={hostelData.garbage_collection_frequency}
            onChange={handleChange}
          >
            <option value="">Select Frequency</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Bi-weekly">Bi-weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>
        {/* security */}
        <div className="hostel-form__field">
          <label>Security</label>
          <input
            type="text"
            name="security"
            value={hostelData.security}
            onChange={handleChange}
            required
            placeholder="Security situation in your area"
          />
        </div>
      </div>
    </div>
  );
};

export default HostelStep5;
