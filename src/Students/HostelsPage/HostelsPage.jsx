import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentNavbar from "../StudentNavbar/StudentNavbar";

const HostelsPage = () => {
  const [hostels, setHostels] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    location: "",
    min_price: "",
    max_price: "",
    room_type: "",
  });

  const fetchHostels = async () => {
    try {
      const response = await axios.get("http://localhost:3000/hostels", {
        params: {
          name: filters.name,
          location: filters.location,
          min_price: filters.min_price,
          max_price: filters.max_price,
          room_type: filters.room_type,
        },
      });
      setHostels(response.data);
    } catch (error) {
      console.error("Error fetching hostels:", error);
    }
  };

  useEffect(() => {
    fetchHostels();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchHostels();
  };

  return (
    <div>
      <StudentNavbar />
      <h1>Hostel Listings</h1>

      {/* Filters Form */}
      <form onSubmit={handleFilterSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
          />
        </div>

        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
          />
        </div>

        <div>
          <label>Min Price</label>
          <input
            type="number"
            name="min_price"
            value={filters.min_price}
            onChange={handleFilterChange}
          />
        </div>

        <div>
          <label>Max Price</label>
          <input
            type="number"
            name="max_price"
            value={filters.max_price}
            onChange={handleFilterChange}
          />
        </div>

        <div>
          <label>Room Type</label>
          <input
            type="text"
            name="room_type"
            value={filters.room_type}
            onChange={handleFilterChange}
          />
        </div>

        <button type="submit">Apply Filters</button>
      </form>

      {/* Hostels Display */}
      <div className="hostels-container">
        {hostels.map((hostel) => (
          <div key={hostel.id} className="hostel-card">
            <h2>{hostel.name}</h2>
            <p>Location: {hostel.location}</p>
            <p>Price per Month: ${hostel.price_per_month}</p>
            <p>Room Type: {hostel.room_type}</p>

            {/* Render hostel images */}
            <div className="hostel-images">
              {hostel.image_urls && hostel.image_urls.length > 0 ? (
                hostel.image_urls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`${hostel.name} image ${index + 1}`}
                    style={{ width: "150px", height: "100px", margin: "5px" }}
                  />
                ))
              ) : (
                <p>No images available</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostelsPage;
