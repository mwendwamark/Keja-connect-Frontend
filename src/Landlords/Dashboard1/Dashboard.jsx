import { Outlet } from "react-router-dom";
import "./Dashboard.css";
import Sidebar from "./Sidebar/SideBar";
import TopDash from "./TopDash/TopDash";
import { useState } from "react";
const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="dashboard-container">
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main
        className={`dashboard-main-content ${
          isCollapsed ? "sidebar-collapsed" : ""
        }`}
      >
        <TopDash />
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
