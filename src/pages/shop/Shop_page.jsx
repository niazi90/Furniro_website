import React, { useState } from 'react';
import Acheivemnt from '../../components/achivement/Achivement';
import Banner_components from '../../components/banner_components/Banner_components';
import Filter_components from '../../components/filter/Filter_components';
import ProductSection from '../../components/productsection/Productsection';
import filtersvgs from '/filter.svg';
import menusvgs from '/menu.svg';
import destopsvgs from '/destop.svg';

const Shop_page = () => {
  const [activeFilters, setActiveFilters] = useState({
    category: 'All',
    sort: 'Newest'
  });

  // ← yeh add kiya
  const [paginationInfo, setPaginationInfo] = useState({
    currentPage: 1,
    totalProducts: 0,
    productsPerPage: 8
  });

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  // ← dynamic values
  const firstItem = paginationInfo.totalProducts === 0 ? 0 : ((paginationInfo.currentPage - 1) * paginationInfo.productsPerPage) + 1;
  const lastItem = Math.min(paginationInfo.currentPage * paginationInfo.productsPerPage, paginationInfo.totalProducts);

  return (
    <>
      <Banner_components heading={"Shop"} para={"shop"} />

      <Filter_components
        filter_svg={filtersvgs}
        filter_heading={"Filter"}
        filter_text={"Filtersvg"}
        menu_svg={menusvgs}
        menu_text={"Menu svg"}
        destop_svg={destopsvgs}
        destop_text={"destopsvg"}
        Showing_text={"Showing"}
        page_first_number={`${firstItem}-${lastItem}`}                  // ← dynamic
        page_last_number={`of ${paginationInfo.totalProducts} results`} // ← dynamic
        righttext={"show"}
        rightnumber={`${paginationInfo.productsPerPage}`}               // ← dynamic
        short_by={"sorted by"}
        default_text={"Default"}
        onFilterChange={handleFilterChange}
      />

      <ProductSection
        text="All Products"
        filters={activeFilters}
        onPaginationChange={setPaginationInfo}   // ← yeh add kiya
      />

      <Acheivemnt />
    </>
  );
};

export default Shop_page;