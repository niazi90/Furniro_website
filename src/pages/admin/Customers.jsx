import React, { useState, useEffect } from "react";
import { ordersAPI } from "../../services/api";
import { Search, Mail, Phone, MapPin, ShoppingBag, AlertCircle, RotateCw } from "lucide-react";
import { format } from "date-fns";
import "./Customers.css";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setError("");
      setLoading(true);
      console.log('📨 Loading customers...');
      
      // Get all orders to extract unique customers
      const response = await ordersAPI.getAll();
      const orders = response.data.data || [];
      
      // Extract unique customers from orders
      const customersMap = new Map();
      
      orders.forEach(order => {
        if (order.billingDetails?.email) {
          const email = order.billingDetails.email;
          if (!customersMap.has(email)) {
            customersMap.set(email, {
              _id: order._id,
              name: `${order.billingDetails.firstName} ${order.billingDetails.lastName}`,
              firstName: order.billingDetails.firstName,
              lastName: order.billingDetails.lastName,
              email: order.billingDetails.email,
              phone: order.billingDetails.phone,
              address: order.billingDetails.address || order.billingDetails.streetAddress,
              city: order.billingDetails.townCity,
              country: order.billingDetails.country,
              orderCount: 1,
              totalSpent: order.total,
              lastOrderDate: order.createdAt,
              orders: [order]
            });
          } else {
            const customer = customersMap.get(email);
            customer.orderCount += 1;
            customer.totalSpent += order.total;
            customer.lastOrderDate = order.createdAt;
            customer.orders.push(order);
          }
        }
      });
      
      setCustomers(Array.from(customersMap.values()));
      console.log('✅ Customers loaded:', customersMap.size);
    } catch (error) {
      console.error("❌ Error loading customers:", error);
      setError(error.response?.data?.message || "Failed to load customers");
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="customers-page">
      {/* Error Message */}
      {error && (
        <div className="error-banner">
          <AlertCircle size={20} />
          <span>{error}</span>
          <button onClick={loadCustomers} className="retry-btn">
            <RotateCw size={16} /> Retry
          </button>
        </div>
      )}

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Customers</h1>
          <p>Manage and view customer information</p>
        </div>
        <div className="customer-stats">
          <div className="stat">
            <span className="stat-label">Total Customers</span>
            <span className="stat-number">{customers.length}</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="search-wrapper">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Customers Table */}
      <div className="table-wrapper">
        {loading ? (
          <div className="table-loading">
            <div className="loader"></div>
            <p>Loading customers...</p>
          </div>
        ) : filteredCustomers.length > 0 ? (
          <table className="customers-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Last Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.email}>
                  <td>
                    <span className="customer-name">{customer.name}</span>
                  </td>
                  <td>
                    <span className="email">
                      <Mail size={14} /> {customer.email}
                    </span>
                  </td>
                  <td>
                    <span className="phone">{customer.phone}</span>
                  </td>
                  <td>
                    <span className="location">
                      <MapPin size={14} /> {customer.city}, {customer.country}
                    </span>
                  </td>
                  <td>
                    <span className="order-count">
                      <ShoppingBag size={14} /> {customer.orderCount}
                    </span>
                  </td>
                  <td>
                    <span className="total-spent">
                      Rs {customer.totalSpent?.toLocaleString()}
                    </span>
                  </td>
                  <td>
                    <span className="last-order">
                      {format(new Date(customer.lastOrderDate), "MMM dd, yyyy")}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-primary sm"
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <ShoppingBag size={40} />
            </div>
            <h3>No customers found</h3>
            <p>Customers will appear here after orders are placed</p>
          </div>
        )}
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <CustomerDetailsModal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </div>
  );
};

export default Customers;

/* ==================== CUSTOMER DETAILS MODAL ==================== */

const CustomerDetailsModal = ({ customer, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h2>Customer Details</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Customer Info */}
          <div className="info-section">
            <h3>Personal Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Full Name</label>
                <p>{customer.name}</p>
              </div>
              <div className="info-item">
                <label>Email</label>
                <p>{customer.email}</p>
              </div>
              <div className="info-item">
                <label>Phone</label>
                <p>{customer.phone}</p>
              </div>
              <div className="info-item">
                <label>City</label>
                <p>{customer.city}</p>
              </div>
              <div className="info-item">
                <label>Country</label>
                <p>{customer.country}</p>
              </div>
              <div className="info-item">
                <label>Address</label>
                <p>{customer.address}</p>
              </div>
            </div>
          </div>

          {/* Order Statistics */}
          <div className="stats-section">
            <h3>Order Statistics</h3>
            <div className="stats-grid">
              <div className="stat-box">
                <span className="stat-label">Total Orders</span>
                <span className="stat-value">{customer.orderCount}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Total Spent</span>
                <span className="stat-value">Rs {customer.totalSpent?.toLocaleString()}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Average Order</span>
                <span className="stat-value">
                  Rs {(customer.totalSpent / customer.orderCount)?.toFixed(0).toLocaleString()}
                </span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Last Order</span>
                <span className="stat-value">
                  {format(new Date(customer.lastOrderDate), "MMM dd, yyyy")}
                </span>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          {customer.orders && customer.orders.length > 0 && (
            <div className="orders-section">
              <h3>Recent Orders</h3>
              <div className="orders-list">
                {customer.orders.slice(0, 5).map((order) => (
                  <div key={order._id} className="order-item">
                    <div className="order-info">
                      <span className="order-number">{order.orderNumber}</span>
                      <span className="order-date">
                        {format(new Date(order.createdAt), "MMM dd, yyyy")}
                      </span>
                    </div>
                    <span className={`status status-${order.status}`}>
                      {order.status}
                    </span>
                    <span className="order-total">
                      Rs {order.total?.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <a href={`mailto:${customer.email}`} className="btn-primary">
            <Mail size={16} /> Send Email
          </a>
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};