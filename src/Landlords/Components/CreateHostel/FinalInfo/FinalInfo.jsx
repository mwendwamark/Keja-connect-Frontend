import React from "react";

const FinalInfo = ({
  hostelData,
  handleChange,
  handleImageChange,
  imageUrls,
}) => {
  return (
    <div className="step-container">
      <div className="step-container-header">
        <h2>Add images of your hostel and set a price</h2>
        <p>
          Choose the available amenities present in your property by clicking on
          the amenity
        </p>
      </div>{" "}
      <div className="form-grid">
        <div className="form-group">
          <label>Price per Month</label>
          <input
            type="number"
            name="price_per_month"
            value={hostelData.price_per_month}
            onChange={handleChange}
            required
          />
        </div>
        {/* <div className="form-group">
          <label>Water Supply</label>
          <input
            type="text"
            name="water_supply"
            value={hostelData.water_supply}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Security</label>
          <input
            type="text"
            name="security"
            value={hostelData.security}
            onChange={handleChange}
          />
        </div> */}
        <div className="form-group">
          <label>Images</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleImageChange}
          />
          <div className="image-preview">
            {imageUrls.map((url, index) => (
              <img key={index} src={url} alt={`Hostel ${index + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalInfo;
