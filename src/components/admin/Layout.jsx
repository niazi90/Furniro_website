import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search
} from 'lucide-react';
import './Layout.css';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Package, label: 'Products', path: '/admin/products' },
    { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
    { icon: MessageSquare, label: 'Inquiries', path: '/admin/inquiries' },
    { icon: Users, label: 'Customers', path: '/admin/customers' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="dashboard_layout-container">
      {/* Sidebar */}
      <aside className={`dashboard_sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="dashboard_sidebar-header">
          <h1 className="dashboard_logo">Admin Panel</h1>
          <button onClick={() => setSidebarOpen(false)} className="dashboard_close-btn">
            <X />
          </button>
        </div>

        <nav className="dashboard_sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`dashboard_nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon className="dashboard_nav-icon" />
                <span className="dashboard_nav-label">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="dashboard_sidebar-footer">
          <div className="dashboard_user-info">
            <div className="dashboard_user-avatar">{admin?.name?.charAt(0)}</div>
            <div className="dashboard_user-details">
              <p className="dashboard_user-name">{admin?.name}</p>
              <p className="dashboard_user-email">{admin?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="dashboard_logout-btn">
            <LogOut className="dashboard_logout-icon" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="dashboard_main-content">
        <header className="dashboard_header">
          <div className="dashboard_header-content">
            <button onClick={() => setSidebarOpen(true)} className="dashboard_menu-btn">
              <Menu />
            </button>

            <div className="dashboard_search-bar">
              <Search className="dashboard_search-icon" />
              <input type="text" placeholder="Search..." className="dashboard_search-input" />
            </div>

            <button className="dashboard_notification-btn">
              <Bell />
              <span className="dashboard_notification-dot"></span>
            </button>
          </div>
        </header>

        <main className="dashboard_page-content">{children}</main>
      </div>

      {sidebarOpen && <div className="dashboard_overlay" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
};

export default Layout;
