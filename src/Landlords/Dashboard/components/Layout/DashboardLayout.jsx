import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import styles from './DashboardLayout.module.css';

const DashboardLayout = ({ children }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  useEffect(() => {
    const handleSidebarExpand = () => setIsSidebarExpanded(true);
    const handleSidebarCollapse = () => setIsSidebarExpanded(false);

    // Listen for custom events from the sidebar
    document.addEventListener('sidebar-expand', handleSidebarExpand);
    document.addEventListener('sidebar-collapse', handleSidebarCollapse);

    return () => {
      document.removeEventListener('sidebar-expand', handleSidebarExpand);
      document.removeEventListener('sidebar-collapse', handleSidebarCollapse);
    };
  }, []);

  return (
    <div className={styles.dashboardLayout}>
      <Sidebar />
      <main className={`${styles.mainContent} ${isSidebarExpanded ? styles.expanded : ''}`}>
        <div className={styles.contentWrapper}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout; 