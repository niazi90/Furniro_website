// utils/imageUrl.js
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/placeholder.png';
  
  // If already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If starts with /uploads, add backend URL
  if (imagePath.startsWith('/uploads')) {
    return `http://localhost:5000${imagePath}`;
  }
  
  // Otherwise add /uploads/ prefix
  return `http://localhost:5000/uploads/${imagePath}`;
};