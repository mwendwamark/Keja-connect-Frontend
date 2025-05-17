import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../config/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../Dashboard/components/Sidebar/Sidebar";
import "./UpdateHostel.css";

const UpdateHostel = () => {
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Retrieve landlord ID from local storage
  const landlordId = localStorage.getItem("landlord_id");

  // Hostel ID from the URL params
  const { id: hostelId } = useParams();

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
    floor_level: "",
    road_condition: "",
    crime_rate_level: "",
    distance_to_stage: "",
    curtain_rods: false,
    electricity_backup: false,
    water_backup: false,
    elevator: false,
    flooding_prone_area: false,
    garbage_collection_included: false,
    garbage_collection_cost: "",
    garbage_collection_frequency: ""
  });

  // Fetch hostel details on component mount
  useEffect(() => {
    const fetchHostel = async () => {
      try {
        const token = localStorage.getItem("landlordToken");
        if (!token) {
          setError("You are not logged in. Please log in to update your hostel.");
          setLoading(false);
          return;
        }

        console.log('Fetching hostel with ID:', hostelId);
        const response = await axios.get(
          `${API_BASE_URL}/hostels/${hostelId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        console.log('Hostel data received:', response.data);
        
        const data = response.data;
        setHostel(data);
        setFormData({
          name: data.name || "",
          location: data.location || "",
          price_per_month: data.price_per_month || "",
          description: data.description || "",
          room_type: data.room_type || "",
          bedrooms: data.bedrooms || "",
          toilet: data.toilet || "",
          kitchen: data.kitchen || "",
          study_room: data.study_room || "",
          wifi: data.wifi || "",
          bathroom: data.bathroom || "",
          wardrobe: data.wardrobe || "",
          laundry_services: data.laundry_services || "",
          balcony: data.balcony || "",
          garden: data.garden || "",
          swimming_pool: data.swimming_pool || "",
          gym: data.gym || "",
          available_units: data.available_units || "",
          parking: data.parking || "",
          cctv_cameras: data.cctv_cameras || "",
          hot_shower: data.hot_shower || "",
          air_conditioner: data.air_conditioner || "",
          smoke_alarm: data.smoke_alarm || "",
          first_aid_kit: data.first_aid_kit || "",
          water_supply: data.water_supply || "",
          security: data.security || "",
          latitude: data.latitude || "",
          longitude: data.longitude || "",
          deposit_amount: data.deposit_amount || "",
          pet_friendly: data.pet_friendly || "",
          electricity_billing: data.electricity_billing || "",
          max_occupancy: data.max_occupancy || "",
          furnishing: data.furnishing || "",
          nearby_facilities: data.nearby_facilities || "",
          rules: data.rules || "",
          images: data.images || [],
          floor_level: data.floor_level || "",
          road_condition: data.road_condition || "",
          crime_rate_level: data.crime_rate_level || "",
          distance_to_stage: data.distance_to_stage || "",
          curtain_rods: data.curtain_rods || false,
          electricity_backup: data.electricity_backup || false,
          water_backup: data.water_backup || false,
          elevator: data.elevator || false,
          flooding_prone_area: data.flooding_prone_area || false,
          garbage_collection_included: data.garbage_collection_included || false,
          garbage_collection_cost: data.garbage_collection_cost || "",
          garbage_collection_frequency: data.garbage_collection_frequency || ""
        });
      } catch (err) {
        console.error("Error fetching hostel:", err);
        setError("Failed to fetch hostel details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (hostelId) {
      fetchHostel();
    }
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
      const token = localStorage.getItem("landlordToken");
      if (!token) {
        toast.error("You are not logged in");
        return;
      }

      const response = await axios.put(
        `${API_BASE_URL}/hostels/${hostelId}`,
        {
          hostel: {
            ...formData,
            landlord_id: landlordId, // Include landlord_id in the request
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        }
      );

      toast.success("Hostel updated successfully!");
      console.log("Updated Hostel:", response.data);
      
      // Redirect back to the landlord hostels page after successful update
      setTimeout(() => {
        navigate("/landlord/dashboard");
      }, 2000);
    } catch (err) {
      console.error("Error updating hostel:", err);
      toast.error(`Error updating hostel: ${err.response?.data?.message || err.message}`);
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="content-wrapper">
        <div className="landlord-container">
          <Sidebar />
          <div className="dashboard-body">
            <div className="dashboard-main">
              <div className="loading-spinner">Loading hostel details...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="content-wrapper">
        <div className="landlord-container">
          <Sidebar />
          <div className="dashboard-body">
            <div className="dashboard-main">
              <div className="error-message">{error}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="content-wrapper">
        <div className="landlord-container">
          <Sidebar />
          <div className="dashboard-body">
            <div className="dashboard-main">
              <div className="update-hostel-header">
                <h2>Update Hostel Details</h2>
                <button 
                  className="back-btn"
                  onClick={() => navigate("/landlord/hostels")}
                >
                  Back to My Hostels
                </button>
              </div>
              {hostel && (
                <form className="update-hostel-form" onSubmit={handleSubmit}>
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
              required
            />
          </label>
          <br />
          <h3>Additional Information</h3>
          <label>
            Floor Level:
            <input
              type="number"
              name="floor_level"
              value={formData.floor_level}
              onChange={handleChange}
              min="0"
            />
          </label>
          <br />
          <label>
            Road Condition:
            <select
              name="road_condition"
              value={formData.road_condition}
              onChange={handleChange}
            >
              <option value="">Select Road Condition</option>
              <option value="All Weather">All Weather</option>
              <option value="Murram">Murram</option>
              <option value="Tarmac">Tarmac</option>
              <option value="Cabros">Cabros</option>
            </select>
          </label>
          <br />
          <label>
            Crime Rate Level:
            <select
              name="crime_rate_level"
              value={formData.crime_rate_level}
              onChange={handleChange}
            >
              <option value="">Select Crime Rate Level</option>
              <option value="Very Low">Very Low</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Very High">Very High</option>
            </select>
          </label>
          <br />
          <label>
            Distance to Stage (Meters):
            <input
              type="number"
              name="distance_to_stage"
              value={formData.distance_to_stage}
              onChange={handleChange}
              min="0"
            />
          </label>
          <br />
          <h3>Additional Amenities</h3>
          <label>
            <input
              type="checkbox"
              name="curtain_rods"
              checked={formData.curtain_rods}
              onChange={handleChange}
            />
            Curtain Rods
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="electricity_backup"
              checked={formData.electricity_backup}
              onChange={handleChange}
            />
            Electricity Backup
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="water_backup"
              checked={formData.water_backup}
              onChange={handleChange}
            />
            Water Backup
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="elevator"
              checked={formData.elevator}
              onChange={handleChange}
            />
            Elevator
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="flooding_prone_area"
              checked={formData.flooding_prone_area}
              onChange={handleChange}
            />
            Flooding Prone Area
          </label>
          <br />
          <h3>Garbage Collection</h3>
          <label>
            <input
              type="checkbox"
              name="garbage_collection_included"
              checked={formData.garbage_collection_included}
              onChange={handleChange}
            />
            Included in Rent
          </label>
          <br />
          <div style={{ display: formData.garbage_collection_included ? 'none' : 'block' }}>
            <label>
              Garbage Collection Cost (KES/Month):
              <input
                type="number"
                name="garbage_collection_cost"
                value={formData.garbage_collection_cost}
                onChange={handleChange}
                min="0"
              />
            </label>
            <br />
            <label>
              Garbage Collection Frequency:
              <select
                name="garbage_collection_frequency"
                value={formData.garbage_collection_frequency}
                onChange={handleChange}
              >
                <option value="">Select Frequency</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Bi-weekly">Bi-weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </label>
          </div>
          <br />
          <button type="submit">Update Hostel</button>
        </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UpdateHostel;          