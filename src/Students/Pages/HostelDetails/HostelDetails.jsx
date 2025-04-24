import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
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
import {
  FaParking,
  FaSwimmingPool,
  FaBath,
  FaDoorOpen,
  FaStar,
  FaRegStar,
  FaEdit,
  FaTrash,
  FaDog,
} from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { MdKitchen, MdSmokeFree, MdShower } from "react-icons/md";
import { RiFirstAidKitLine, RiHotelBedFill } from "react-icons/ri";
import { BiCctv } from "react-icons/bi";
import { PiPottedPlant, PiToiletDuotone } from "react-icons/pi";
import { TbAirConditioning } from "react-icons/tb";
import { GiDesk } from "react-icons/gi";
import StudentNavbar from "../../StudentNavbar/StudentNavbar";
import RatingDisplay from "../../Components/Rating/RatingDisplay";
import "./HostelDetails.css";
import { API_ENDPOINTS } from "../../../config/api";
import { GoHeart } from "react-icons/go";

const HostelDetails = () => {
  const { id } = useParams();
  const [hostel, setHostel] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  // Get auth data from localStorage
  const token = localStorage.getItem("token");
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;
  const studentId = user ? user.id : null;

  useEffect(() => {
    const fetchHostelDetails = async () => {
      try {
        const response = await axios.get(
          `${API_ENDPOINTS.GENERAL.HOSTELS}/${id}`
        );
        setHostel(response.data);

        // Fetch reviews for this hostel
        const reviewsResponse = await axios.get(
          `${API_ENDPOINTS.GENERAL.HOSTELS}/${id}/reviews`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
        setReviews(reviewsResponse.data);

        setLoading(false);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load hostel details");
        setLoading(false);
      }
    };

    fetchHostelDetails();
  }, [id, token]);

  const handleDeleteReview = async (reviewId, event) => {
    event.preventDefault();
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await axios.delete(`${API_ENDPOINTS.GENERAL.REVIEWS}/${reviewId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReviews(reviews.filter((review) => review.id !== reviewId));
      } catch (err) {
        console.error("Error deleting review:", err);
        alert("Failed to delete review");
      }
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="star filled" />
        ) : (
          <FaRegStar key={i} className="star empty" />
        )
      );
    }
    return stars;
  };

  // Helper function to get initials from name
  const getInitials = (name) => {
    if (!name) return "A"; // Default for Anonymous
    const names = name.split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

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

  // Reserve/Booking Handler
  const handleReserve = async () => {
    if (!studentId || !token) {
      setBookingError("You must be logged in as a student to reserve a hostel.");
      return;
    }
    setBookingLoading(true);
    setBookingError(null);
    try {
      const response = await axios.post(
        `${API_ENDPOINTS.GENERAL.BOOKINGS}`,
        {
          booking: {
            hostel_id: hostel.id,
            start_date: new Date().toISOString().slice(0, 10), // today, or prompt for date
            end_date: null // or prompt for date if needed
          }
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setBookingStatus(response.data.status);
    } catch (err) {
      setBookingError(
        err.response?.data?.errors?.[0] || "Failed to submit booking request."
      );
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
  if (!hostel) return <div className="text-center p-8">Hostel not found</div>;

  return (
    <>
      <Helmet>
        <title>{`${hostel.name} | Affordable Student Hostel near ${hostel.university_name}`}</title>
        <meta
          name="description"
          content={`Find ${hostel.name}, an affordable student hostel in ${
            hostel.location
          } near ${hostel.university_name}. ${hostel.description.substring(
            0,
            150
          )}...`}
        />
        <meta
          name="keywords"
          content={`${hostel.name}, ${hostel.university_name}, student hostel, affordable accommodation, ${hostel.location}, ${hostel.room_type}, hostel booking`}
        />
      </Helmet>
      <StudentNavbar />
      <div className="hostel-details-container container section">
        {/* Header Section */}
        <div className="hostel-header-container">
          <div className="hostel-header">
            <h1 className="hostel-name">{hostel.name}</h1>
            <p className="save-hostel">
              <GoHeart />
              <span>Save</span>
            </p>
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
        <div className="hostel-brief-info">
          <div className="hostel-brief-info-contents">
            <p className="hostel-type">{hostel.room_type}</p>

            {/* Updated location section with distance integration */}
            <div className="hostel-location-with-distance">
              <div className="hostel-location">
                <IoLocationOutline className="location-icon" />
                <p>{hostel.location}</p>
              </div>
              <span className="location-divider"></span>
              <p>
                <span className="university-name">{hostel.university_name}</span>
                <span> · </span>
                <span className="distance-badge">{hostel.distance_to_university} km</span>
              </p>
            </div>
            <RatingDisplay
              rating={hostel.average_rating}
              reviewsCount={hostel.reviews_count}
            />
          </div>

          <div className="book-now">
            <button
              className="book-now-button"
              onClick={handleReserve}
              disabled={bookingLoading || bookingStatus === 'pending'}
            >
              {bookingLoading ? 'Submitting...' : bookingStatus === 'pending' ? 'Awaiting Approval' : 'Reserve'}
            </button>
            {bookingStatus === 'pending' && (
              <div className="booking-status-message" style={{ color: 'var(--orange-color)', marginTop: '0.5rem' }}>
                Your booking request has been submitted and is awaiting landlord approval.
              </div>
            )}
            {bookingError && (
              <div className="booking-error-message" style={{ color: 'red', marginTop: '0.5rem' }}>
                {bookingError}
              </div>
            )}
          </div>
        </div>

        {/* Details Section */}
        <div className="hostel-details-grid section">
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
          
          {/* Description Section */}
          <div className="hostel-description">
            <h2>Description</h2>
            <p>{hostel.description}</p>
          </div>
        </div>

        {/* Reviews Section - Airbnb Style with Avatars */}
        <div className="hostel-reviews">
          <div className="reviews-header">
            <h2>Reviews</h2>
            {studentId && (
              <NavLink
                to={`/write-review?hostelId=${id}`}
                className="add-review-button"
              >
                Write a Review
              </NavLink>
            )}
          </div>

          {reviews.length === 0 ? (
            <p className="no-reviews">
              No reviews yet.{" "}
              {studentId
                ? "Be the first to leave a review!"
                : "Log in to leave a review."}
            </p>
          ) : (
            <div className="reviews-list">
              {reviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div className="user-avatar">
                      {getInitials(review.student?.name)}
                    </div>
                    <div className="review-author-info">
                      <div className="review-author">
                        {review.student?.name || "Anonymous"}
                      </div>
                      <div className="review-date">
                        {new Date(review.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="review-rating">
                    {renderStars(review.rating)}
                  </div>

                  <div className="review-comment">{review.comment}</div>

                  {studentId === review.student?.id && (
                    <div className="review-actions">
                      <NavLink
                        to={`/reviews/${review.id}/edit`}
                        className="review-action-link"
                      >
                        <FaEdit /> Edit
                      </NavLink>
                      <a
                        href="#"
                        onClick={(e) => handleDeleteReview(review.id, e)}
                        className="review-action-link delete"
                      >
                        <FaTrash /> Delete
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HostelDetails;