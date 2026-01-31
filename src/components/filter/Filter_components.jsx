import React, { useState } from 'react';
import { productsAPI } from '../../services/api';
import './Filter_components.css';

const Filter_component = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: 'All',
    sort: 'newest',
    minPrice: '',
    maxPrice: ''
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  return (
    <div className="filter-wrapper">
      <div className="filter-header">
        <div className="filter-left">
          {/* Existing filter UI */}
        </div>

        <div className="filter-right">
          <div className="filter-controls">
            <span className="filter-label">Sort by:</span>
            <select 
              className="filter-select"
              value={filters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>

            <span className="filter-label">Category:</span>
            <select 
              className="filter-select"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="All">All</option>
              <option value="Dining">Dining</option>
              <option value="Living">Living</option>
              <option value="Bedroom">Bedroom</option>
              <option value="Office">Office</option>
              <option value="Outdoor">Outdoor</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter_component;