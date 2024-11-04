import React, { useState } from "react";
import axios from "axios";

const UploadAvatar = () => {
  const [avatar, setAvatar] = useState(null);
  const landlordId = localStorage.getItem("landlord_id"); // Assuming landlord_id is stored in localStorage

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("avatar", avatar);

    try {
      const response = await axios.post(
        `http://localhost:3000/landlords/avatars`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Avatar uploaded:", response.data);
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleAvatarChange} />
      <button onClick={handleUpload}>Upload Avatar</button>
    </div>
  );
};

export default UploadAvatar;
