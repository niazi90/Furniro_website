import React, { useState, useEffect } from 'react';
import { dashboardAPI } from '../../services/api';
import {
  ShoppingCart,
  Package,
  MessageSquare,
  DollarSign,
  ArrowUp,
  ArrowDown,
  AlertTriangle
} from 'lucide-react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [statsRes, ordersRes, stockRes] = await Promise.all([
        dashboardAPI.getStats(),
        dashboardAPI.getRecentOrders(5),
        dashboardAPI.getLowStock(10)
      ]);

      setStats(statsRes.data.data);
      setRecentOrders(ordersRes.data.data);
      setLowStock(stockRes.data.data);
    } catch (error) {
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard_loader-container">
        <div className="dashboard_loader"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Revenue',
      value: `Rs ${stats?.revenue?.total || 0}`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign
    },
    {
      title: 'Total Orders',
      value: stats?.orders?.total || 0,
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart
    },
    {
      title: 'Products',
      value: stats?.products?.total || 0,
      change: `${stats?.products?.lowStock || 0} low stock`,
      trend: 'warning',
      icon: Package
    },
    {
      title: 'Inquiries',
      value: stats?.inquiries?.total || 0,
      change: `${stats?.inquiries?.unread || 0} unread`,
      trend: 'neutral',
      icon: MessageSquare
    }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="dashboard_dashboard">
      <h1 className="dashboard_dashboard-title">Dashboard Overview</h1>
      <p className="dashboard_dashboard-subtitle">Welcome back! Here's what's happening.</p>

      {/* Stats */}
      <div className="dashboard_stats-grid">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div className="dashboard_stat-card" key={i}>
              <div>
                <p className="dashboard_stat-title">{stat.title}</p>
                <h3 className="dashboard_stat-value">{stat.value}</h3>
                <div className={`dashboard_stat-change ${stat.trend}`}>
                  {stat.trend === 'up' && <ArrowUp size={14} />}
                  {stat.trend === 'down' && <ArrowDown size={14} />}
                  {stat.trend === 'warning' && <AlertTriangle size={14} />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <Icon size={28} />
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="dashboard_charts-grid">
        <div className="dashboard_chart-box">
          <h3>Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats?.charts?.dailyRevenue || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line dataKey="revenue" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="dashboard_chart-box">
          <h3>Order Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats?.charts?.ordersByStatus || []}
                dataKey="count"
                nameKey="_id"
                outerRadius={100}
                label
              >
                {(stats?.charts?.ordersByStatus || []).map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Lists */}
      <div className="dashboard_lists-grid">
        <div className="dashboard_list-box">
          <h3>Recent Orders</h3>
          {recentOrders.map(order => (
            <div key={order._id} className="dashboard_list-item">
              <div>
                <strong>{order.orderNumber}</strong>
                <p>{order.billingDetails.firstName} {order.billingDetails.lastName}</p>
              </div>
              <div className="dashboard_right">
                <strong>Rs {order.total}</strong>
                <span className={`dashboard_badge ${order.status}`}>{order.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard_list-box">
          <h3>Low Stock</h3>
          {lowStock.map(product => (
            <div key={product._id} className="dashboard_list-item">
              <span>{product.title}</span>
              <span className="dashboard_badge warning">{product.stock} left</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
