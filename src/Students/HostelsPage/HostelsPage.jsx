import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "./HostelsPage.css";
import StudentNavbar from "../StudentNavbar/StudentNavbar";
import { IoLocationOutline } from "react-icons/io5";
import RatingDisplay from "../Components/RatingDisplay";

const HostelsPage = () => {
  const [hostels, setHostels] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    location: "",
    min_price: "",
    max_price: "",
    room_type: "",
  });

  const fetchHostels = async (filterParams = {}) => {
    try {
      const response = await axios.get("http://localhost:3000/hostels", {
        params: filterParams,
      });
      const updatedHostels = response.data.map((hostel) => {
        const uniqueImages = [...new Set(hostel.image_urls)];
        return { ...hostel, image_urls: uniqueImages };
      });
      setHostels(updatedHostels);
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
        <h1>Available Hostels</h1>

        {/* Filter Form */}
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

        {/* Hostels List */}
        <div className="hostels-container">
          {hostels.map((hostel) => (
            <div key={hostel.id} className="hostel-card">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                navigation={false}
                pagination={{ clickable: true }}
                // autoplay={{ delay: 3000 }}
                speed={1800}
              >
                {hostel.image_urls.map((url, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={url}
                      alt={`${hostel.name} image ${index + 1}`}
                      className="hostel-swiper"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>{" "}
              <div className="hostel-info">
                <div className="name-price">
                  <h3>{hostel.name}</h3>
                  <p><span>KES </span>{hostel.price_per_month}/ Month</p>
                </div>

                <p>{hostel.room_type}</p>

                <p className="location-info">
                  <IoLocationOutline />
                  {hostel.location}
                </p>
                <RatingDisplay rating={hostel.average_rating} reviewsCount={hostel.reviews_count}/>
                <div className="hostel-images"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HostelsPage;
