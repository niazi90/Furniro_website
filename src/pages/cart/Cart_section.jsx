import React from 'react';
import './Cart_section.css';
import img3 from '/image3.png';
import deleteicon from '/delete.svg'


import { Link } from 'react-router-dom';

const Cart_section = () => {
    return (
        <>
            <div className='parent_cart'>
                <div className='child_cart'>
                    <ul>
                        <li></li>
                        <li>Product</li>
                        <li>Price</li>
                        <li>Quantity</li>
                        <li>Subtotal</li>
                        <li></li>
                    </ul>
                    <div className='cartbody'>
                        <img src={img3} alt="" />
                        <p>Asgaard sofa</p>
                        <p>Rs. 250,000.00</p>
                        <p>1</p>
                       <p>Rs. 250,000.00</p>
                       <img className='deleteicon' src={deleteicon} alt="deleteicons" />


                    </div>
                </div>
                <div className='right-cart'>
                    <h1 className='carttotal'>Cart Totals</h1>
                    <div className='subtotal'>  <p className='st'>Subtotal</p>
                        <p>Rs 230000</p>
                    </div>

                    <div className='subtotal'>
                        <h3>Total</h3>
                        <p>Rs 230000</p>
                    </div>
                    <div className='checkoutparent'>
                        <Link to='/checkout'>
                        <button  className='checkoutbtn'>Check Out</button>
                   </Link>
                    </div>
                </div>


            </div>


        </>
    )
}

export default Cart_section
