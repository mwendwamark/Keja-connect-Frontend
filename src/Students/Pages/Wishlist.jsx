import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import StudentNavbar from "../StudentNavbar/StudentNavbar";
import "./Wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Retrieve wishlist from localStorage
    const stored = localStorage.getItem("student_wishlist");
    if (stored) {
      setWishlist(JSON.parse(stored));
    }
  }, []);

  const removeFromWishlist = (hostelId) => {
    const updated = wishlist.filter(item => item.id !== hostelId);
    setWishlist(updated);
    localStorage.setItem("student_wishlist", JSON.stringify(updated));
  };

  return (
    <div>
      <StudentNavbar />
      <div className="wishlist-container">
        <h2>My Wishlist</h2>
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty. Start saving hostels you love!</p>
        ) : (
          <div className="wishlist-list">
            {wishlist.map((hostel) => (
              <div className="wishlist-item" key={hostel.id}>
                <img src={hostel.image || "/default-hostel.jpg"} alt={hostel.name} />
                <div>
                  <h3>{hostel.name}</h3>
                  <p>{hostel.location}</p>
                  <NavLink to={`/hostels/${hostel.id}`}>View Details</NavLink>
                  <button
                    className="remove-wishlist-btn"
                    onClick={() => removeFromWishlist(hostel.id)}
                    style={{marginTop: '0.5rem', color: 'var(--orange-color)'}}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
