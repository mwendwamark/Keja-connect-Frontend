import React from "react";
import "./HostelStep6.css";

const HostelStep6 = ({ hostelData, handleChange }) => {
  return (
    <div className="hostel-form">
      <div className="hostel-form__header">
        <h2>Tell us about your hostel</h2>
        <p>Please fill out all the information.</p>
      </div>
      {/* deposit amount */}
      <div className="hostel-form__field">
        <label>Deposit Amount</label>
        <input
          type="number"
          name="deposit_amount"
          value={hostelData.deposit_amount}
          onChange={handleChange}
          required
        />
      </div>

      {/* rules */}
      <div className="hostel-form__field">
        <label>Rules</label>
        <textarea
          className="hostel-form__textarea"
          name="rules"
          value={hostelData.rules}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
};

export default HostelStep6;
