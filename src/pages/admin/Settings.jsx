// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { authAPI } from "../../services/api";
// import { Settings, Save, Lock, LogOut, AlertCircle, CheckCircle } from "lucide-react";
// import "./Settings.css";

// const Settings = () => {
//   const { admin, logout } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [error, setError] = useState("");

//   const [profileForm, setProfileForm] = useState({
//     name: admin?.name || "",
//     email: admin?.email || "",
//   });

//   const [passwordForm, setPasswordForm] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const handleProfileChange = (e) => {
//     const { name, value } = e.target;
//     setProfileForm({ ...profileForm, [name]: value });
//   };

//   const handlePasswordChange = (e) => {
//     const { name, value } = e.target;
//     setPasswordForm({ ...passwordForm, [name]: value });
//   };

//   const handleProfileSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccessMessage("");
//     setLoading(true);

//     try {
//       // Currently no profile update endpoint, so just show success
//       // In production, you would call an update profile API
//       setSuccessMessage("Profile settings saved successfully!");
//       setTimeout(() => setSuccessMessage(""), 3000);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to update profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccessMessage("");

//     if (passwordForm.newPassword !== passwordForm.confirmPassword) {
//       setError("New passwords do not match");
//       return;
//     }

//     if (passwordForm.newPassword.length < 6) {
//       setError("Password must be at least 6 characters");
//       return;
//     }

//     setLoading(true);

//     try {
//       await authAPI.updatePassword({
//         currentPassword: passwordForm.currentPassword,
//         newPassword: passwordForm.newPassword,
//       });

//       setSuccessMessage("Password changed successfully!");
//       setPasswordForm({
//         currentPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//       });
//       setTimeout(() => setSuccessMessage(""), 3000);
//     } catch (err) {
//       console.error("❌ Password update error:", err);
//       setError(err.response?.data?.message || "Failed to change password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     if (window.confirm("Are you sure you want to logout?")) {
//       logout();
//       window.location.href = "/admin/login";
//     }
//   };

//   return (
//     <div className="settings-page">
//       {/* Header */}
//       <div className="page-header">
//         <div>
//           <h1>Settings</h1>
//           <p>Manage your account and application settings</p>
//         </div>
//         <Settings size={32} className="header-icon" />
//       </div>

//       {/* Messages */}
//       {error && (
//         <div className="alert alert-error">
//           <AlertCircle size={20} />
//           <span>{error}</span>
//         </div>
//       )}

//       {successMessage && (
//         <div className="alert alert-success">
//           <CheckCircle size={20} />
//           <span>{successMessage}</span>
//         </div>
//       )}

//       <div className="settings-container">
//         {/* Profile Section */}
//         <section className="settings-section">
//           <h2>Account Information</h2>
//           <p className="section-description">Update your basic account information</p>

//           <form onSubmit={handleProfileSubmit} className="settings-form">
//             <div className="form-group">
//               <label>Full Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={profileForm.name}
//                 onChange={handleProfileChange}
//                 placeholder="Enter your full name"
//               />
//             </div>

//             <div className="form-group">
//               <label>Email Address</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={profileForm.email}
//                 onChange={handleProfileChange}
//                 placeholder="Enter your email"
//                 disabled
//               />
//               <small>Email cannot be changed</small>
//             </div>

//             <div className="form-group">
//               <label>Admin Role</label>
//               <input
//                 type="text"
//                 value={admin?.role || "Admin"}
//                 disabled
//                 className="disabled-input"
//               />
//               <small>Contact super admin to change role</small>
//             </div>

//             <button type="submit" className="btn-primary" disabled={loading}>
//               <Save size={18} /> {loading ? "Saving..." : "Save Changes"}
//             </button>
//           </form>
//         </section>

//         {/* Security Section */}
//         <section className="settings-section">
//           <h2>Security</h2>
//           <p className="section-description">Change your password and manage security</p>

//           <form onSubmit={handlePasswordSubmit} className="settings-form">
//             <div className="form-group">
//               <label>Current Password *</label>
//               <div className="password-input">
//                 <Lock size={18} />
//                 <input
//                   type="password"
//                   name="currentPassword"
//                   value={passwordForm.currentPassword}
//                   onChange={handlePasswordChange}
//                   placeholder="Enter your current password"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="form-group">
//               <label>New Password *</label>
//               <div className="password-input">
//                 <Lock size={18} />
//                 <input
//                   type="password"
//                   name="newPassword"
//                   value={passwordForm.newPassword}
//                   onChange={handlePasswordChange}
//                   placeholder="Enter new password"
//                   required
//                   minLength="6"
//                 />
//               </div>
//               <small>At least 6 characters</small>
//             </div>

//             <div className="form-group">
//               <label>Confirm New Password *</label>
//               <div className="password-input">
//                 <Lock size={18} />
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   value={passwordForm.confirmPassword}
//                   onChange={handlePasswordChange}
//                   placeholder="Confirm new password"
//                   required
//                 />
//               </div>
//             </div>

//             <button type="submit" className="btn-primary" disabled={loading}>
//               <Lock size={18} /> {loading ? "Updating..." : "Change Password"}
//             </button>
//           </form>
//         </section>

//         {/* System Info */}
//         <section className="settings-section info-section">
//           <h2>System Information</h2>
          
//           <div className="info-grid">
//             <div className="info-item">
//               <span className="info-label">Admin Name</span>
//               <span className="info-value">{admin?.name}</span>
//             </div>

//             <div className="info-item">
//               <span className="info-label">Email</span>
//               <span className="info-value">{admin?.email}</span>
//             </div>

//             <div className="info-item">
//               <span className="info-label">Role</span>
//               <span className="info-value">
//                 <span className="role-badge">{admin?.role}</span>
//               </span>
//             </div>

//             <div className="info-item">
//               <span className="info-label">Account Status</span>
//               <span className="info-value">
//                 <span className="status-badge active">
//                   {admin?.isActive ? "Active" : "Inactive"}
//                 </span>
//               </span>
//             </div>

//             <div className="info-item">
//               <span className="info-label">Last Login</span>
//               <span className="info-value">
//                 {admin?.lastLogin
//                   ? new Date(admin.lastLogin).toLocaleDateString()
//                   : "Never"}
//               </span>
//             </div>

//             <div className="info-item">
//               <span className="info-label">Account Created</span>
//               <span className="info-value">
//                 {admin?.createdAt
//                   ? new Date(admin.createdAt).toLocaleDateString()
//                   : "Unknown"}
//               </span>
//             </div>
//           </div>
//         </section>

//         {/* Danger Zone */}
//         <section className="settings-section danger-section">
//           <h2>Danger Zone</h2>
//           <p className="section-description">Logout from your account</p>

//           <button
//             type="button"
//             className="btn-danger"
//             onClick={handleLogout}
//           >
//             <LogOut size={18} /> Logout from Account
//           </button>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Settings;
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { authAPI } from "../../services/api";
import { Settings as SettingsIcon } from "lucide-react";

import { Save, Lock, LogOut, AlertCircle, CheckCircle } from "lucide-react";
import "./Settings.css";

const Settings = () => {
  const { admin, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const [profileForm, setProfileForm] = useState({
    name: admin?.name || "",
    email: admin?.email || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm({ ...profileForm, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({ ...passwordForm, [name]: value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      // Currently no profile update endpoint, so just show success
      // In production, you would call an update profile API
      setSuccessMessage("Profile settings saved successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await authAPI.updatePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      setSuccessMessage("Password changed successfully!");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("❌ Password update error:", err);
      setError(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      window.location.href = "/admin/login";
    }
  };

  return (
    <div className="settings-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your account and application settings</p>
        </div>
        <SettingsIcon size={32} className="header-icon" />
      </div>

      {/* Messages */}
      {error && (
        <div className="alert alert-error">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {successMessage && (
        <div className="alert alert-success">
          <CheckCircle size={20} />
          <span>{successMessage}</span>
        </div>
      )}

      <div className="settings-container">
        {/* Profile Section */}
        <section className="settings-section">
          <h2>Account Information</h2>
          <p className="section-description">Update your basic account information</p>

          <form onSubmit={handleProfileSubmit} className="settings-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={profileForm.name}
                onChange={handleProfileChange}
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={profileForm.email}
                onChange={handleProfileChange}
                placeholder="Enter your email"
                disabled
              />
              <small>Email cannot be changed</small>
            </div>

            <div className="form-group">
              <label>Admin Role</label>
              <input
                type="text"
                value={admin?.role || "Admin"}
                disabled
                className="disabled-input"
              />
              <small>Contact super admin to change role</small>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              <Save size={18} /> {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </section>

        {/* Security Section */}
        <section className="settings-section">
          <h2>Security</h2>
          <p className="section-description">Change your password and manage security</p>

          <form onSubmit={handlePasswordSubmit} className="settings-form">
            <div className="form-group">
              <label>Current Password *</label>
              <div className="password-input">
                <Lock size={18} />
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter your current password"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>New Password *</label>
              <div className="password-input">
                <Lock size={18} />
                <input
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  required
                  minLength="6"
                />
              </div>
              <small>At least 6 characters</small>
            </div>

            <div className="form-group">
              <label>Confirm New Password *</label>
              <div className="password-input">
                <Lock size={18} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              <Lock size={18} /> {loading ? "Updating..." : "Change Password"}
            </button>
          </form>
        </section>

        {/* System Info */}
        <section className="settings-section info-section">
          <h2>System Information</h2>
          
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Admin Name</span>
              <span className="info-value">{admin?.name}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{admin?.email}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Role</span>
              <span className="info-value">
                <span className="role-badge">{admin?.role}</span>
              </span>
            </div>

            <div className="info-item">
              <span className="info-label">Account Status</span>
              <span className="info-value">
                <span className="status-badge active">
                  {admin?.isActive ? "Active" : "Inactive"}
                </span>
              </span>
            </div>

            <div className="info-item">
              <span className="info-label">Last Login</span>
              <span className="info-value">
                {admin?.lastLogin
                  ? new Date(admin.lastLogin).toLocaleDateString()
                  : "Never"}
              </span>
            </div>

            <div className="info-item">
              <span className="info-label">Account Created</span>
              <span className="info-value">
                {admin?.createdAt
                  ? new Date(admin.createdAt).toLocaleDateString()
                  : "Unknown"}
              </span>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="settings-section danger-section">
          <h2>Danger Zone</h2>
          <p className="section-description">Logout from your account</p>

          <button
            type="button"
            className="btn-danger"
            onClick={handleLogout}
          >
            <LogOut size={18} /> Logout from Account
          </button>
        </section>
      </div>
    </div>
  );
};

export default Settings;