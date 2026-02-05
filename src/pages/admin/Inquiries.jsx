import React, { useState, useEffect } from "react";
import { contactAPI } from "../../services/api.js";
import { Search, Eye, Trash2, Mail, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import "./Inquiries.css";

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    try {
      const response = await contactAPI.getAll();
      setInquiries(response.data);
    } catch (error) {
      console.error("Error loading inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      try {
        await contactAPI.delete(id);
        loadInquiries();
      } catch (error) {
        console.error("Error deleting inquiry:", error);
      }
    }
  };

  return (
    <div className="dashboard_inquiries">
      <div className="dashboard_page-header">
        <h1>Customer Inquiries</h1>
        <p>Manage customer contact requests</p>
      </div>

      <div className="dashboard_card">
        {/* Search */}
        <div className="dashboard_card-header">
          <div className="dashboard_search-box">
            <Search size={18} />
            <input type="text" placeholder="Search inquiries..." />
          </div>
        </div>

        {/* List */}
        <div className="dashboard_inquiry-list">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry._id}
              className="dashboard_inquiry-item"
              onClick={() => setSelectedInquiry(inquiry)}
            >
              <div className="dashboard_inquiry-content">
                <div className="dashboard_title-row">
                  <h3>{inquiry.name}</h3>
                  {inquiry.subject && (
                    <span className="dashboard_badge">{inquiry.subject}</span>
                  )}
                </div>

                <div className="dashboard_meta">
                  <span>
                    <Mail size={14} /> {inquiry.email}
                  </span>
                  <span>
                    <MessageSquare size={14} />{" "}
                    {format(new Date(inquiry.createdAt), "MMM dd, yyyy")}
                  </span>
                </div>

                <p className="message-preview">{inquiry.message}</p>
              </div>

              <div className="dashboard_actions">
                <button
                  className="dashboard_view-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedInquiry(inquiry);
                  }}
                >
                  <Eye size={16} />
                </button>

                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(inquiry._id);
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {inquiries.length === 0 && !loading && (
          <div className="dashboard_empty">No inquiries found</div>
        )}
      </div>

      {selectedInquiry && (
        <InquiryModal
          inquiry={selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
        />
      )}
    </div>
  );
};

/* ================= MODAL ================= */

const InquiryModal = ({ inquiry, onClose }) => {
  return (
    <div className="dashboard_modal-overlay">
      <div className="dashboard_modal">
        <div className="dashboard_modal-header">
          <h2>Inquiry Details</h2>
        </div>

        <div className="dashboard_modal-body">
          <div className="dashboard_info">
            <label>Name</label>
            <p>{inquiry.name}</p>
          </div>

          <div className="dashboard_info">
            <label>Email</label>
            <p>{inquiry.email}</p>
          </div>

          {inquiry.subject && (
            <div className="dashboard_info">
              <label>Subject</label>
              <p>{inquiry.subject}</p>
            </div>
          )}

          <div className="dashboard_info">
            <label>Date</label>
            <p>
              {format(
                new Date(inquiry.createdAt),
                "MMMM dd, yyyy hh:mm a"
              )}
            </p>
          </div>

          <div className="dashboard_info">
            <label>Message</label>
            <div className="dashboard_message-box">{inquiry.message}</div>
          </div>

          <div className="dashboard_modal-actions">
            <a
              href={`mailto:${inquiry.email}`}
              className="dashboard_reply-btn"
            >
              <Mail size={16} />
              Reply via Email
            </a>

            <button className="dashboard_close-btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inquiries;
