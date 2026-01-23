import React from 'react'
import Filter_component from '../../components/filter/Filter_components'
import greater from '/greater.svg';
import ProductSection from '../../components/productsection/Productsection';
import Single_productcompo from '../../components/single_product_components/Single_productcompo';
import SP_description from '../../components/SP_description/SP_description';


const Single_product = () => {
  return (
    <div>
      <Filter_component filter_heading={"Home"} menu_svg={greater}  text={"shop"} destop_svg={greater} page_first_number={"Asgaard sofa"}/>
   
    <Single_productcompo />
    
    <SP_description />
   <ProductSection text={"Our Product"} />
  
  
    </div>
  )
}

export default Single_product
