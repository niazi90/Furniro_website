import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
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
  Search,
} from "lucide-react";
import "./Layout.css";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Package, label: "Products", path: "/admin/products" },
    { icon: ShoppingCart, label: "Orders", path: "/admin/orders" },
    { icon: MessageSquare, label: "Inquiries", path: "/admin/inquiries" },
    { icon: Users, label: "Customers", path: "/admin/customers" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="dashboard_layout">
      {/* Sidebar */}
      <aside className={`dashboard_sidebar ${sidebarOpen ? "open" : ""}`}>
        {/* Logo */}
        <div className="dashboard_sidebar-header">
          <h1>Admin Panel</h1>
          <button className="dashboard_close-btn" onClick={() => setSidebarOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Menu */}
        <nav className="dashboard_sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`dashboard_nav-item ${isActive ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="dashboard_sidebar-footer">
          <div className="dashboard_user-info">
            <div className="dashboard_avatar">
              {admin?.name?.charAt(0)}
            </div>
            <div>
              <p className="dashboard_user-name">{admin?.name}</p>
              <p className="dashboard_user-email">{admin?.email}</p>
            </div>
          </div>

          <button className="dashboard_logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="dashboard_main">
        {/* Header */}
        <header className="dashboard_header">
          <button
            className="dashboard_menu-btn"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>

          <div className="dashboard_search-box">
            <Search size={18} />
            <input type="text" placeholder="Search..." />
          </div>

          <button className="dashboard_notif-btn">
            <Bell size={22} />
            <span className="dashboard_dot"></span>
          </button>
        </header>

        {/* Content */}
        <main className="dashboard_content">{children}</main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="dashboard_overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
