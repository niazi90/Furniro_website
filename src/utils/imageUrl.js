export const getImageUrl = (imageName) => {
  if (!imageName) return '/placeholder.png'; // fallback image
  return `http://localhost:5000/uploads/${imageName}`;
};
