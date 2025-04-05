// import React, { useEffect, useState } from "react";
// import { Helmet } from "react-helmet";
// import axios from "axios";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "./HostelsPage.css";
// import StudentNavbar from "../../StudentNavbar/StudentNavbar";
// import { IoLocationOutline } from "react-icons/io5";
// import RatingDisplay from "../../Components/Rating/RatingDisplay";
// import { NavLink } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import { API_ENDPOINTS } from "../../../config/api";

// const HostelsPage = () => {
//   const [hostels, setHostels] = useState([]);
//   const [filters, setFilters] = useState({
//     name: "",
//     location: "",
//     min_price: "",
//     max_price: "",
//     room_type: "",
//     university_id: ""
//   });

//   const [universities, setUniversities] = useState([]);
//   const [filterActive, setFilterActive] = useState(false);
//   const [activeFiltersCount, setActiveFiltersCount] = useState(0);

//   useEffect(() => {
//     let count = 0;
//     Object.values(filters).forEach(value => {
//       if (value !== "" && value !== undefined) count++;
//     });
//     setActiveFiltersCount(count);
//   }, [filters]);

//   const toggleFilters = () => {
//     setFilterActive(!filterActive);
//   };

//   const fetchHostels = async (filterParams = {}) => {
//     try {
//       const response = await axios.get(API_ENDPOINTS.GENERAL.HOSTELS, {
//         params: {
//           ...filterParams,
//           university_id: filters.university_id || undefined
//         }
//       });
//       const updatedHostels = response.data.map((hostel) => {
//         const uniqueImages = [...new Set(hostel.image_urls)];
//         return { ...hostel, image_urls: uniqueImages };
//       });
//       setHostels(updatedHostels);

//       // Fetch universities if not already fetched
//       if (universities.length === 0) {
//         const universitiesResponse = await axios.get(API_ENDPOINTS.GENERAL.UNIVERSITIES);
//         setUniversities(universitiesResponse.data);
//       }
//     } catch (error) {
//       console.error("Error fetching hostels:", error);
//     }
//   };

//   useEffect(() => {
//     fetchHostels();
//   }, []);

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleFilterSubmit = (e) => {
//     e.preventDefault();
//     fetchHostels(filters);
//   };

//   const clearFilters = () => {
//     setFilters({
//       name: "",
//       location: "",
//       min_price: "",
//       max_price: "",
//       room_type: "",
//       university_id: ""
//     });
//     fetchHostels();
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Student Hostels in Kenya | Affordable Accommodation</title>
//         <meta
//           name="description"
//           content="Find affordable student hostels near universities across Kenya. Browse by location, price, and room type. Book your ideal hostel today!"
//         />
//         <meta
//           name="keywords"
//           content="student hostels, affordable hostels, university accommodation, Kenya hostels, hostel booking"
//         />
//         <link rel="canonical" href="https://kejaconnect.vercel.app/hostels" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <meta name="robots" content="index, follow" />

//         <meta property="og:type" content="website" />
//         <meta property="og:url" content="https://kejaconnect.vercel.app/hostels" />
//         <meta
//           property="og:title"
//           content="Student Hostels in Kenya Near Universities | Affordable Accommodation | Variety of Hostels"
//         />
//         <meta
//           property="og:description"
//           content="Find affordable student hostels near universities across Kenya. Browse by location, price, and room type. Book your ideal hostel today!"
//         />
//         {/* Og image */}
//         {/* <meta
//           property="og:image"
//           content="https://www.yourwebsite.com/images/hostels-og-image.jpg"
//         /> */}
//       </Helmet>
//       <StudentNavbar />
//       <div className="hostels-page container">
        
//         <div className="filter-toggle-container">
//           <h1>Available Hostels</h1>
//           <button 
//             className={`filter-toggle-btn ${filterActive ? 'active' : ''}`} 
//             onClick={toggleFilters}
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
//             </svg>
//             Filters
//             {activeFiltersCount > 0 && (
//               <span className="filter-badge">{activeFiltersCount}</span>
//             )}
//           </button>
//         </div>

//         <section className={`search-filter-section ${filterActive ? 'active' : ''}`}>
//           <form className="filter-form" onSubmit={handleFilterSubmit}>
//             <input
//               type="text"
//               name="name"
//               placeholder="Search by name"
//               value={filters.name}
//               onChange={handleFilterChange}
//               className="filter-input"
//             />
//             <input
//               type="text"
//               name="location"
//               placeholder="Location"
//               value={filters.location}
//               onChange={handleFilterChange}
//               className="filter-input"
//             />
//             <input
//               type="number"
//               name="min_price"
//               placeholder="Min Price"
//               value={filters.min_price}
//               onChange={handleFilterChange}
//               className="filter-input"
//             />
//             <input
//               type="number"
//               name="max_price"
//               placeholder="Max Price"
//               value={filters.max_price}
//               onChange={handleFilterChange}
//               className="filter-input"
//             />
//             <select
//               name="room_type"
//               value={filters.room_type}
//               onChange={handleFilterChange}
//               className="filter-input"
//             >
//               <option value="">All Room Types</option>
//               <option value="Single Room">Single Room</option>
//               <option value="Double Room">Double Room</option>
//               <option value="Bedsitter">Bedsitter</option>
//               <option value="One Bedroom">One Bedroom</option>
//               <option value="Two Bedroom">Two Bedroom</option>
//               <option value="Three Bedroom">Three Bedroom</option>
//             </select>
//             <div className="filter-group">
//               <h4>University</h4>
//               <select
//                 name="university_id"
//                 value={filters.university_id}
//                 onChange={handleFilterChange}
//                 className="university-filter"
//               >
//                 <option value="">All Universities</option>
//                 {universities.map(university => (
//                   <option 
//                     key={university.id} 
//                     value={university.id}
//                     title={university.name}
//                   >
//                     {university.name}
//                   </option>
//                 ))}
//               </select>
//               <p className="filter-hint">
//                 Select a university to find hostels nearby
//               </p>
//             </div>

//             <div className="filter-buttons">
//               <button type="submit" className="filter-button">
//                 Apply Filters
//               </button>
//               <button
//                 type="button"
//                 onClick={clearFilters}
//                 className="filter-button reset-button"
//               >
//                 Reset Filters
//               </button>
//             </div>
//           </form>
//         </section>

//         {/* Hostels List */}
//         <div className="hostels-container">
//           {hostels.map((hostel) => (
//             <NavLink
//               to={`/hostels/${hostel.id}`}
//               key={hostel.id}
//               className="hostels-card"
//             >
//               <Swiper
//                 modules={[Navigation, Pagination, Autoplay]}
//                 spaceBetween={10}
//                 slidesPerView={1}
//                 navigation={true}
//                 pagination={{ clickable: true }}
//                 // autoplay={{ delay: 3000 }}
//                 speed={1800}
//               >
//                 {hostel.image_urls.map((url, index) => (
//                   <SwiperSlide key={index}>
//                     <img
//                       src={url}
//                       alt={`${hostel.name} hostel in ${
//                         hostel.location
//                       } - Image ${index + 1}`}
//                       className="hostels-swiper"
//                       loading="lazy"
//                     />
//                   </SwiperSlide>
//                 ))}
//               </Swiper>{" "}
//               <div className="hostels-info">
//                 <div className="name-price">
//                   <h3>{hostel.name}</h3>
//                   <p>
//                     <span>KES </span>
//                     {hostel.price_per_month}/ Month
//                   </p>
//                 </div>

//                 <p>{hostel.room_type}</p>

//                 <p className="location-info">
//                   <IoLocationOutline />
//                   {hostel.location}
//                 </p>
//                 <RatingDisplay
//                   rating={hostel.average_rating}
//                   reviewsCount={hostel.reviews_count}
//                 />
//                 <div className="hostels-images"></div>
//               </div>
//             </NavLink>
//           ))}
//         </div>
//       </div>
//       <ToastContainer/>
//     </>
//   );
// };

// export default HostelsPage;

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
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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
    university_id: ""
  });

  const [universities, setUniversities] = useState([]);
  const [filterActive, setFilterActive] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  useEffect(() => {
    let count = 0;
    Object.values(filters).forEach(value => {
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
          university_id: filters.university_id || undefined
        }
      });
      const updatedHostels = response.data.map((hostel) => {
        const uniqueImages = [...new Set(hostel.image_urls)];
        return { ...hostel, image_urls: uniqueImages };
      });
      setHostels(updatedHostels);

      // Fetch universities if not already fetched
      if (universities.length === 0) {
        const universitiesResponse = await axios.get(API_ENDPOINTS.GENERAL.UNIVERSITIES);
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
    setFilters(prev => ({
      ...prev,
      [name]: value
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
      university_id: ""
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
      </Helmet>
      <StudentNavbar />
      <div className="hostels-page container">
        {/* Filter Bar - Airbnb Style */}
        <div className="filter-bar">
          <button 
            className={`filter-main-btn ${filterActive ? 'active' : ''}`} 
            onClick={toggleFilters}
          >
            <IoFilter />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="filter-badge">{activeFiltersCount}</span>
            )}
          </button>
          
          {/* <div className="quick-filters">
            <button className="quick-filter-btn">Price</button>
            <button className="quick-filter-btn">Room Type</button>
            <button className="quick-filter-btn">University</button>
            <button className="quick-filter-btn">Rating</button>
            <button className="quick-filter-btn">Amenities</button>
          </div> */}
        </div>

        {/* Collapsible Filter Panel */}
        <section className={`search-filter-section ${filterActive ? 'active' : ''}`}>
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
                {universities.map(university => (
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
            <div className="no-results">No hostels found matching your criteria</div>
          ) : (
            hostels.map((hostel) => (
              <NavLink
                to={`/hostels/${hostel.id}`}
                key={hostel.id}
                className="hostel-card"
              >
                <div className="hostel-image-container">
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    // navigation={true}
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
                  <button className="favorite-btn">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                      <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
                    </svg>
                  </button>
                </div>
                <div className="hostel-info">
                  <div className="hostel-header">
                    <h3>{hostel.name}</h3>
                    <div className="hostel-rating">
                      <FaStar /> 
                      <span>{hostel.average_rating || "New"} ({hostel.reviews_count} reviews) </span>
                    </div>
                  </div>
                  <p className="hostel-location">
                    <IoLocationOutline />
                    {hostel.location}
                  </p>
                  <p className="hostel-type">{hostel.room_type}</p>
                  <p className="hostel-price">
                    <span className="price-value">KES {hostel.price_per_month}</span>
                    <span className="price-period">/ month</span>
                  </p>
                </div>
              </NavLink>
            ))
          )}
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};

export default HostelsPage;