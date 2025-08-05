import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Home, Building2, ClipboardList, Clock3 } from 'lucide-react';
import styles from './Sidebar.module.css';

const navLinks = [
  {
    name: 'Dashboard',
    path: '/landlord/dashboard',
    icon: <LayoutDashboard size={24} />,
  },
  {
    name: 'Add Hostel',
    path: '/get-started',
    icon: <Home size={24} />,
  },
  {
    name: 'My Hostels',
    path: '/landlord/my-hostels',
    icon: <Building2 size={24} />,
  },
  {
    name: 'Booked Hostels',
    path: '/landlord/dashboard/booked-hostels',
    icon: <ClipboardList size={24} />,
  },
  {
    name: 'Recent Activities',
    path: '/landlord/dashboard/recent-activites',
    icon: <Clock3 size={24} />,
  },
];

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = () => {
    setIsExpanded(true);
    document.dispatchEvent(new CustomEvent('sidebar-expand'));
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
    document.dispatchEvent(new CustomEvent('sidebar-collapse'));
  };

  return (
    <aside
      className={`${styles.sidebar} ${isExpanded ? styles.expanded : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.logo}>
        <span className={styles.logoText}>Keja Connect</span>
      </div>
      <nav className={styles.nav}>
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            <div className={styles.icon}>{link.icon}</div>
            <span className={styles.linkText}>{link.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;