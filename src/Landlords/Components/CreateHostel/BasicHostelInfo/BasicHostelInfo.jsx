// import React from "react";

// const BasicHostelInfo = ({ hostelData, handleChange }) => {
  //   return (
    //     <div className="step-container">
    //       <div className="step-container-header">
    //         <h2>Tell us about your hostel</h2>
    //         <p>Please fill out all the information.</p>
    //       </div>
    //       <div className="form-grid">
    //         <div className="form-group">
//           <label>Hostel Name</label>
//           <input
//             type="text"
//             name="name"
//             value={hostelData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Location</label>
//           <input
//             type="text"
//             name="location"
//             value={hostelData.location}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Room Type</label>
//           <select
//             name="room_type"
//             value={hostelData.room_type}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Room Type</option>
//             <option value="Single Room">Single Room</option>
//             <option value="Double Room">Double Room</option>
//             <option value="Bedsitter">Bedsitter</option>
//             <option value="One Bedroom">One Bedroom</option>
//             <option value="Two Bedroom">Two Bedroom</option>
//             <option value="Three Bedroom">Three Bedroom</option>
//           </select>
//         </div>
//         <div className="form-group">
//           <label>Bedrooms</label>
//           <input
//             type="number"
//             name="bedrooms"
//             value={hostelData.bedrooms}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Available Units</label>
//           <input
//             type="number"
//             name="available_units"
//             value={hostelData.available_units}
//             onChange={handleChange}
//             required
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BasicHostelInfo;


import React from "react";
import "./BasicHostelInfo.css"; // Ensure this file exists for styling

const BasicHostelInfo = ({ hostelData, handleChange }) => {
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
      </div>
    </div>
  );
};

export default BasicHostelInfo;