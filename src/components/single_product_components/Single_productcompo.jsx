import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import facebook from '/facebookl.svg';
import linkedin from '/linkedin.svg';
import twitter from '/twitter.svg';
import { Star, StarHalf } from 'lucide-react';
import './Single_productcompo.css';
import { productsAPI, cartAPI } from '../../services/api';
import { getImageUrl } from '../../utils/imageUrl';

const Single_productcompo = ({ productId }) => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Fetch product data
  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getById(productId);
      setProduct(response.data.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      setAddingToCart(true);
      await cartAPI.addItem(product._id, quantity, selectedSize, selectedColor);
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  // Get product images - 4 thumbnails
  const getProductImages = () => {
    if (!product) return [];
    
    // If product has images array, use it
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      return product.images.slice(0, 4);
    }
    
    // Otherwise, duplicate the main image 4 times
    if (product.image) {
      return [product.image, product.image, product.image, product.image];
    }
    
    return [];
  };

  const productImages = getProductImages();

  const colors = [
    { name: 'blue', color: '#816DFA' },
    { name: 'black', color: '#000000' },
    { name: 'gold', color: '#B88E2F' }
  ];

  const sizes = ['L', 'XL', 'XS'];

  // Calculate rating display
  const renderStars = (rating = 4.5) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="starFilled" fill="#FFC700" />);
    }
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="starFilled" fill="#FFC700" />);
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '60px 0' }}>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '60px 0' }}>
        <p>Product not found</p>
        <button 
          onClick={() => navigate('/shop')} 
          style={{ 
            marginTop: '20px', 
            padding: '12px 30px', 
            border: '1px solid #000', 
            background: 'white', 
            cursor: 'pointer', 
            borderRadius: '8px' 
          }}
        >
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="wrapper">
        <div className="grid">
          
          {/* Image Section */}
          <div className="imageSection">
            {/* Thumbnails - Left side */}
            <div className="thumbnailContainer">
              {productImages.map((img, i) => (
                <div 
                  key={i} 
                  className={`thumbnail ${selectedImageIndex === i ? 'thumbnailActive' : ''}`}
                  onClick={() => setSelectedImageIndex(i)}
                >
                  <div className="thumbnailInner">
                    <img 
                      src={getImageUrl(img)} 
                      alt={`${product.title} view ${i + 1}`} 
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Main Image - Right side */}
            <div className="mainImage">
              <div className="mainImageInner">
                <div className="sofaContainer">
                  <div className="sofaWrapper">
                    <div className="sofaBase">
                      <img 
                        src={getImageUrl(productImages[selectedImageIndex] || product.image)} 
                        alt={product.title} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="detailsSection">
            <div>
              <h1 className="title">{product.title}</h1>
              <p className="prices">Rs. {product.price?.toLocaleString()}</p>
            </div>

            <div className="ratingContainer">
              <div className="stars">
                {renderStars(product.rating || 4.5)}
              </div>
              <div className="divider"></div>
              <p className="reviewText">{product.reviews || 5} Customer Review</p>
            </div>

            <p className="description">
              {product.description || product.subtitle || 'Setting the bar as one of the loudest speakers in its class...'}
            </p>

            {/* Size Selection */}
            <div>
              <p className="label">Size</p>
              <div className="optionsContainer">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`sizeButton ${selectedSize === size ? 'sizeButtonActive' : ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <p className="label">Color</p>
              <div className="optionsContainer">
                {colors.map(c => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`colorButton ${selectedColor === c.name ? 'colorButtonActive' : ''}`}
                    style={{ backgroundColor: c.color }}
                    aria-label={`Select ${c.name} color`}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="actionsContainer">
              <div className="quantitySelector">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                  className="quantityButton"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="quantityDisplay">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)} 
                  className="quantityButton"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button 
                className="cartButton" 
                onClick={handleAddToCart}
                disabled={addingToCart}
              >
                {addingToCart ? 'Adding...' : 'Add To Cart'}
              </button>
              <button className="compareButton">+ Compare</button>
            </div>

            {/* Meta Information */}
            <div className="metaSection">
              <div className="metaRow">
                <span className="metaLabel">SKU</span>
                <span>:</span>
                <span className="metaValue">{product.sku || 'SS001'}</span>
              </div>
              <div className="metaRow">
                <span className="metaLabel">Category</span>
                <span>:</span>
                <span className="metaValue">{product.category || 'Sofas'}</span>
              </div>
              <div className="metaRow">
                <span className="metaLabel">Tags</span>
                <span>:</span>
                <span className="metaValue">{product.tags || 'Sofa, Chair, Home, Shop'}</span>
              </div>

              <div className="metaRow">
                <span className="metaLabel">Share</span>
                <span>:</span>
                <div className="socialIcons">
                  <button className="socialButton" aria-label="Share on Facebook">
                    <img src={facebook} alt="Facebook" />
                  </button>
                  <button className="socialButton" aria-label="Share on LinkedIn">
                    <img src={linkedin} alt="LinkedIn" />
                  </button>
                  <button className="socialButton" aria-label="Share on Twitter">
                    <img src={twitter} alt="Twitter" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Single_productcompo;