import React, { useState } from "react";
import axios from "axios";

const ImageUpload = ({ hostelId }) => {
  const [images, setImages] = useState([]);

  // Handle image selection
  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  // Handle image upload
  const handleUpload = async () => {
    const formData = new FormData();

    Array.from(images).forEach((image) => {
      formData.append("image[url]", image);
      formData.append("image[hostel_id]", hostelId); // Associate with the hostel
    });

    try {
      await axios.post("http://localhost:3000/images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      alert("Images uploaded successfully!");
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Images</button>
    </div>
  );
};

export default ImageUpload;
