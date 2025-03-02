import React, { useState, useEffect } from "react";

const UpdateHostel = ({ match }) => {
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve landlord ID from local storage
  const landlordId = localStorage.getItem("landlord_id");

  // Hostel ID from the URL params
  const hostelId = match.params.id;

  // Handle form input changes
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price_per_month: "",
    description: "",
    room_type: "",
    bedrooms: "",
    toilet: "",
    kitchen: "",
    study_room: "",
    wifi: "",
    bathroom: "",
    wardrobe: "",
    laundry_services: "",
    balcony: "",
    garden: "",
    swimming_pool: "",
    gym: "",
    available_units: "",
    parking: "",
    cctv_cameras: "",
    hot_shower: "",
    air_conditioner: "",
    smoke_alarm: "",
    first_aid_kit: "",
    water_supply: "",
    security: "",
    latitude: "",
    longitude: "",
    deposit_amount: "",
    pet_friendly: "",
    electricity_billing: "",
    max_occupancy: "",
    furnishing: "",
    nearby_facilities: "",
    rules: "",
    images: [],
  });

  // Fetch hostel details on component mount
  useEffect(() => {
    const fetchHostel = async () => {
      try {
        const response = await fetch(`/api/hostels/${hostelId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch hostel details");
        }
        const data = await response.json();
        setHostel(data);
        setFormData({
          name: data.name,
          location: data.location,
          price_per_month: data.price_per_month,
          description: data.description,
          room_type: data.room_type,
          bedrooms: data.bedrooms,
          toilet: data.toilet,
          kitchen: data.kitchen,
          study_room: data.study_room,
          wifi: data.wifi,
          bathroom: data.bathroom,
          wardrobe: data.wardrobe,
          laundry_services: data.laundry_services,
          balcony: data.balcony,
          garden: data.garden,
          swimming_pool: data.swimming_pool,
          gym: data.gym,
          available_units: data.available_units,
          parking: data.parking,
          cctv_cameras: data.cctv_cameras,
          hot_shower: data.hot_shower,
          air_conditioner: data.air_conditioner,
          smoke_alarm: data.smoke_alarm,
          first_aid_kit: data.first_aid_kit,
          water_supply: data.water_supply,
          security: data.security,
          latitude: data.latitude,
          longitude: data.longitude,
          deposit_amount: data.deposit_amount,
          pet_friendly: data.pet_friendly,
          electricity_billing: data.electricity_billing,
          max_occupancy: data.max_occupancy,
          furnishing: data.furnishing,
          nearby_facilities: data.nearby_facilities,
          rules: data.rules,
          images: data.images || [],
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHostel();
  }, [hostelId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/hostels/${hostelId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hostel: {
            ...formData,
            landlord_id: landlordId, // Include landlord_id in the request
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update hostel details");
      }

      const updatedHostel = await response.json();
      alert("Hostel updated successfully!");
      console.log("Updated Hostel:", updatedHostel);
    } catch (err) {
      alert(`Error updating hostel: ${err.message}`);
    }
  };

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Update Hostel Details</h2>
      {hostel && (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Price per Month:
            <input
              type="number"
              name="price_per_month"
              value={formData.price_per_month}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Room Type:
            <input
              type="text"
              name="room_type"
              value={formData.room_type}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Bedrooms:
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Toilet:
            <input
              type="checkbox"
              name="toilet"
              checked={formData.toilet}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Kitchen:
            <input
              type="checkbox"
              name="kitchen"
              checked={formData.kitchen}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Study Room:
            <input
              type="checkbox"
              name="study_room"
              checked={formData.study_room}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            WiFi:
            <input
              type="checkbox"
              name="wifi"
              checked={formData.wifi}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Bathroom:
            <input
              type="checkbox"
              name="bathroom"
              checked={formData.bathroom}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Wardrobe:
            <input
              type="checkbox"
              name="wardrobe"
              checked={formData.wardrobe}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Laundry Services:
            <input
              type="checkbox"
              name="laundry_services"
              checked={formData.laundry_services}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Balcony:
            <input
              type="checkbox"
              name="balcony"
              checked={formData.balcony}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Garden:
            <input
              type="checkbox"
              name="garden"
              checked={formData.garden}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Swimming Pool:
            <input
              type="checkbox"
              name="swimming_pool"
              checked={formData.swimming_pool}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Gym:
            <input
              type="checkbox"
              name="gym"
              checked={formData.gym}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Available Units:
            <input
              type="number"
              name="available_units"
              value={formData.available_units}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Parking:
            <input
              type="checkbox"
              name="parking"
              checked={formData.parking}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            CCTV Cameras:
            <input
              type="checkbox"
              name="cctv_cameras"
              checked={formData.cctv_cameras}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Hot Shower:
            <input
              type="checkbox"
              name="hot_shower"
              checked={formData.hot_shower}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Air Conditioner:
            <input
              type="checkbox"
              name="air_conditioner"
              checked={formData.air_conditioner}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Smoke Alarm:
            <input
              type="checkbox"
              name="smoke_alarm"
              checked={formData.smoke_alarm}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            First Aid Kit:
            <input
              type="checkbox"
              name="first_aid_kit"
              checked={formData.first_aid_kit}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Water Supply:
            <input
              type="checkbox"
              name="water_supply"
              checked={formData.water_supply}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Security:
            <input
              type="checkbox"
              name="security"
              checked={formData.security}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Latitude:
            <input
              type="text"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Longitude:
            <input
              type="text"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Deposit Amount:
            <input
              type="number"
              name="deposit_amount"
              value={formData.deposit_amount}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Pet Friendly:
            <input
              type="checkbox"
              name="pet_friendly"
              checked={formData.pet_friendly}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Electricity Billing:
            <input
              type="text"
              name="electricity_billing"
              value={formData.electricity_billing}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Max Occupancy:
            <input
              type="number"
              name="max_occupancy"
              value={formData.max_occupancy}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Furnishing:
            <input
              type="text"
              name="furnishing"
              value={formData.furnishing}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Nearby Facilities:
            <textarea
              name="nearby_facilities"
              value={formData.nearby_facilities}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Rules:
            <textarea
              name="rules"
              value={formData.rules}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit">Update Hostel</button>
        </form>
      )}
    </div>
  );
};

export default UpdateHostel;          