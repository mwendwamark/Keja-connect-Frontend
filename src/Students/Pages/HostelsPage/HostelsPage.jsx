import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "./HostelsPage.css";
import StudentNavbar from "../../StudentNavbar/StudentNavbar";
import { IoLocationOutline } from "react-icons/io5";
import RatingDisplay from "../../Components/Rating/RatingDisplay";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";

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
      <Helmet>
        <title>Student Hostels in Kenya | Affordable Accommodation</title>
        <meta
          name="description"
          content="Find affordable student hostels near universities across Kenya. Browse by location, price, and room type. Book your ideal hostel today!"
        />
        <meta
          name="keywords"
          content="student hostels, affordable hostels, university accommodation, Kenya hostels, hostel booking"
        />
        <link rel="canonical" href="https://kejaconnect.vercel.app/hostels" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kejaconnect.vercel.app/hostels" />
        <meta
          property="og:title"
          content="Student Hostels in Kenya Near Universities | Affordable Accommodation | Variety of Hostels"
        />
        <meta
          property="og:description"
          content="Find affordable student hostels near universities across Kenya. Browse by location, price, and room type. Book your ideal hostel today!"
        />
        {/* Og image */}
        {/* <meta
          property="og:image"
          content="https://www.yourwebsite.com/images/hostels-og-image.jpg"
        /> */}
      </Helmet>
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
            <NavLink
              to={`/hostels/${hostel.id}`}
              key={hostel.id}
              className="hostels-card"
            >
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                navigation={true}
                pagination={{ clickable: true }}
                // autoplay={{ delay: 3000 }}
                speed={1800}
              >
                {hostel.image_urls.map((url, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={url}
                      alt={`${hostel.name} hostel in ${
                        hostel.location
                      } - Image ${index + 1}`}
                      className="hostels-swiper"
                      loading="lazy"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>{" "}
              <div className="hostels-info">
                <div className="name-price">
                  <h3>{hostel.name}</h3>
                  <p>
                    <span>KES </span>
                    {hostel.price_per_month}/ Month
                  </p>
                </div>

                <p>{hostel.room_type}</p>

                <p className="location-info">
                  <IoLocationOutline />
                  {hostel.location}
                </p>
                <RatingDisplay
                  rating={hostel.average_rating}
                  reviewsCount={hostel.reviews_count}
                />
                <div className="hostels-images"></div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};

export default HostelsPage;
