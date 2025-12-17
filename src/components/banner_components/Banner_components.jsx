import React from 'react'
import greater from '/greater.svg';
import './banner_components.css';
import { FaGreaterThan } from "react-icons/fa";
const Banner_components = ({heading,para}) => {
  return (
    <>
       <div className='banner_text'>
        <img src="./logo.png" alt="" />

 <h1 className='shoptext'>{heading}</h1>
 <div className='shop_text'>
     <p className='home_text'>Home</p>
     
    <p className='greater'><img src={greater} alt="" /></p>
      <p>{para}</p>
 </div>

     
      
      </div>
    </>
  )
}

export default Banner_components
