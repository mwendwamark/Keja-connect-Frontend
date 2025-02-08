import React, { useState } from "react";
import "./FinalInfo.css";

const FinalInfo = ({
  hostelData,
  handleChange,
  handleImageChange,
  imageUrls,
}) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFilePreview = (event) => {
    const files = Array.from(event.target.files);
    
    // Store the actual files
    setSelectedFiles(files);
    
    // Clear previous previews
    setPreviewImages([]);
    
    // Generate preview URLs
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImages(prev => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    });

    // Call the parent's handleImageChange with the files
    handleImageChange(event);
  };

  const removePreviewImage = (indexToRemove) => {
    // Remove the preview image
    setPreviewImages(prev => prev.filter((_, index) => index !== indexToRemove));
    
    // Remove the corresponding file from selectedFiles
    const updatedFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
    setSelectedFiles(updatedFiles);
    
    // Create a new FileList-like object
    const dataTransfer = new DataTransfer();
    updatedFiles.forEach(file => dataTransfer.items.add(file));
    
    // Update the file input
    const fileInput = document.querySelector('.final-form__file-input');
    if (fileInput) {
      fileInput.files = dataTransfer.files;
    }
  };

  return (
    <div className="final-form">
      <div className="final-form__header">
        <h2>Add images of your hostel and set a price</h2>
        <p>
          Choose the available amenities present in your property by clicking on
          the amenity
        </p>
      </div>
      <div className="final-form__content">
        <div className="final-form__field">
          <label>Price per Month</label>
          <input
            type="number"
            name="price_per_month"
            value={hostelData.price_per_month}
            onChange={handleChange}
            required
          />
        </div>
        <div className="final-form__field">
          <label>Images</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleFilePreview}
            className="final-form__file-input"
            accept="image/*"
          />
          {previewImages.length > 0 && (
            <div className="final-form__preview-section">
              <h3>Preview Selected Images</h3>
              <div className="final-form__image-gallery">
                {previewImages.map((preview, index) => (
                  <div key={index} className="final-form__image-container">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="final-form__preview-image"
                    />
                    <button
                      type="button"
                      className="final-form__remove-image"
                      onClick={() => removePreviewImage(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {imageUrls.length > 0 && (
            <div className="final-form__uploaded-section">
              <h3>Uploaded Images</h3>
              <div className="final-form__image-gallery">
                {imageUrls.map((url, index) => (
                  <div key={index} className="final-form__image-container">
                    <img
                      src={url}
                      alt={`Hostel ${index + 1}`}
                      className="final-form__preview-image"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinalInfo;