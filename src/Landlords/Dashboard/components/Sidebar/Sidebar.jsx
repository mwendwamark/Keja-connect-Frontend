import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,  
  Home,
  Building2,
  ClipboardList,
  Clock3,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import styles from "./Sidebar.module.css";
import { MdDashboard } from "react-icons/md";

const navigationLinks = [
  {
    name: "Dashboard",
    path: "/landlord/dashboard",
    icon: MdDashboard,
    exact: true,
  },
  {
    name: "Add Hostel",
    path: "/get-started",
    icon: Home,
  },
  {
    name: "My Hostels",
    path: "/landlord/my-hostels",
    icon: Building2,
  },
  {
    name: "Booked Hostels",
    path: "/landlord/dashboard/booked-hostels",
    icon: ClipboardList,
  },
  {
    name: "Recent Activities",
    path: "/landlord/dashboard/recent-activites",
    icon: Clock3,
  },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={`${styles.landlordSidebar} ${
        isCollapsed ? styles.collapsed : ""
      }`}
    >
      {/* Logo Section */}
      <div className={styles.sidebarLogoSection}>
        <span className={styles.sidebarLogoText}>Keja Connect</span>
        <button
          className={styles.sidebarToggleButton}
          onClick={toggleSidebar}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className={styles.sidebarLinksWrapper}>
        <span className={styles.sidebarSectionLabel}>Navigation</span>
        <nav className={styles.sidebarNavigation}>
          {navigationLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.exact}
                className={({ isActive }) =>
                  `${styles.sidebarNavLink} ${
                    isActive ? styles.activeNavLink : ""
                  }`
                }
                data-label={link.name}
              >
                <div className={styles.navLinkIcon}>
                  <IconComponent size={20} />
                </div>
                <span className={styles.navLinkText}>{link.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
