<<<<<<< Updated upstream
import React from 'react';
import './Filter_components.css';

=======
import React, { useState } from 'react';
import './Filter_components.css';

const Filter_component = ({
  filter_svg,
  filter_text,
  filter_heading,
  menu_svg,
  menu_text,
  destop_svg,
  text,
  destop_text,
  Showing_text,
  page_first_number,
  page_last_number,
  righttext,
  rightnumber,
  short_by,
  default_text,
  onFilterChange
}) => {
  const [filters, setFilters] = useState({
    category: rightnumber || 'All',
    sort: default_text || 'Newest'
  });
>>>>>>> Stashed changes

const Filter_component = ({ filter_svg, filter_text, filter_heading, menu_svg,
     menu_text, destop_svg, text, destop_text, Showing_text ,page_first_number,page_last_number,righttext,rightnumber,short_by,default_text}) => {
    return (
        <div className="filter-wrapper">
            <div className="filter-header">

<<<<<<< Updated upstream
                <div className="filter-left">
                    <div className="filter-icon-box">
                        <img src={filter_svg} alt={filter_text} />
                    </div>
                    <span className="filter-file-name">{filter_heading}</span>
                    <div className="filter-icon-box">
                        <img src={menu_svg} alt={menu_text} />
                    </div>
 <span className="filter-file-name">{text}</span>

                    <div className="filter-icon-box">
                        <img src={destop_svg} alt={destop_text} />
                    </div>

                    <div className="filter-divider"></div>

                    <div className="filter-info">
                        <span className="filter-showing">{Showing_text}</span>

                     

                            <span className="filter-range">{ page_first_number}</span>

                           

                        <span className="filter-total">{page_last_number}</span>
                    </div>
                </div>

                <div className="filter-right">
                    <div className="filter-controls">
                        {righttext && rightnumber && short_by && default_text && (
 <>
                        <span className="filter-label">{righttext}</span>

                        <div className="filter-select">
                            <span className="filter-value">{rightnumber}</span>
                        </div>

                        <span className="filter-label">{short_by}</span>

                        <div className="filter-select">
                            <span className="filter-value">{default_text}</span>
                        </div>
   </>                     
     )}
                    </div>
                </div>

            </div>
        </div>
    );
=======
  return (
    <div className="filter-wrapper">
      <div className="filter-header">
        {/* ===== LEFT SIDE — bilkul same hai ===== */}
        <div className="filter-left">
          <div className="filter-icon-box">
            <img src={filter_svg} alt={filter_text} />
          </div>
          <span className="filter-file-name">{filter_heading}</span>
          <div className="filter-icon-box">
            <img src={menu_svg} alt={menu_text} />
          </div>
          <span className="filter-file-name">{text}</span>
          <div className="filter-icon-box">
            <img src={destop_svg} alt={destop_text} />
          </div>
          <div className="filter-divider"></div>
          <div className="filter-info">
            <span className="filter-showing">{Showing_text}</span>
            <span className="filter-range">{page_first_number}</span>
            <span className="filter-total">{page_last_number}</span>
          </div>
        </div>

        {/* ===== RIGHT SIDE — select dropdowns add kiye ===== */}
        <div className="filter-right">
          <div className="filter-controls">
            {righttext && short_by && (
              <>
                {/* Category Select */}
                <span className="filter-label">{righttext}</span>
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

                {/* Sort Select */}
                <span className="filter-label">{short_by}</span>
                <select
                  className="filter-select"
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                >
                  <option value="Newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
>>>>>>> Stashed changes
};

export default Filter_component;
