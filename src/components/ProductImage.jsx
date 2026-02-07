import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

/**
 * ProductImage Component
 * Properly handles Cloudinary and other image URLs with loading states and fallbacks
 */
const ProductImage = ({ 
  src, 
  alt = 'Product', 
  className = '',
  fallbackIcon = true,
  size = 'medium' // 'small', 'medium', 'large'
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Cloudinary URL helper - handles both formats
  const getCloudinaryUrl = (url) => {
    if (!url) return null;
    
    // If it's already a full URL, return as is
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    // If it's a Cloudinary public_id, construct the full URL
    // Format: https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/public_id.jpg
    if (url.includes('/') && !url.startsWith('http')) {
      // Assuming it's already in the format: /v1234567890/public_id.jpg
      return `https://res.cloudinary.com/dvuyuvy1f/image/upload${url}`;
    }
    
    return url;
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const imageSizes = {
    small: { width: 44, height: 44 },
    medium: { width: 56, height: 56 },
    large: { width: 80, height: 80 }
  };

  const currentSize = imageSizes[size] || imageSizes.medium;
  const processedUrl = getCloudinaryUrl(src);

  return (
    <div 
      className={`product-image-wrapper ${className}`}
      style={{ 
        width: `${currentSize.width}px`, 
        height: `${currentSize.height}px` 
      }}
    >
      {imageLoading && !imageError && (
        <div className="image-loading-skeleton" />
      )}
      
      {!imageError && processedUrl ? (
        <img
          src={processedUrl}
          alt={alt}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ 
            display: imageLoading ? 'none' : 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      ) : (
        <div className="image-fallback">
          {fallbackIcon ? (
            <ImageIcon size={currentSize.width / 2} color="#9ca3af" />
          ) : (
            <span style={{ fontSize: `${currentSize.width / 3}px` }}>🖼️</span>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductImage;

