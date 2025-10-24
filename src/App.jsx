import React from "react";
import { Routes, Route } from "react-router-dom";
// Import files
import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import About from "./Pages/About/About";
import RoleSelection from "./Pages/RoleSelection/RoleSelection";
import StudentSignup from "./Students/Pages/Signup/StudentSignup";
import StudentLogin from "./Students/Pages/Login/StudentLogin";
import LandlordLogin from "./Landlords/Pages/Login/LandlordLogin";
import LandlordSignup from "./Landlords/Pages/Signup/LandlordSignup";
import StudentProfile from "./Students/Pages/Profile/StudentProfile";
import LandlordProfile from "./Landlords/Pages/Profile/LandlordProfle";
import GetStarted from "./Landlords/Pages/GetStarted/GetStarted";
import HostelDetails from "./Students/Pages/HostelDetails/HostelDetails";
import HostelsPage from "./Students/Pages/HostelsPage/HostelsPage";
import CreateHostel from "./Landlords/Components/CreateHostel/CreateHostel";
import ReviewForm from "./Students/Components/ReviewsManager/ReviewsForm";
import ReviewsList from "./Students/Components/ReviewsList/ReviewsList";
import PasswordResetRequest from "./Components/PasswordReset/PasswordResetRequest";
import PasswordResetConfirm from "./Components/PasswordReset/PasswordResetConfirm";
import Wishlist from "./Students/Pages/Wishlist/Wishlist";
import UpdateHostel from "./Landlords/Components/UpdateHostel/UpdateHostel";
import MyHostels from "./Landlords/Dashboard/components/MyHostels/MyHostels";
import LandlordDashboard from "./Landlords/Dashboard/HomeDashboard/LandlordDashboard";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/student/signup" element={<StudentSignup />} />
        <Route path="/landlord/signup" element={<LandlordSignup />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/landlord/login" element={<LandlordLogin />} />

        {/* Password Reset Routes */}
        <Route
          path="/student/forgot-password"
          element={<PasswordResetRequest userType="student" />}
        />
        <Route
          path="/landlord/forgot-password"
          element={<PasswordResetRequest userType="landlord" />}
        />
        <Route
          path="/student/password/edit"
          element={<PasswordResetConfirm userType="student" />}
        />
        <Route
          path="/landlord/password/edit"
          element={<PasswordResetConfirm userType="landlord" />}
        />

        <Route path="/landlord/dashboard" element={<LandlordDashboard />} />
        <Route path="/hostels" element={<HostelsPage />} />
        <Route path="/landlord-profile" element={<LandlordProfile />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/create-hostel" element={<CreateHostel />} />
        <Route path="/hostels/:id" element={<HostelDetails />} />
        <Route path="/write-review" element={<ReviewForm />} />
        <Route path="/hostels/:hostelId/reviews" element={<ReviewsList />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/landlord/hostels/:id/update" element={<UpdateHostel />} />
        <Route path="/landlord/my-hostels" element={<MyHostels />} />
      </Routes>
    </>
  );
}

export default App;
