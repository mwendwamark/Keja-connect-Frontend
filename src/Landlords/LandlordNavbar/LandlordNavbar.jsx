import React from "react";

const LandlordNavbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <nav>
        <ul>
          <li>{user ? `Welcome, ${user.firstName}` : "Not logged in"}</li>
          {/* Other nav items */}
        </ul>
      </nav>{" "}
    </>
  );
};

export default LandlordNavbar;
