import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import StudentNavbar from "../StudentNavbar/StudentNavbar";
import "./Wishlist.css";
import { FaStar } from "react-icons/fa";
import { API_ENDPOINTS } from "../../config/api";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [hostelDetails, setHostelDetails] = useState({});

  useEffect(() => {
    // Retrieve wishlist from localStorage
    const stored = localStorage.getItem("student_wishlist");
    if (stored) {
      const parsedWishlist = JSON.parse(stored);
      setWishlist(parsedWishlist);
      
      // Fetch complete hostel details for each wishlist item
      parsedWishlist.forEach(async (item) => {
        try {
          const response = await axios.get(`${API_ENDPOINTS.GENERAL.HOSTELS}/${item.id}`);
          setHostelDetails(prev => ({
            ...prev,
            [item.id]: response.data
          }));
        } catch (error) {
          console.error("Error fetching hostel details:", error);
        }
      });
    }
  }, []);

  const removeFromWishlist = (hostelId) => {
    const updated = wishlist.filter((item) => item.id !== hostelId);
    setWishlist(updated);
    localStorage.setItem("student_wishlist", JSON.stringify(updated));
  };

  return (
    <div>
      <StudentNavbar />
      <div className="wishlist-container container section">
        <h2>My Wishlist</h2>
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty. Start saving hostels you love!</p>
        ) : (
          <div className="wishlist-list">
            {wishlist.map((hostel) => {
              const details = hostelDetails[hostel.id];
              return (
                <NavLink
                  to={`/hostels/${hostel.id}`}
                  className="wishlist-item"
                  key={hostel.id}
                >
                  <img
                    src={hostel.image || "/default-hostel.jpg"}
                    alt={hostel.name}
                  />
                  <div className="hostel-rating">
                    <FaStar />
                    <span>
                      {details ? `${details.average_rating || "New"} (${details.reviews_count} reviews)` : "Loading..."}
                    </span>
                  </div>
                  <div>
                    <h3>{hostel.name}</h3>
                    <p>{hostel.location}</p>
                    <button
                      className="remove-wishlist-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        removeFromWishlist(hostel.id);
                      }}
                      style={{
                        marginTop: "0.5rem",
                        color: "var(--orange-color)",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </NavLink>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
