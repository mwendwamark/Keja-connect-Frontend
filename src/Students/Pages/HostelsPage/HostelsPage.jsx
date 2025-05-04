import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { IoLocationOutline } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StudentNavbar from "../../StudentNavbar/StudentNavbar";
import RatingDisplay from "../../Components/Rating/RatingDisplay";
import { API_ENDPOINTS } from "../../../config/api";
import "./HostelsPage.css";

const HostelsPage = () => {
  const [hostels, setHostels] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    location: "",
    min_price: "",
    max_price: "",
    room_type: "",
    university_id: "",
  });

  const [universities, setUniversities] = useState([]);
  const [filterActive, setFilterActive] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [animatingHearts, setAnimatingHearts] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem("student_wishlist");
    setWishlist(stored ? JSON.parse(stored) : []);
  }, []);

  const isHostelSaved = (hostelId) =>
    wishlist.some((item) => item.id === hostelId);

  const toggleWishlist = (hostel) => {
    let wishlistArr = [...wishlist];
    const index = wishlistArr.findIndex((item) => item.id === hostel.id);

    if (index > -1) {
      // Remove from wishlist
      wishlistArr.splice(index, 1);
      toast.error("Removed hostel from wishlist");
    } else {
      // Add to wishlist and trigger animation
      wishlistArr.push({
        id: hostel.id,
        name: hostel.name,
        location: hostel.location,
        image: hostel.image_urls?.[0] || "",
        average_rating: hostel.average_rating,
        reviews_count: hostel.reviews_count,
      });
      toast.success("Added hostel to wishlist");

      // Set this heart to be animating
      setAnimatingHearts((prev) => ({
        ...prev,
        [hostel.id]: true,
      }));

      // Remove animation class after animation completes
      setTimeout(() => {
        setAnimatingHearts((prev) => ({
          ...prev,
          [hostel.id]: false,
        }));
      }, 600); // Match this to your animation duration
    }

    setWishlist(wishlistArr);
    localStorage.setItem("student_wishlist", JSON.stringify(wishlistArr));
  };

  useEffect(() => {
    let count = 0;
    Object.values(filters).forEach((value) => {
      if (value !== "" && value !== undefined) count++;
    });
    setActiveFiltersCount(count);
  }, [filters]);

  const toggleFilters = () => {
    setFilterActive(!filterActive);
  };

  const fetchHostels = async (filterParams = {}) => {
    try {
      const response = await axios.get(API_ENDPOINTS.GENERAL.HOSTELS, {
        params: {
          ...filterParams,
          university_id: filters.university_id || undefined,
        },
      });
      const updatedHostels = response.data.map((hostel) => {
        const uniqueImages = [...new Set(hostel.image_urls)];
        return { ...hostel, image_urls: uniqueImages };
      });
      setHostels(updatedHostels);

      // Fetch universities if not already fetched
      if (universities.length === 0) {
        const universitiesResponse = await axios.get(
          API_ENDPOINTS.GENERAL.UNIVERSITIES
        );
        setUniversities(universitiesResponse.data);
      }
    } catch (error) {
      console.error("Error fetching hostels:", error);
    }
  };

  useEffect(() => {
    fetchHostels();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchHostels(filters);
  };

  const clearFilters = () => {
    setFilters({
      name: "",
      location: "",
      min_price: "",
      max_price: "",
      room_type: "",
      university_id: "",
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
        <meta
          property="og:url"
          content="https://kejaconnect.vercel.app/hostels"
        />
        <meta
          property="og:title"
          content="Student Hostels in Kenya Near Universities | Affordable Accommodation | Variety of Hostels"
        />
        <meta
          property="og:description"
          content="Find affordable student hostels near universities across Kenya. Browse by location, price, and room type. Book your ideal hostel today!"
        />
      </Helmet>
      <StudentNavbar />
      <div className="hostels-page container section">
        <div className="hostel-page-section">
          {/* Filter Bar - Airbnb Style */}
          <div className="filter-bar">
            <button
              className={`filter-main-btn ${filterActive ? "active" : ""}`}
              onClick={toggleFilters}
            >
              <IoFilter />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="filter-badge">{activeFiltersCount}</span>
              )}
            </button>
          </div>

          {/* Collapsible Filter Panel */}
          <section
            className={`search-filter-section ${filterActive ? "active" : ""}`}
          >
            <form className="filter-form" onSubmit={handleFilterSubmit}>
              <div className="filter-column">
                <h4>Search</h4>
                <input
                  type="text"
                  name="name"
                  placeholder="Search by name"
                  value={filters.name}
                  onChange={handleFilterChange}
                  className="filter-input"
                />
              </div>

              <div className="filter-column">
                <h4>Location</h4>
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="filter-input"
                />
              </div>

              <div className="filter-column">
                <h4>Price Range</h4>
                <div className="price-inputs">
                  <input
                    type="number"
                    name="min_price"
                    placeholder="Min Price"
                    value={filters.min_price}
                    onChange={handleFilterChange}
                    className="filter-input"
                  />
                  <span className="price-separator">-</span>
                  <input
                    type="number"
                    name="max_price"
                    placeholder="Max Price"
                    value={filters.max_price}
                    onChange={handleFilterChange}
                    className="filter-input"
                  />
                </div>
              </div>

              <div className="filter-column">
                <h4>Room Type</h4>
                <select
                  name="room_type"
                  value={filters.room_type}
                  onChange={handleFilterChange}
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
              </div>

              <div className="filter-column">
                <h4>University</h4>
                <select
                  name="university_id"
                  value={filters.university_id}
                  onChange={handleFilterChange}
                  className="filter-input"
                >
                  <option value="">All Universities</option>
                  {universities.map((university) => (
                    <option
                      key={university.id}
                      value={university.id}
                      title={university.name}
                    >
                      {university.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-buttons">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="clear-filter-button"
                >
                  Clear all
                </button>
                <button type="submit" className="apply-filter-button">
                  Show results
                </button>
              </div>
            </form>
          </section>

          {/* Hostels Grid - Airbnb Style */}
          <div className="hostels-grid">
            {hostels.length === 0 ? (
              <div className="no-results">
                No hostels found matching your criteria
              </div>
            ) : (
              hostels.map((hostel) => (
                <div key={hostel.id} className="hostel-card-wrapper">
                  <NavLink to={`/hostels/${hostel.id}`} className="hostel-card">
                    <div className="hostel-image-container">
                      <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={0}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        speed={600}
                        loop={hostel.image_urls.length > 1}
                        className="hostel-swiper"
                      >
                        {hostel.image_urls.map((url, index) => (
                          <SwiperSlide key={index}>
                            <img
                              src={url}
                              alt={`${hostel.name} - Image ${index + 1}`}
                              className="hostel-image"
                              loading="lazy"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      <button
                        className={`wishlist-btn${
                          isHostelSaved(hostel.id) ? " active" : ""
                        }${animatingHearts[hostel.id] ? " animating" : ""}`}
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist(hostel);
                        }}
                        aria-label={
                          isHostelSaved(hostel.id)
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                        }
                      >
                        <svg
                          width="24"
                          height="24"
                          fill={isHostelSaved(hostel.id) ? "#ff385c" : "#444"}
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z" />
                        </svg>
                      </button>
                    </div>
                    <div className="hostel-info">
                      <div className="hostel-header">
                        <h3>{hostel.name}</h3>
                        <div className="hostel-rating">
                          <FaStar />
                          <span>
                            {hostel.average_rating || "New"} (
                            {hostel.reviews_count} reviews){" "}
                          </span>
                        </div>
                      </div>
                      <p className="hostel-location">
                        <IoLocationOutline />
                        {hostel.location}
                      </p>
                      <p className="hostel-type">{hostel.room_type}</p>
                      <p className="hostel-price">
                        <span className="price-value">
                          KES {hostel.price_per_month}
                        </span>
                        <span className="price-period">/ month</span>
                      </p>
                    </div>
                  </NavLink>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default HostelsPage;
