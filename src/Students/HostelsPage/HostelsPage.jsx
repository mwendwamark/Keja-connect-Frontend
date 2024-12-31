import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import StudentNavbar from "../StudentNavbar/StudentNavbar";
import "./HostelsPage.css";
// import { FaLocation } from "react-icons/fa";

const HostelsPage = () => {
  const [hostels, setHostels] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    location: "",
    min_price: "",
    max_price: "",
    room_type: "",
  });
  const [noResults, setNoResults] = useState(false);

  const fetchHostels = async (filterParams = {}) => {
    try {
      const response = await axios.get("http://localhost:3000/hostels", {
        params: filterParams,
      });
      if (response.data.length === 0) {
        setNoResults(true);
        setTimeout(() => setNoResults(false), 5000);
      }
      setHostels(response.data);
    } catch (error) {
      console.error("Error fetching hostels:", error);
    }
  };

  useEffect(() => {
    fetchHostels();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchHostels(filters);
  };

  const resetFilters = () => {
    setFilters({
      name: "",
      location: "",
      min_price: "",
      max_price: "",
      room_type: "",
    });
    fetchHostels();
  };

  return (
    <>
      <StudentNavbar />
      <div className="hostels-page container">
        <header className="page-header">
          <h1>Find Your Perfect Hostel</h1>
          <p>
            Filter by location, price, and room type to find your ideal stay.
          </p>
        </header>

        <section className="search-filter-section">
          <form className="filter-form" onSubmit={handleFilterSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Search by name"
              value={filters.name}
              onChange={handleInputChange}
              className="filter-input"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={filters.location}
              onChange={handleInputChange}
              className="filter-input"
            />
            <input
              type="number"
              name="min_price"
              placeholder="Min Price"
              value={filters.min_price}
              onChange={handleInputChange}
              className="filter-input"
            />
            <input
              type="number"
              name="max_price"
              placeholder="Max Price"
              value={filters.max_price}
              onChange={handleInputChange}
              className="filter-input"
            />
            <select
              name="room_type"
              value={filters.room_type}
              onChange={handleInputChange}
              className="filter-input"
            >
              <option value="">All Room Types</option>
              <option value="Single Room">Single Room</option>
              <option value="Double Room">Double Room</option>
              <option value="Bedsitter">Bedsitter</option>
              <option value="One Bedroom">One Bedroom</option>
              <option value="Two Bedroom">Two Bedroom</option>
              <option value="Three Bedroom">Three Bedroom</option>
            </select>

            <div className="filter-buttons">
              <button type="submit" className="filter-button">
                Apply Filters
              </button>
              <button
                type="button"
                onClick={resetFilters}
                className="filter-button reset-button"
              >
                Reset Filters
              </button>
            </div>
          </form>
        </section>

        {noResults && (
          <p className="no-results">
            No hostels match your filters. Showing all hostels...
          </p>
        )}

        <section className="hostels-container">
          {hostels.length > 0 ? (
            hostels.map((hostel) => (
              <div key={hostel.id} className="hostel-card">
                <div className="hostel-image">
                  {hostel.image_urls && hostel.image_urls.length > 0 ? (
                    <Swiper
                      navigation={false}
                      pagination={{ clickable: true }} // Optional: Display pagination dots
                      loop={true}
                      modules={[Autoplay, Pagination, Navigation]}
                      autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                      }}
                      speed={1000} // Increased transition duration for smoother effect
                      className="hostel-swiper"
                    >
                      {hostel.image_urls.map((image, index) => (
                        <SwiperSlide key={index}>
                          <img
                            src={image}
                            alt={`${hostel.name} ${index + 1}`}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <p>No image available</p>
                  )}
                </div>
                <div className="hostel-info">
                  <div className="name-price">
                    <h3>{hostel.name}</h3>
                    <p>
                      KES <span>{hostel.price_per_month}/Month</span>
                    </p>
                  </div>
                  <div className="hostel-location">
                    {" "}
                    {/* <FaLocation /> */}
                    <p>{hostel.location}</p>
                  </div>
                  <p>{hostel.room_type}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="loading">Loading hostels...</p>
          )}
        </section>
      </div>
    </>
  );
};

export default HostelsPage;
