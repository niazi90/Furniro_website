import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Lock, Mail, AlertCircle } from "lucide-react";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // ✅ Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      navigate("/admin/dashboard");
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className="dashboard_login-page">
        <div className="dashboard_login-wrapper">
          <div className="dashboard_login-header">
            <h1>Loading...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard_login-page">
      <div className="dashboard_login-wrapper">
        {/* Header */}
        <div className="dashboard_login-header">
          <div className="dashboard_icon-circle">
            <Lock size={32} />
          </div>
          <h1>Admin Dashboard</h1>
          <p>Sign in to manage your store</p>
        </div>

        {/* Form Card */}
        <div className="dashboard_login-card">
          {error && (
            <div className="dashboard_error-box">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="dashboard_form-group">
              <label>Email Address</label>
              <div className="dashboard_input-wrapper">
                <Mail size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="dashboard_form-group">
              <label>Password</label>
              <div className="dashboard_input-wrapper">
                <Lock size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Options */}
            <div className="dashboard_options">
              <label className="dashboard_remember">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <a href="#" className="dashboard_forgot">
                Forgot password?
              </a>
            </div>

            {/* Button */}
            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="dashboard_footer-text">
            Protected admin area • Unauthorized access is prohibited
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;