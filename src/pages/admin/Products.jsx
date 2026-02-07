import React, { useState, useEffect } from "react";
import { productsAPI } from "../../services/api";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  AlertCircle,
} from "lucide-react";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [error, setError] = useState("");

  // Load products whenever category or search term changes
  useEffect(() => {
    loadProducts();
  }, [category]);

  const loadProducts = async () => {
    try {
      setError("");
      setLoading(true);
      const res = await productsAPI.getAll({
        category: category !== "All" ? category : undefined,
        search: searchTerm || undefined,
      });
      setProducts(res.data.data || []);
    } catch (err) {
      console.error("❌ Error loading products:", err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await productsAPI.delete(id);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("❌ Error deleting product:", err);
      alert("Failed to delete product");
    }
  };

  const filteredProducts = products.filter((p) =>
    p.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products-page">
      {/* Error Banner */}
      {error && (
        <div className="error-banner">
          <AlertCircle size={20} />
          <span>{error}</span>
          <button className="retry-btn" onClick={loadProducts}>Retry</button>
        </div>
      )}

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Products</h1>
          <p>Manage your product inventory and catalog</p>
        </div>
        <button
          className="btn-primary"
          onClick={() => {
            setCurrentProduct(null);
            setShowModal(true);
          }}
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Controls */}
      <div className="products-controls">
        <div className="search-wrapper">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="filter-select"
        >
          <option value="All">All Categories</option>
          <option value="Dining">Dining</option>
          <option value="Living">Living</option>
          <option value="Bedroom">Bedroom</option>
          <option value="Office">Office</option>
        </select>
      </div>

      {/* Results Info */}
      <div className="results-info">
        Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> products
      </div>

      {/* Table */}
      <div className="table-wrapper">
        {loading ? (
          <div className="table-loading">
            <div className="loader"></div>
            <p>Loading products...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <table className="products-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product._id}>
                  <td>
                    <div className="product-cell">
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.title}
                          onError={(e) => e.target.src = "/placeholder.png"}
                        />
                      )}
                      <div className="product-info">
                        <p className="product-name">{product.title}</p>
                        <p className="product-subtitle">{product.subtitle}</p>
                      </div>
                    </div>
                  </td>
                  <td><span className="category-badge">{product.category}</span></td>
                  <td><span className="price">Rs {product.price?.toLocaleString()}</span></td>
                  <td>
                    <span className="discount">
                      {product.discount ? `Rs ${product.discount}` : "-"}
                      {product.discountPercentage ? ` (${product.discountPercentage}%)` : ""}
                    </span>
                  </td>
                  <td>
                    <span className={`stock-badge ${
                      product.stock === 0 ? "stock-critical" : product.stock < 10 ? "stock-low" : "stock-good"
                    }`}>
                      {product.stock} units
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${product.featured ? "featured" : "regular"}`}>
                      {product.featured ? "Featured" : "Regular"}
                    </span>
                  </td>
                  <td>
                    <div className="actions">
                      <button
                        className="btn-icon edit"
                        onClick={() => {
                          setCurrentProduct(product);
                          setShowModal(true);
                        }}
                        title="Edit Product"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="btn-icon delete"
                        onClick={() => handleDelete(product._id)}
                        title="Delete Product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <div className="empty-icon"><AlertCircle size={40} /></div>
            <h3>No products found</h3>
            <p>Try adjusting your search or create a new product</p>
          </div>
        )}
      </div>

      {/* Product Modal */}
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

/* ==================== PRODUCT MODAL ==================== */

const ProductModal = ({ product, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    title: product?.title || "",
    subtitle: product?.subtitle || "",
    category: product?.category || "Dining",
    price: product?.price || "",
    discount: product?.discount || "",
    discountPercentage: product?.discountPercentage || "",
    stock: product?.stock || 0,
    featured: product?.featured || false,
    image: product?.image || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(product?.image || "");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!form.title || !form.price || form.category === "Select Category") {
        setError("Please fill all required fields");
        setLoading(false);
        return;
      }

      const submitData = {
        ...form,
        price: parseFloat(form.price),
        discount: parseFloat(form.discount || 0),
        discountPercentage: parseFloat(form.discountPercentage || 0),
        stock: parseInt(form.stock),
      };

      if (product) {
        await productsAPI.update(product._id, submitData);
      } else {
        await productsAPI.create(submitData);
      }

      onSuccess();
    } catch (err) {
      console.error("❌ Error saving product:", err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{product ? "Edit Product" : "Add New Product"}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form className="modal-body" onSubmit={handleSubmit}>
          {error && <div className="error-box"><AlertCircle size={16} /><span>{error}</span></div>}

          {/* Image */}
          <div className="image-section">
            <label>Product Image</label>
            {imagePreview && <div className="image-preview"><img src={imagePreview} alt="Preview" /></div>}
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <small>Upload product image (JPG, PNG, etc.)</small>
          </div>

          {/* Form Fields */}
          <div className="form-grid">
            <div className="form-group">
              <label>Product Name *</label>
              <input
                type="text"
                placeholder="Enter product name"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Subtitle</label>
              <input
                type="text"
                placeholder="Enter subtitle"
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
              >
                <option value="Select Category">Select Category</option>
                <option value="Dining">Dining</option>
                <option value="Living">Living</option>
                <option value="Bedroom">Bedroom</option>
                <option value="Office">Office</option>
              </select>
            </div>

            <div className="form-group">
              <label>Price (Rs) *</label>
              <input
                type="number"
                placeholder="0"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Discount Amount (Rs)</label>
              <input
                type="number"
                placeholder="0"
                value={form.discount}
                onChange={(e) => setForm({ ...form, discount: e.target.value })}
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Discount Percentage (%)</label>
              <input
                type="number"
                placeholder="0"
                value={form.discountPercentage}
                onChange={(e) => setForm({ ...form, discountPercentage: e.target.value })}
                min="0"
                max="100"
              />
            </div>

            <div className="form-group">
              <label>Stock Quantity *</label>
              <input
                type="number"
                placeholder="0"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                required
                min="0"
              />
            </div>
          </div>

          <label className="checkbox-group">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            <span>Mark as Featured Product</span>
          </label>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Saving..." : product ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
