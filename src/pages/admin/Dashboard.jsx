import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardAPI } from '../../services/api';
import {
  ShoppingCart,
  Package,
  MessageSquare,
  DollarSign,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  RotateCw,
  AlertTriangle,
  Eye
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
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
  const [dateRange, setDateRange] = useState('7days');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const getDateRange = useCallback((range) => {
    const today = new Date();
    let startDate, label;

    switch (range) {
      case '7days':
        startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        label = 'Last 7 Days';
        break;
      case '30days':
        startDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        label = 'Last 30 Days';
        break;
      case '90days':
        startDate = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
        label = 'Last 90 Days';
        break;
      default:
        startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        label = 'Last 7 Days';
    }

    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0],
      label
    };
  }, []);

  const loadDashboardData = useCallback(async () => {
    try {
      setError('');
      setLoading(true);

      const { startDate, endDate } = getDateRange(dateRange);

      const [statsRes, ordersRes, stockRes] = await Promise.all([
        dashboardAPI.getStats({ startDate, endDate }),
        dashboardAPI.getRecentOrders(5),
        dashboardAPI.getLowStock(10)
      ]);

      setStats(statsRes.data.data);
      setRecentOrders(ordersRes.data.data || []);
      setLowStock(stockRes.data.data || []);
    } catch (err) {
      console.error('Dashboard error:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [dateRange, getDateRange]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  if (loading) {
    return (
      <div className="dashboard-loader-container">
        <div className="dashboard-loader">
          <div className="loader-dot"></div>
          <div className="loader-dot"></div>
          <div className="loader-dot"></div>
        </div>
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Revenue',
      value: `Rs ${(stats?.revenue?.total || 0).toLocaleString()}`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      bgGradient: 'from-blue-500 to-blue-600',
      onClick: () => navigate('/admin/orders')
    },
    {
      title: 'Total Orders',
      value: stats?.orders?.total || 0,
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      bgGradient: 'from-emerald-500 to-emerald-600',
      onClick: () => navigate('/admin/orders')
    },
    {
      title: 'Products',
      value: stats?.products?.total || 0,
      change: `${stats?.products?.lowStock || 0} low stock`,
      trend: 'warning',
      icon: Package,
      bgGradient: 'from-amber-500 to-amber-600',
      onClick: () => navigate('/admin/products')
    },
    {
      title: 'Inquiries',
      value: stats?.inquiries?.total || 0,
      change: `${stats?.inquiries?.unread || 0} unread`,
      trend: 'neutral',
      icon: MessageSquare,
      bgGradient: 'from-purple-500 to-purple-600',
      onClick: () => navigate('/admin/inquiries')
    }
  ];

  const { label: dateRangeLabel } = getDateRange(dateRange);

  return (
    <div className="dashboard">
      {/* Error Message */}
      {error && (
        <div className="error-banner">
          <AlertCircle size={20} />
          <span>{error}</span>
          <button onClick={loadDashboardData} className="retry-btn">
            <RotateCw size={16} /> Retry
          </button>
        </div>
      )}

      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back! Here's your business overview.</p>
        </div>
        <div className="header-actions">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="date-range-select"
            aria-label="Select date range"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>
          <button
            className="btn-secondary"
            onClick={loadDashboardData}
            disabled={loading}
            title="Refresh data"
            aria-label="Refresh dashboard"
          >
            <RotateCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <button
              key={i}
              className="stat-card clickable"
              onClick={stat.onClick}
              onKeyDown={(e) => {
                if (e.key === 'Enter') stat.onClick();
              }}
              aria-label={`${stat.title}: ${stat.value}`}
            >
              <div className="stat-header">
                <div className={`stat-icon bg-gradient-to-br ${stat.bgGradient}`}>
                  <Icon size={24} />
                </div>
                <div className={`stat-trend trend-${stat.trend}`}>
                  <TrendingUp size={16} />
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="stat-content">
                <p className="stat-label">{stat.title}</p>
                <h3 className="stat-value">{stat.value}</h3>
              </div>
            </button>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        {/* Revenue Chart */}
        <div className="chart-container">
          <div className="chart-header">
            <div>
              <h2>Revenue Trend</h2>
              <p className="text-secondary">{dateRangeLabel} performance</p>
            </div>
            <button
              className="btn-secondary sm"
              onClick={() => navigate('/admin/orders')}
            >
              View Details <ArrowRight size={14} />
            </button>
          </div>
          {stats?.charts?.dailyRevenue && stats.charts.dailyRevenue.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.charts.dailyRevenue}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f39c12" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f39c12" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="_id" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => `Rs ${value.toLocaleString()}`}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#f39c12"
                  strokeWidth={3}
                  dot={{ fill: '#f39c12', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="chart-empty">No data available</div>
          )}
        </div>

        {/* Top Products */}
        <div className="chart-container">
          <div className="chart-header">
            <div>
              <h2>Top Products</h2>
              <p className="text-secondary">Best selling items</p>
            </div>
            <button
              className="btn-secondary sm"
              onClick={() => navigate('/admin/products')}
            >
              View All <ArrowRight size={14} />
            </button>
          </div>
          {stats?.charts?.topProducts && stats.charts.topProducts.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.charts.topProducts.slice(0, 5)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="productInfo.title"
                  stroke="#9ca3af"
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="totalSold" fill="#f39c12" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="chart-empty">No data available</div>
          )}
        </div>
      </div>

      {/* Lists Section */}
      <div className="lists-section">
        {/* Recent Orders */}
        <div className="list-container">
          <div className="list-header">
            <h2>Recent Orders</h2>
            <button
              className="view-all"
              onClick={() => navigate('/admin/orders')}
              aria-label="View all orders"
            >
              View All <ArrowRight size={14} />
            </button>
          </div>

          <div className="list-content">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <button
                  key={order._id}
                  className="list-item clickable"
                  onClick={() => navigate(`/admin/orders?id=${order._id}`)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') navigate(`/admin/orders?id=${order._id}`);
                  }}
                  aria-label={`Order ${order.orderNumber}`}
                >
                  <div className="item-left">
                    <div className="item-title">{order.orderNumber}</div>
                    <div className="item-meta">
                      {order.billingDetails?.firstName} {order.billingDetails?.lastName}
                    </div>
                  </div>
                  <div className="item-right">
                    <div className="item-price">Rs {order.total?.toLocaleString()}</div>
                    <span className={`order-status status-${order.status}`}>
                      {order.status}
                    </span>
                  </div>
                </button>
              ))
            ) : (
              <div className="empty-state">No orders yet</div>
            )}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="list-container">
          <div className="list-header">
            <h2>Low Stock Alerts</h2>
            <button
              className="view-all"
              onClick={() => navigate('/admin/products')}
              aria-label="View all products"
            >
              Manage <ArrowRight size={14} />
            </button>
          </div>

          <div className="list-content">
            {lowStock.length > 0 ? (
              lowStock.map((product) => (
                <button
                  key={product._id}
                  className="list-item alert-item clickable"
                  onClick={() => navigate(`/admin/products?id=${product._id}`)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') navigate(`/admin/products?id=${product._id}`);
                  }}
                  aria-label={`Low stock: ${product.title}`}
                >
                  <div className="item-left">
                    <div className="alert-icon">
                      <AlertTriangle size={16} />
                    </div>
                    <div>
                      <div className="item-title">{product.title}</div>
                      <div className="item-meta">{product.category}</div>
                    </div>
                  </div>
                  <div className="item-right">
                    <span className="stock-badge">{product.stock} units</span>
                  </div>
                </button>
              ))
            ) : (
              <div className="empty-state">All products in stock</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;