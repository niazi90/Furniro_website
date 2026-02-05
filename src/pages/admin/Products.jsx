import React, { useState, useEffect } from "react";
import './Products.css';
import { productsAPI } from "../../services/api";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
} from "lucide-react";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, [category, searchTerm]);

  const loadProducts = async () => {
    try {
      const res = await productsAPI.getAll({
        category: category !== "All" ? category : undefined,
        search: searchTerm,
      });
      setProducts(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await productsAPI.delete(id);
    loadProducts();
  };

  return (
    <div className="dashboard_products-page">
      {/* Header */}
      <div className="dashboard_products-header">
        <div>
          <h1>Products</h1>
          <p>Manage your product inventory</p>
        </div>
        <button className="dashboard_add-btn" onClick={() => setShowModal(true)}>
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="dashboard_filters">
        <div className="dashboard_search-box">
          <Search size={18} />
          <input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All</option>
          <option value="Dining">Dining</option>
          <option value="Living">Living</option>
          <option value="Bedroom">Bedroom</option>
          <option value="Office">Office</option>
        </select>

        <div className="dashboard_bulk-buttons">
          <button><Download size={16} /> Export</button>
          <button><Upload size={16} /> Import</button>
        </div>
      </div>

      {/* Table */}
      <div className="dashboard_table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th align="right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>
                  <div className="dashboard_product-info">
                    <img src={p.image || "/placeholder.png"} />
                    <div>
                      <b>{p.title}</b>
                      <div className="dashboard_muted">{p.subtitle}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="dashboard_badge badge-blue">{p.category}</span>
                </td>
                <td>Rs {p.price}</td>
                <td>
                  <span
                    className={`dashboard_badge ${
                      p.stock === 0
                        ? "dashboard_badge-red"
                        : p.stock < 10
                        ? "dashboard_badge-orange"
                        : "dashboard_badge-green"
                    }`}
                  >
                    {p.stock}
                  </span>
                </td>
                <td>
                  <span
                    className={`dashboard_badge ${
                      p.featured ? "dashboard_badge-purple" : "dashboard_badge-gray"
                    }`}
                  >
                    {p.featured ? "dashboard_Featured" : "dashboard_Regular"}
                  </span>
                </td>
                <td>
                  <div className="dashboard_actions">
                    <button className="dashboard_icon-btn blue"><Eye size={16} /></button>
                    <button
                      className="dashboard_icon-btn green"
                      onClick={() => {
                        setCurrentProduct(p);
                        setShowModal(true);
                      }}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="dashboard_icon-btn red"
                      onClick={() => handleDelete(p._id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!loading && products.length === 0 && (
          <div className="dashboard_empty">No products found</div>
        )}
      </div>

      {showModal && (
        <ProductModal
          product={currentProduct}
          onClose={() => {
            setShowModal(false);
            setCurrentProduct(null);
          }}
          onSuccess={loadProducts}
        />
      )}
    </div>
  );
};

export default Products;

/* ================= MODAL ================= */

const ProductModal = ({ product, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    title: product?.title || "",
    subtitle: product?.subtitle || "",
    category: product?.category || "Dining",
    price: product?.price || "",
    stock: product?.stock || 0,
    featured: product?.featured || false,
  });

  const submit = async (e) => {
    e.preventDefault();
    product
      ? await productsAPI.update(product._id, form)
      : await productsAPI.create(form);
    onSuccess();
    onClose();
  };

  return (
    <div className="dashboard_modal-overlay">
      <div className="dashboard_modal">
        <div className="dashboard_modal-header">
          <h2>{product ? "Edit Product" : "Add Product"}</h2>
        </div>

        <form className="dashboard_modal-body" onSubmit={submit}>
          <div className="dashboard_form-grid">
            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <input
              placeholder="Subtitle"
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            />
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option>Dining</option>
              <option>Living</option>
              <option>Bedroom</option>
              <option>Office</option>
            </select>
            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />
          </div>

          <label className="dashboard_checkbox">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            Featured Product
          </label>

          <div className="dashboard_modal-actions">
            <button type="submit" className="dashboard_add-btn">
              Save
            </button>
            <button type="button" className="dashboard_cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
