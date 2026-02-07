import React, { useState, useEffect } from "react";
import { ordersAPI } from "../../services/api";
import {
  Search,
  Download,
  Eye,
  X,
  Clock,
  Truck,
  CheckCircle,
  AlertCircle,
  Filter,
} from "lucide-react";
import { format } from "date-fns";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [sortBy, setSortBy] = useState("recent");

  useEffect(() => {
    loadOrders();
  }, [statusFilter]);

  const loadOrders = async () => {
    try {
      const res = await ordersAPI.getAll({
        status: statusFilter !== "all" ? statusFilter : undefined,
      });
      setOrders(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await ordersAPI.updateStatus(id, status);
      loadOrders();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock size={14} />;
      case "processing":
        return <AlertCircle size={14} />;
      case "shipped":
        return <Truck size={14} />;
      case "delivered":
        return <CheckCircle size={14} />;
      default:
        return <Clock size={14} />;
    }
  };

  const filteredOrders = orders
    .filter(
      (o) =>
        o.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${o.billingDetails?.firstName || ""} ${o.billingDetails?.lastName || ""}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === "amount-high") {
        return b.total - a.total;
      } else if (sortBy === "amount-low") {
        return a.total - b.total;
      }
      return 0;
    });

  return (
    <div className="orders-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Orders</h1>
          <p>Manage and track all customer orders</p>
        </div>
        <button className="btn-primary">
          <Download size={16} /> Export Orders
        </button>
      </div>

      {/* Controls */}
      <div className="orders-controls">
        <div className="search-wrapper">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by order number or customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="recent">Most Recent</option>
            <option value="amount-high">Highest Amount</option>
            <option value="amount-low">Lowest Amount</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        {loading ? (
          <div className="table-loading">
            <div className="loader"></div>
            <p>Loading orders...</p>
          </div>
        ) : filteredOrders.length > 0 ? (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Items</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <span className="order-number">{order.orderNumber}</span>
                  </td>
                  <td>
                    <div className="customer-info">
                      <p className="customer-name">
                        {order.billingDetails?.firstName}{" "}
                        {order.billingDetails?.lastName}
                      </p>
                      <p className="customer-email">
                        {order.billingDetails?.email}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="date-info">
                      <p className="date-main">
                        {format(new Date(order.createdAt), "MMM dd, yyyy")}
                      </p>
                      <p className="date-time">
                        {format(new Date(order.createdAt), "hh:mm a")}
                      </p>
                    </div>
                  </td>
                  <td>
                    <span className="amount">Rs {order.total?.toLocaleString()}</span>
                  </td>
                  <td>
                    <span className="item-count">{order.items?.length} items</span>
                  </td>
                  <td>
                    <span className={`status-badge status-${order.status}`}>
                      {getStatusIcon(order.status)}
                      <span>{order.status}</span>
                    </span>
                  </td>
                  <td>
                    <div className="actions">
                      <button
                        className="btn-icon"
                        onClick={() => setSelectedOrder(order)}
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusUpdate(order._id, e.target.value)
                        }
                        className="status-select"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <AlertCircle size={40} />
            </div>
            <h3>No orders found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default Orders;

/* ==================== ORDER DETAILS MODAL ==================== */

const OrderDetailsModal = ({ order, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <h2>Order Details</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Order Info Grid */}
          <div className="info-grid">
            <div className="info-item">
              <label>Order Number</label>
              <p className="info-value">{order.orderNumber}</p>
            </div>
            <div className="info-item">
              <label>Status</label>
              <span className={`status-badge status-${order.status}`}>
                {order.status}
              </span>
            </div>
            <div className="info-item">
              <label>Order Date</label>
              <p className="info-value">
                {format(new Date(order.createdAt), "MMM dd, yyyy hh:mm a")}
              </p>
            </div>
            <div className="info-item">
              <label>Payment Method</label>
              <p className="info-value">{order.paymentMethod || "N/A"}</p>
            </div>
          </div>

          {/* Items */}
          <div className="items-section">
            <h3>Order Items</h3>
            <div className="items-list">
              {order.items?.map((item, i) => (
                <div key={i} className="item-row">
                  {item.product?.image && (
                    <img src={item.product.image} alt={item.title} />
                  )}
                  <div className="item-details">
                    <p className="item-name">{item.title}</p>
                    <p className="item-meta">Qty: {item.quantity}</p>
                  </div>
                  <p className="item-total">
                    Rs {(item.price * item.quantity)?.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="order-total">
            <span>Total Amount</span>
            <span className="total-amount">
              Rs {order.total?.toLocaleString()}
            </span>
          </div>

          {/* Customer Info */}
          <div className="customer-details">
            <h3>Customer Information</h3>
            <div className="details-grid">
              <div>
                <label>Name</label>
                <p>
                  {order.billingDetails?.firstName}{" "}
                  {order.billingDetails?.lastName}
                </p>
              </div>
              <div>
                <label>Email</label>
                <p>{order.billingDetails?.email}</p>
              </div>
              <div>
                <label>Phone</label>
                <p>{order.billingDetails?.phone || "N/A"}</p>
              </div>
              <div>
                <label>Address</label>
                <p>{order.billingDetails?.address || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn-primary">Print Invoice</button>
        </div>
      </div>
    </div>
  );
};