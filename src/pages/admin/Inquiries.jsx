// import React, { useState, useEffect } from "react";
// import { contactAPI } from "../../services/api.js";
// import { Search, Eye, Trash2, Mail, MessageSquare, X, AlertCircle } from "lucide-react";
// import { format } from "date-fns";
// import "./Inquiries.css";

// const Inquiries = () => {
//   const [inquiries, setInquiries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedInquiry, setSelectedInquiry] = useState(null);

//   useEffect(() => {
//     loadInquiries();
//   }, []);

//   const loadInquiries = async () => {
//     try {
//       const response = await contactAPI.getAll();
//       setInquiries(response.data || []);
//     } catch (error) {
//       console.error("Error loading inquiries:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this inquiry?"))
//       return;
//     try {
//       await contactAPI.delete(id);
//       loadInquiries();
//     } catch (error) {
//       console.error("Error deleting inquiry:", error);
//     }
//   };

//   const filteredInquiries = inquiries.filter(
//     (inquiry) =>
//       inquiry.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       inquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       inquiry.message?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="inquiries-page">
//       {/* Header */}
//       <div className="page-header">
//         <div>
//           <h1>Customer Inquiries</h1>
//           <p>Manage and respond to customer contact requests</p>
//         </div>
//         <div className="inquiry-stats">
//           <div className="stat">
//             <span className="stat-label">Total</span>
//             <span className="stat-number">{inquiries.length}</span>
//           </div>
//         </div>
//       </div>

//       {/* Search */}
//       <div className="search-wrapper">
//         <Search size={18} />
//         <input
//           type="text"
//           placeholder="Search by name, email, or message..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* Inquiries List */}
//       <div className="inquiries-list">
//         {loading ? (
//           <div className="loading-state">
//             <div className="loader"></div>
//             <p>Loading inquiries...</p>
//           </div>
//         ) : filteredInquiries.length > 0 ? (
//           filteredInquiries.map((inquiry) => (
//             <div
//               key={inquiry._id}
//               className="inquiry-card"
//               onClick={() => setSelectedInquiry(inquiry)}
//             >
//               <div className="inquiry-header">
//                 <div className="inquiry-title-row">
//                   <h3>{inquiry.name}</h3>
//                   {inquiry.subject && (
//                     <span className="subject-badge">{inquiry.subject}</span>
//                   )}
//                 </div>
//                 <div className="inquiry-meta">
//                   <span className="meta-item">
//                     <Mail size={14} /> {inquiry.email}
//                   </span>
//                   <span className="meta-item">
//                     <MessageSquare size={14} />{" "}
//                     {format(new Date(inquiry.createdAt), "MMM dd, yyyy")}
//                   </span>
//                 </div>
//               </div>

//               <p className="inquiry-message">{inquiry.message}</p>

//               <div className="inquiry-footer">
//                 <div className="actions">
//                   <button
//                     className="btn-icon view"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setSelectedInquiry(inquiry);
//                     }}
//                     title="View Details"
//                   >
//                     <Eye size={16} />
//                   </button>
//                   <button
//                     className="btn-icon delete"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleDelete(inquiry._id);
//                     }}
//                     title="Delete Inquiry"
//                   >
//                     <Trash2 size={16} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="empty-state">
//             <div className="empty-icon">
//               <MessageSquare size={40} />
//             </div>
//             <h3>No inquiries found</h3>
//             <p>All customer inquiries will appear here</p>
//           </div>
//         )}
//       </div>

//       {/* Inquiry Details Modal */}
//       {selectedInquiry && (
//         <InquiryModal
//           inquiry={selectedInquiry}
//           onClose={() => setSelectedInquiry(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default Inquiries;

// /* ==================== INQUIRY DETAILS MODAL ==================== */

// const InquiryModal = ({ inquiry, onClose }) => {
//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal" onClick={(e) => e.stopPropagation()}>
//         {/* Header */}
//         <div className="modal-header">
//           <h2>Inquiry Details</h2>
//           <button className="close-btn" onClick={onClose}>
//             <X size={20} />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="modal-body">
//           {/* Sender Info */}
//           <div className="info-section">
//             <h3>Sender Information</h3>
//             <div className="info-grid">
//               <div className="info-item">
//                 <label>Name</label>
//                 <p>{inquiry.name}</p>
//               </div>
//               <div className="info-item">
//                 <label>Email</label>
//                 <p className="email-text">{inquiry.email}</p>
//               </div>
//               {inquiry.subject && (
//                 <div className="info-item">
//                   <label>Subject</label>
//                   <p>{inquiry.subject}</p>
//                 </div>
//               )}
//               <div className="info-item">
//                 <label>Date Received</label>
//                 <p>
//                   {format(new Date(inquiry.createdAt), "MMMM dd, yyyy hh:mm a")}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Message */}
//           <div className="message-section">
//             <h3>Message</h3>
//             <div className="message-box">{inquiry.message}</div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="modal-footer">
//           <a href={`mailto:${inquiry.email}`} className="btn-primary">
//             <Mail size={16} /> Reply via Email
//           </a>
//           <button className="btn-secondary" onClick={onClose}>
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import { contactAPI } from "../../services/api.js";
import { Search, Eye, Trash2, Mail, MessageSquare, X, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import "./Inquiries.css";

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    try {
      setError("");
      setLoading(true);
      console.log('📨 Loading inquiries...');
      
      const response = await contactAPI.getAll();
      console.log('✅ Inquiries loaded:', response.data);
      
      setInquiries(response.data.data || response.data || []);
    } catch (error) {
      console.error("❌ Error loading inquiries:", error);
      setError(error.response?.data?.message || "Failed to load inquiries");
      setInquiries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?"))
      return;
    try {
      await contactAPI.delete(id);
      setInquiries(inquiries.filter(i => i._id !== id));
      setSelectedInquiry(null);
    } catch (error) {
      console.error("❌ Error deleting inquiry:", error);
      alert("Failed to delete inquiry");
    }
  };

  const filteredInquiries = inquiries.filter(
    (inquiry) =>
      inquiry.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="inquiries-page">
      {/* Error Message */}
      {error && (
        <div className="error-banner">
          <AlertCircle size={20} />
          <span>{error}</span>
          <button onClick={loadInquiries} className="retry-btn">
            Retry
          </button>
        </div>
      )}

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Customer Inquiries</h1>
          <p>Manage and respond to customer contact requests</p>
        </div>
        <div className="inquiry-stats">
          <div className="stat">
            <span className="stat-label">Total</span>
            <span className="stat-number">{inquiries.length}</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="search-wrapper">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search by name, email, or message..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Inquiries List */}
      <div className="inquiries-list">
        {loading ? (
          <div className="loading-state">
            <div className="loader"></div>
            <p>Loading inquiries...</p>
          </div>
        ) : filteredInquiries.length > 0 ? (
          filteredInquiries.map((inquiry) => (
            <div
              key={inquiry._id}
              className="inquiry-card"
              onClick={() => setSelectedInquiry(inquiry)}
            >
              <div className="inquiry-header">
                <div className="inquiry-title-row">
                  <h3>{inquiry.name}</h3>
                  {inquiry.subject && (
                    <span className="subject-badge">{inquiry.subject}</span>
                  )}
                </div>
                <div className="inquiry-meta">
                  <span className="meta-item">
                    <Mail size={14} /> {inquiry.email}
                  </span>
                  <span className="meta-item">
                    <MessageSquare size={14} />{" "}
                    {format(new Date(inquiry.createdAt), "MMM dd, yyyy")}
                  </span>
                </div>
              </div>

              <p className="inquiry-message">{inquiry.message}</p>

              <div className="inquiry-footer">
                <div className="actions">
                  <button
                    className="btn-icon view"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedInquiry(inquiry);
                    }}
                    title="View Details"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    className="btn-icon delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(inquiry._id);
                    }}
                    title="Delete Inquiry"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <MessageSquare size={40} />
            </div>
            <h3>No inquiries found</h3>
            <p>All customer inquiries will appear here</p>
          </div>
        )}
      </div>

      {/* Inquiry Details Modal */}
      {selectedInquiry && (
        <InquiryModal
          inquiry={selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
          onDelete={() => {
            handleDelete(selectedInquiry._id);
          }}
        />
      )}
    </div>
  );
};

export default Inquiries;

/* ==================== INQUIRY DETAILS MODAL ==================== */

const InquiryModal = ({ inquiry, onClose, onDelete }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h2>Inquiry Details</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Sender Info */}
          <div className="info-section">
            <h3>Sender Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Name</label>
                <p>{inquiry.name}</p>
              </div>
              <div className="info-item">
                <label>Email</label>
                <p className="email-text">{inquiry.email}</p>
              </div>
              {inquiry.subject && (
                <div className="info-item">
                  <label>Subject</label>
                  <p>{inquiry.subject}</p>
                </div>
              )}
              <div className="info-item">
                <label>Date Received</label>
                <p>
                  {format(new Date(inquiry.createdAt), "MMMM dd, yyyy hh:mm a")}
                </p>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="message-section">
            <h3>Message</h3>
            <div className="message-box">{inquiry.message}</div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <a href={`mailto:${inquiry.email}`} className="btn-primary">
            <Mail size={16} /> Reply via Email
          </a>
          <button 
            className="btn-danger" 
            onClick={() => {
              if (window.confirm("Delete this inquiry?")) {
                onDelete();
              }
            }}
          >
            <Trash2 size={16} /> Delete
          </button>
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};