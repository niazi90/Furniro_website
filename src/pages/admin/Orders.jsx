import React, { useState, useEffect } from "react";
import { ordersAPI } from "../../services/api";
import './Orders.css';
import {
  Search,
  Download,
  Eye,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    loadOrders();
  }, [statusFilter]);

  const loadOrders = async () => {
    try {
      const res = await ordersAPI.getAll({
        status: statusFilter !== "all" ? statusFilter : undefined,
      });
      setOrders(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    await ordersAPI.updateStatus(id, status);
    loadOrders();
  };

  const statusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock size={14} />;
      case "processing":
        return <Truck size={14} />;
      case "delivered":
        return <CheckCircle size={14} />;
      case "cancelled":
        return <XCircle size={14} />;
      default:
        return <Clock size={14} />;
    }
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${o.billingDetails.firstName} ${o.billingDetails.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard_orders-page">
      {/* Header */}
      <div className="dashboard_orders-header">
        <div>
          <h1>Orders</h1>
          <p>Manage and track customer orders</p>
        </div>
        <button className="dashboard_border-btn">
          <Download size={16} /> Export Orders
        </button>
      </div>

      {/* Filters */}
      <div className="dashboard_filters">
        <div className="dashboard_search-box">
          <Search size={18} />
          <input
            placeholder="Search by order number or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="dashboard_table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th align="right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((o) => (
              <tr key={o._id}>
                <td>
                  <b>{o.orderNumber}</b>
                  <div className="dashboard_muted">{o.items.length} items</div>
                </td>
                <td>
                  <b>
                    {o.billingDetails.firstName}{" "}
                    {o.billingDetails.lastName}
                  </b>
                  <div className="dashboard_muted">{o.billingDetails.email}</div>
                </td>
                <td>
                  {format(new Date(o.createdAt), "MMM dd, yyyy")}
                  <div className="dashboard_muted">
                    {format(new Date(o.createdAt), "hh:mm a")}
                  </div>
                </td>
                <td>Rs {o.total.toLocaleString()}</td>
                <td>
                  <span className={`dashboard_badge ${o.status}`}>
                    {statusIcon(o.status)} {o.status}
                  </span>
                </td>
                <td>
                  <div className="dashboard_actions">
                    <button
                      className="dashboard_icon-btn blue"
                      onClick={() => setSelectedOrder(o)}
                    >
                      <Eye size={16} />
                    </button>
                    <select
                      value={o.status}
                      onChange={(e) =>
                        handleStatusUpdate(o._id, e.target.value)
                      }
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

        {!loading && filteredOrders.length === 0 && (
          <div className="dashboard_empty">No orders found</div>
        )}
      </div>

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

/* ================= MODAL ================= */

const OrderDetailsModal = ({ order, onClose }) => {
  return (
    <div className="dashboard_modal-overlay">
      <div className="dashboard_modal large">
        <div className="dashboard_modal-header">
          <h2>Order Details</h2>
          <button className="dashboard_icon-btn" onClick={onClose}>
            <XCircle />
          </button>
        </div>

        <div className="dashboard_modal-body">
          <div className="dashboard_info-grid">
            <div>
              <span>Order Number</span>
              <b>{order.orderNumber}</b>
            </div>
            <div>
              <span>Status</span>
              <b>{order.status}</b>
            </div>
            <div>
              <span>Date</span>
              <b>
                {format(new Date(order.createdAt), "MMM dd, yyyy hh:mm a")}
              </b>
            </div>
            <div>
              <span>Payment</span>
              <b>{order.paymentMethod}</b>
            </div>
          </div>

          <h3>Items</h3>
          {order.items.map((item, i) => (
            <div key={i} className="dashboard_order-item">
              <img src={item.product?.image || "/placeholder.png"} />
              <div>
                <b>{item.title}</b>
                <div className="dashboard_muted">Qty: {item.quantity}</div>
              </div>
              <b>Rs {(item.price * item.quantity).toLocaleString()}</b>
            </div>
          ))}

          <div className="dashboard_total">
            <span>Total</span>
            <b>Rs {order.total.toLocaleString()}</b>
          </div>
        </div>
      </div>
    </div>
  );
};
