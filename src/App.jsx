import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import HomePage from "./Pages/HomePage/HomePage";
import About from "./Pages/About/About";
import RoleSelection from "./Pages/RoleSelection/RoleSelection";

import StudentSignup from "./Students/Pages/Signup/StudentSignup";
import StudentLogin from "./Students/Pages/Login/StudentLogin";

import LandlordLogin from "./Landlords/Pages/Login/LandlordLogin";
import LandlordSignup from "./Landlords/Pages/Signup/LandlordSignup";

import PasswordResetRequest from "./Components/PasswordReset/PasswordResetRequest";
import PasswordResetConfirm from "./Components/PasswordReset/PasswordResetConfirm";

import StudentProfile from "./Students/Pages/Profile/StudentProfile";
import HostelsPage from "./Students/Pages/HostelsPage/HostelsPage";
import HostelDetails from "./Students/Pages/HostelDetails/HostelDetails";
import Wishlist from "./Students/Pages/Wishlist/Wishlist";
import ReviewForm from "./Students/Components/ReviewsManager/ReviewsForm";
import ReviewsList from "./Students/Components/ReviewsList/ReviewsList";

// Import new modular dashboard components
import Dashboard from "./Landlords/Dashboard1/Dashboard";
import LandlordProfile from "./Landlords/Pages/Profile/LandlordProfle";
import GetStarted from "./Landlords/Pages/GetStarted/GetStarted";
import CreateHostel from "./Landlords/Components/CreateHostel/CreateHostel";
import UpdateHostel from "./Landlords/Components/UpdateHostel/UpdateHostel";
import MyHostels from "./Landlords/Dashboard/components/MyHostels/MyHostels";

// Protected Route Component for Landlord
const ProtectedLandlordRoute = ({ children }) => {
  const token = localStorage.getItem("landlordToken") || localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  // Check if user is logged in and is a landlord
  if (!token || user.role !== "landlord") {
    return <Navigate to="/landlord/login" replace />;
  }
  
  return children;
};

// Protected Route Component for Student
const ProtectedStudentRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  // Check if user is logged in and is a student
  if (!token || user.role === "landlord") {
    return <Navigate to="/student/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/role-selection" element={<RoleSelection />} />

        {/* Student Auth Routes */}
        <Route path="/student/signup" element={<StudentSignup />} />
        <Route path="/student/login" element={<StudentLogin />} />

        {/* Landlord Auth Routes */}
        <Route path="/landlord/signup" element={<LandlordSignup />} />
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

        {/* Public Hostels Routes */}
        <Route path="/hostels" element={<HostelsPage />} />
        <Route path="/hostels/:id" element={<HostelDetails />} />
        <Route path="/hostels/:hostelId/reviews" element={<ReviewsList />} />

        {/* Protected Student Routes */}
        <Route
          path="/student/profile"
          element={
            <ProtectedStudentRoute>
              <StudentProfile />
            </ProtectedStudentRoute>
          }
        />
        <Route
          path="/student/wishlist"
          element={
            <ProtectedStudentRoute>
              <Wishlist />
            </ProtectedStudentRoute>
          }
        />
        <Route
          path="/student/write-review"
          element={
            <ProtectedStudentRoute>
              <ReviewForm />
            </ProtectedStudentRoute>
          }
        />

        {/* Protected Landlord Dashboard Routes */}
        <Route
          path="/landlord/dashboard"
          element={
            <ProtectedLandlordRoute>
              <Dashboard />
            </ProtectedLandlordRoute>
          }
        >
          {/* Nested Dashboard Routes - rendered in <Outlet /> */}
          <Route path="get_started" element={<GetStarted/>}></Route>
          <Route path="profile" element={<LandlordProfile />} />
          <Route path="my_hostels" element={<MyHostels />} />
          <Route path="add_hostels" element={<CreateHostel />} />
          <Route path="booked_hostels" element={<div>Booked Hostels Component</div>} />
          <Route path="recent_activities" element={<div>Recent Activities Component</div>} />
        </Route>

        {/* Other Landlord Routes (outside dashboard) */}
        <Route
          path="/landlord/dashboard/get-started"
          element={
            <ProtectedLandlordRoute>
              <GetStarted />
            </ProtectedLandlordRoute>
          }
        />
        <Route
          path="/create-hostel"
          element={
            <ProtectedLandlordRoute>
              <CreateHostel />
            </ProtectedLandlordRoute>
          }
        />
        <Route
          path="/landlord/hostels/:id/update"
          element={
            <ProtectedLandlordRoute>
              <UpdateHostel />
            </ProtectedLandlordRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;