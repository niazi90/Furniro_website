import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import ProductSection from '../../components/productsection/Productsection';
import Single_productcompo from '../../components/single_product_components/Single_productcompo';
import SP_description from '../../components/SP_description/SP_description';
import { productsAPI } from '../../services/api';

const Single_product = () => {
  const { id } = useParams(); // Get product ID from URL
  const [productName, setProductName] = useState('Product');

  useEffect(() => {
    if (id) {
      fetchProductName();
    }
  }, [id]);

  const fetchProductName = async () => {
    try {
      const response = await productsAPI.getById(id);
      setProductName(response.data.data.title);
    } catch (error) {
      console.error('Error fetching product name:', error);
    }
  };

  return (
    <div>
      <Breadcrumb productName={productName} />
      <Single_productcompo productId={id} />
      <SP_description productId={id} />
      <ProductSection text={"Related Products"} />
    </div>
  );
};

export default Single_product;