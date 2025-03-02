import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import {
  IoLocationOutline,
  IoWifiOutline,
  IoWaterOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { FaParking, FaSwimmingPool, FaBath, FaDoorOpen } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { MdKitchen, MdSmokeFree, MdShower } from "react-icons/md";
import { RiFirstAidKitLine, RiHotelBedFill } from "react-icons/ri";
import { BiCctv } from "react-icons/bi";
import { PiPottedPlant, PiToiletDuotone } from "react-icons/pi";
import { TbAirConditioning } from "react-icons/tb";
import { FaDog } from "react-icons/fa";
import { GiHomeGarage, GiDesk } from "react-icons/gi";
import StudentNavbar from "../../StudentNavbar/StudentNavbar";
import RatingDisplay from "../../Components/Rating/RatingDisplay";
import "./HostelDetails.css";

const HostelDetails = () => {
  const { id } = useParams();
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHostelDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/hostels/${id}`);
        setHostel(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load hostel details");
        setLoading(false);
      }
    };

    fetchHostelDetails();
  }, [id]);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
  if (!hostel) return <div className="text-center p-8">Hostel not found</div>;

  // Helper function to render amenities
  const renderAmenity = (icon, label, available) => {
    if (available) {
      return (
        <div className="amenity-item">
          <span className="amenity-icon">{icon}</span>
          <span className="amenity-label">{label}</span>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <StudentNavbar />
      <div className="hostel-details-container container section">
        {/* Header Section */}
        <div className="hostel-header-container">
          <div className="hostel-header">
            <h1 className="hostel-name">{hostel.name}</h1>
            <div className="hostel-location">
              <IoLocationOutline className="location-icon" />
              <p>{hostel.location}</p>
            </div>
            <RatingDisplay
              rating={hostel.average_rating}
              reviewsCount={hostel.reviews_count}
            />
          </div>
          <div className="book-now">
            <NavLink to="/book-now" className="book-now-button">
              {" "}
              Reserve
            </NavLink>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="hostel-image-gallery">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
          >
            {hostel.image_urls?.map((url, index) => (
              <SwiperSlide key={index}>
                <img
                  src={url}
                  alt={`${hostel.name} view ${index + 1}`}
                  className="hostel-image"
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Details Section */}
        <div className="hostel-details-grid">
          {/* Overview Section */}
          <div className="hostel-overview">
            <h2>Overview</h2>
            <div className="overview-grid">
              <div className="overview-item">
                <p className="overview-label">Room Type</p>
                <p className="overview-value">{hostel.room_type}</p>
              </div>
              <div className="overview-item">
                <p className="overview-label">Price per Month</p>
                <p className="overview-value">KES {hostel.price_per_month}</p>
              </div>
              <div className="overview-item">
                <p className="overview-label">Available Units</p>
                <p className="overview-value">{hostel.available_units}</p>
              </div>
              <div className="overview-item">
                <p className="overview-label">Bedrooms</p>
                <p className="overview-value">{hostel.bedrooms}</p>
              </div>
              <div className="overview-item">
                <p className="overview-label">Deposit Amount</p>
                <p className="overview-value">KES {hostel.deposit_amount}</p>
              </div>
              <div className="overview-item">
                <p className="overview-label">Electricity Billing</p>
                <p className="overview-value">{hostel.electricity_billing}</p>
              </div>
              <div className="overview-item">
                <p className="overview-label">Max Occupancy</p>
                <p className="overview-value">{hostel.max_occupancy}</p>
              </div>
              <div className="overview-item">
                <p className="overview-label">Furnishing</p>
                <p className="overview-value">{hostel.furnishing}</p>
              </div>
            </div>
          </div>
          {/* Amenities Section */}
         <div className="hostel-amenities">
            <h2>Available Amenities</h2>
            <div className="amenities-grid">
              {renderAmenity(<IoWifiOutline />, "Wi-Fi", hostel.wifi)}
              {renderAmenity(<FaParking />, "Parking", hostel.parking)}
              {renderAmenity(
                <IoShieldCheckmarkOutline />,
                "Security",
                hostel.security
              )}
              {renderAmenity(<MdKitchen />, "Kitchen", hostel.kitchen)}
              {renderAmenity(
                <IoWaterOutline />,
                "Good Water Supply",
                hostel.water_supply
              )}
              {renderAmenity(
                <FaSwimmingPool />,
                "Swimming Pool",
                hostel.swimming_pool
              )}
              {renderAmenity(<CgGym />, "Gym", hostel.gym)}
              {renderAmenity(<FaBath />, "Bathroom", hostel.bathroom)}
              {renderAmenity(<FaDoorOpen />, "Wardrobe", hostel.wardrobe)}
              {renderAmenity(<PiPottedPlant />, "Garden", hostel.garden)}
              {renderAmenity(
                <MdSmokeFree />,
                "Smoke Alarm",
                hostel.smoke_alarm
              )}
              {renderAmenity(
                <RiFirstAidKitLine />,
                "First Aid Kit",
                hostel.first_aid_kit
              )}
              {renderAmenity(<MdShower />, "Hot Shower", hostel.hot_shower)}
              {renderAmenity(<BiCctv />, "CCTV Cameras", hostel.cctv_cameras)}
              {renderAmenity(
                <RiHotelBedFill />,
                "Laundry Services",
                hostel.laundry_services
              )}
              {renderAmenity(<FaDog />, "Pet Friendly", hostel.pet_friendly)}
              {renderAmenity(
                <TbAirConditioning />,
                "Air Conditioner",
                hostel.air_conditioner
              )}
              {renderAmenity(<PiToiletDuotone />, "Toilet", hostel.toilet)}
              {renderAmenity(<GiDesk />, "Study Room", hostel.study_room)}
              {renderAmenity(<PiPottedPlant />, "Balcony", hostel.balcony)}
            </div>
          </div>
          {/* Nearby Facilities Section */}{" "}
          <div className="hostel-distance-calculation">
            <p>
              Distance to <span>{hostel.university_name}</span>{" "}
            </p>
            <p>
              {" "}
              <span> {hostel.distance_to_university}</span> km from the
              university
            </p>
          </div>

          {/* Nearby Facilities Section */}
          <div className="hostel-nearby-facilities">
            <h2>Nearby Facilities</h2>
            <p>{hostel.nearby_facilities}</p>
          </div>
          {/* Rules Section */}
          <div className="hostel-rules">
            <h2>Rules</h2>
            <p>{hostel.rules}</p>
          </div>


          {/* description Section */}
           <div className="hostel-description">
            <h2>Description</h2>
            <p>{hostel.description}</p>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="hostel-reviews">
          <h2>Reviews</h2>
          {hostel.reviews?.length > 0 ? (
            hostel.reviews.map((review, index) => (
              <div key={index} className="review">
                <p className="review-author">{review.author}</p>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))
          ) : (
            <p>
              No reviews yet. Be the first to leave a{" "}
              <NavLink to="/leave-review">review</NavLink>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default HostelDetails;