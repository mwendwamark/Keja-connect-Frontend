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
    fetchHostels(); // Fetch hostels when the component mounts
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
    fetchHostels(); // Refetch hostels with the updated filters
  };

  return (
    <div>
      <StudentNavbar />

      <h1>Hostel Listings</h1>

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

      <div>
        {hostels.length > 0 ? (
          <ul>
            {hostels.map((hostel) => (
              <li key={hostel.id}>
                <h3>{hostel.name}</h3>
                <p>{hostel.location}</p>
                <p>{hostel.price_per_month} per month</p>
                <p>Room Type: {hostel.room_type}</p>
                {/* <div>
                  {hostel.image_urls?.length > 0 ? (
                    hostel.image_urls.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`Hostel ${index}`}
                        style={{
                          width: "200px",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                    ))
                  ) : (
                    <p>No images available</p>
                  )}
                </div> */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hostels found.</p>
        )}
      </div>
    </div>
  );
};

export default HostelsPage;
