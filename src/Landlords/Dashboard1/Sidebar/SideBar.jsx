import { useRef, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  PlusCircle,
  Calendar,
  Activity,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut,
  UserCircle,
  LayoutDashboard,
  
} from "lucide-react";
import "./Sidebar.css";

const SideBar = ({
  isCollapsed,
  setIsCollapsed,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const [user, setUser] = useState(null);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from localStorage
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setUser({
      first_name: userData.first_name || "",
      last_name: userData.last_name || "",
      email: userData.email || "",
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowLogoutPopup(false);
      }
    };

    if (showLogoutPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLogoutPopup]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Clear all auth data
      localStorage.removeItem("landlordToken");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("landlord_id");

      // Redirect to login
      navigate("/landlord/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navigationLinks = [
    {
      path: "/landlord/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
      exact: true,
    },
    {
      path: "/landlord/dashboard/my_hostels",
      icon: Home,
      label: "My Hostels",
    },
    {
      path: "/landlord/dashboard/add_hostels",
      icon: PlusCircle,
      label: "Add Hostels",
    },
    {
      path: "/landlord/dashboard/booked_hostels",
      icon: Calendar,
      label: "Booked Hostels",
    },
    {
      path: "/landlord/dashboard/recent_activities",
      icon: Activity,
      label: "Recent Activities",
    },
  ];

  const renderAvatar = (size) => {
    const initials = user
      ? `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`
      : "LD";

    return (
      <div
        className="sidebar-user-avatar"
        style={{ width: size, height: size }}
      >
        {initials}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="mobile-header">
        <button
          className="mobile-header-icon"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={28} weight="bold" />
        </button>
        <div className="mobile-header-logo">KejaConnect</div>
        <div style={{ width: "40px" }} />
      </header>

      {/* Sidebar Overlay */}
      <div
        className={`sidebar-overlay ${isMobileMenuOpen ? "active" : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`sidebar ${isCollapsed ? "collapsed" : ""} ${
          isMobileMenuOpen ? "mobile-open" : ""
        }`}
      >
        {/* Logo Section */}
        <div className="sidebar-logo-section">
          {!isCollapsed && <div className="sidebar-logo-text">KejaConnect</div>}
          <button
            className="toggle-btn desktop-only"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
          {isMobileMenuOpen && (
            <button
              className="toggle-btn mobile-close-btn"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <div className="sidebar-links">
          {!isCollapsed && (
            <span className="sidebar-section-label">Navigation</span>
          )}
          <nav className="sidebar-navigation-links">
            {navigationLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.exact}
                  className={({ isActive }) =>
                    `sidebar-nav-link ${isActive ? "active" : ""}`
                  }
                  title={isCollapsed ? link.label : ""}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon size={20} />
                  {!isCollapsed && <p>{link.label}</p>}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Section */}
        <div className="sidebar-bottom-wrapper">
          <button
            className="sidebar-bottom"
            onClick={() => setShowLogoutPopup(!showLogoutPopup)}
          >
            {renderAvatar(40)}
            {!isCollapsed && (
              <div className="sidebar-user-info">
                <p className="sidebar-user-name">
                  {user
                    ? `${user.first_name || ""} ${
                        user.last_name || ""
                      }`.trim() || "User"
                    : "Loading..."}
                </p>
                <p className="sidebar-user-role">Landlord</p>
              </div>
            )}
          </button>

          {/* Logout Popup */}
          {showLogoutPopup && (
            <div
              className={`logout-popup ${isCollapsed ? "collapsed" : ""}`}
              ref={popupRef}
            >
              <div className="logout-popup-content">
                <div className="logout-popup-header">
                  <div className="logout-avatar">{renderAvatar(48)}</div>
                  <div className="logout-user-info">
                    <p className="logout-user-name">
                      {user
                        ? `${user.first_name || ""} ${
                            user.last_name || ""
                          }`.trim() || "User"
                        : "Loading..."}
                    </p>
                    <p className="logout-user-email">{user?.email || ""}</p>
                  </div>
                </div>

                <div className="logout-popup-actions">
                  <NavLink
                    to="/landlord/dashboard/profile"
                    className="logout-popup-link"
                    onClick={() => {
                      setShowLogoutPopup(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <UserCircle size={20} />
                    <span>View Profile</span>
                  </NavLink>

                  <button
                    className="logout-button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                  >
                    <LogOut size={18} />
                    <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default SideBar;
