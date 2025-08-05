# Dashboard Layout System

This directory contains the responsive dashboard layout system that coordinates the sidebar and main content areas.

## Components

### DashboardLayout.jsx
The main layout component that:
- Manages the responsive behavior between sidebar and main content
- Listens for sidebar hover events to adjust main content positioning
- Provides a consistent layout wrapper for all dashboard pages

### DashboardLayout.module.css
Contains the styling for:
- Main content area that responds to sidebar width changes
- Smooth transitions when sidebar expands/collapses
- Mobile responsiveness
- Content wrapper with proper spacing and styling

## How It Works

1. **Sidebar Hover Detection**: The sidebar dispatches custom events (`sidebar-expand` and `sidebar-collapse`) when hovered
2. **Layout Response**: DashboardLayout listens for these events and applies the `expanded` class to the main content
3. **CSS Transitions**: The main content smoothly transitions its `margin-left` from 80px to 260px
4. **Mobile Responsiveness**: On mobile devices, the layout adapts to full-width content

## Usage

Wrap any dashboard page content with the DashboardLayout component:

```jsx
import DashboardLayout from '../components/Layout/DashboardLayout';

const MyDashboardPage = () => {
  return (
    <DashboardLayout>
      {/* Your dashboard content here */}
    </DashboardLayout>
  );
};
```

## CSS Classes

- `.dashboardLayout`: The main container
- `.mainContent`: The content area that responds to sidebar changes
- `.mainContent.expanded`: Applied when sidebar is expanded
- `.contentWrapper`: Inner wrapper for dashboard content

## Responsive Behavior

- **Desktop**: Main content adjusts margin based on sidebar state
- **Mobile**: Full-width layout with sidebar overlay
- **Tablet**: Responsive grid adjustments for better content display 