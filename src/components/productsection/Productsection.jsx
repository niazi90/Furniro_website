import React from 'react';
import './Productsection.css'; // Import the CSS file
import img1 from '/image1.png';
import img2 from '/image2.png';
import img3 from '/image3.png';
import img4 from '/image4.png';
import img5 from '/image5.png';
import img6 from '/image6.png';
import img7 from '/image7.png';
import img8 from '/image8.png';
import Cart from '../../pages/cart/Cart';

const ProductSection = ({text}) => {

    const product = [
      {
        id: 1,
        title: "Syltherine",
        subtitle:"Stylish cafe chair",
        price:"Rp 2.500.000",
        discount:"Rp 3.500.000",
        add_to_cart:"Add to cart",
        discount_text:"-30%",
        share:"Share",
        compare:"Compare",
        like:"Like",
         image: img1 ,
         image_title:"Syltherine"
      },
      {
        id: 2,
        title: "Leviosa",
        subtitle:"Stylish cafe chair",
        price:"Rp 2.500.000",
        discount:"Rp 3.500.000",
        add_to_cart:"Add to cart",
        discount_text:"-20%",
        share:"Share",
        compare:"Compare",
        like:"Like",
         image: img2 ,
         image_title:"Leviosa"
      },
      {
        id: 3,
        title: "Lolito",
        subtitle:"Luxury big sofa",
        price:"Rp 7.500.000",
        discount:"Rp 14500.000",
        add_to_cart:"Add to cart",
        discount_text:"-20%",
        share:"Share",
        compare:"Compare",
        like:"Like",
         image: img3 ,
         image_title:"Luxury big sofa"
      },
      {
        id: 4,
        title: "Respira",
        subtitle:"Outdoor bar table and stool",
        price:"Rp 500.000",
        discount:"",
        add_to_cart:"Add to cart",
        discount_text:"New",
        share:"Share",
        compare:"Compare",
        like:"Like",
         image: img4 ,
         image_title:""
      },
      {
        id: 5,
        title: "Grifo",
        subtitle:"Night lamp",
        price:"Rp 1.500.000",
        discount:"",
        add_to_cart:"Add to cart",
        discount_text:"",
        share:"Share",
        compare:"Compare",
        like:"Like",
         image: img5 ,
         image_title:"Night lamp"
      },
      {
        id: 6,
        title: "Muggo",
        subtitle:"Small mug",
        price:"Rp 1.500.000",
        discount:"",
        add_to_cart:"Add to cart",
        discount_text:"New",
        share:"Share",
        compare:"Compare",
        like:"Like",
         image: img6 ,
         image_title:""
      },
      {
        id: 7,
        title: "Pingky",
        subtitle:"Cute bed set",
        price:"Rp 7.000.000",
        discount:"Rp 14.000.00",
        add_to_cart:"Add to cart",
        discount_text:"-50%",
        share:"Share",
        compare:"Compare",
        like:"Like",
         image: img7 ,
         image_title:""
      },
      {
        id: 8,
        title: "Potty",
        subtitle:"Minimalist flower pot",
        price:"Rp 500.000",
        discount:"",
        add_to_cart:"Add to cart",
        discount_text:"New",
        share:"Share",
        compare:"Compare",
        like:"Like",
         image: img8 ,
         image_title:"Minimalist flower pot"
      },
    
    
      
    ];

      
 






  return (
    <div className="product-section">
      <h2>{text}</h2>
       
      <div className="product-container">
         {product.map(feature=>(
        <div className="product-card" key={feature.id}>
          {/* discount price  */}

{feature.discount_text && (
  <div className="discount-price">
    <p className="discount-text">{feature.discount_text}</p>
  </div>
)}


          {/* <div className='discount-price'> <p className='discount-text' >{feature.discount_text}</p></div> */}
          <img src={feature.image} alt={feature.image_title} />
          <div className="product-info">
            <h3>{feature.title}</h3>
            <p>{feature.subtitle}</p>
            <span className="price">{feature.price}</span>
            <span className="discount">{feature.discount}</span> 
            <div className="hover-overlay">
            <a href="/cart">
              <button  className="add-to-cart">{feature.add_to_cart}</button></a>
              <div className="actions">
                <span>{feature.share}</span>
                <span>{feature.compare}</span>
                <span>{feature.like}</span>
              </div>
            </div>
          </div>
        </div>))}
          {/* <div className="product-card">
               <div className='discount-price'> <p className='discount-text' >{discount_price}</p></div>
          <img src="/image3.png" alt="Syltherine" />
          <div className="product-info">
            <h3>Syltherine</h3>
            <p>Stylish cafe chair</p>
            <span className="price">Rp 2,500,000</span>
            <span className="discount">-30%</span>
            <div className="hover-overlay">
              <button className="add-to-cart">Add to cart</button>
              <div className="actions">
                <span>Share</span>
                <span>Compare</span>
                <span>Like</span>
              </div>
            </div>
          </div>
        </div>   */}
         {/* <div className="product-card">
             <div className='discount-price'> <p className='discount-text' >{discount_price}</p></div>
          <img src="/image4.png" alt="Syltherine" />
          <div className="product-info">
            <h3>Syltherine</h3>
            <p>Stylish cafe chair</p>
            <span className="price">Rp 2,500,000</span>
            <span className="discount">-30%</span>
            <div className="hover-overlay">
              <button className="add-to-cart">Add to cart</button>
              <div className="actions">
                <span>Share</span>
                <span>Compare</span>
                <span>Like</span>
              </div>
            </div>
          </div>
        </div>  */}
          {/* <div className="product-card">
             <div className='discount-price'> <p className='discount-text' >{discount_price}</p></div>
          <img src="/image5.png" alt="Syltherine" />
          <div className="product-info">
            <h3>Syltherine</h3>
            <p>Stylish cafe chair</p>
            <span className="price">Rp 2,500,000</span>
            <span className="discount">-30%</span>
            <div className="hover-overlay">
              <button className="add-to-cart">Add to cart</button>
              <div className="actions">
                <span>Share</span>
                <span>Compare</span>
                <span>Like</span>
              </div>
            </div>
          </div>
        </div>  */}
          {/* <div className="product-card">
             <div className='discount-price'> <p className='discount-text' >{discount_price}</p></div>
          <img src="/image6.png" alt="Syltherine" />
          <div className="product-info">
            <h3>Syltherine</h3>
            <p>Stylish cafe chair</p>
            <span className="price">Rp 2,500,000</span>
            <span className="discount">-30%</span>
            <div className="hover-overlay">
              <button className="add-to-cart">Add to cart</button>
              <div className="actions">
                <span>Share</span>
                <span>Compare</span>
                <span>Like</span>
              </div>
            </div>
          </div>
        </div>  */}
          {/* <div className="product-card">
             <div className='discount-price'> <p className='discount-text' >{discount_price}</p></div>
          <img src="/image6.png" alt="Syltherine" />
          <div className="product-info">
            <h3>Syltherine</h3>
            <p>Stylish cafe chair</p>
            <span className="price">Rp 2,500,000</span>
            <span className="discount">-30%</span>
            <div className="hover-overlay">
              <button className="add-to-cart">Add to cart</button>
              <div className="actions">
                <span>Share</span>
                <span>Compare</span>
                <span>Like</span>
              </div>
            </div>
          </div>
        </div>    */}
        {/* <div className="product-card">
             <div className='discount-price'> <p className='discount-text' >{discount_price}</p></div>
          <img src="/image7.png" alt="Syltherine" />
          <div className="product-info">
            <h3>Syltherine</h3>
            <p>Stylish cafe chair</p>
            <span className="price">Rp 2,500,000</span>
            <span className="discount">-30%</span>
            <div className="hover-overlay">
              <button className="add-to-cart">Add to cart</button>
              <div className="actions">
                <span>Share</span>
                <span>Compare</span>
                <span>Like</span>
              </div>
            </div>
          </div>
        </div>  */}
          {/* <div className="product-card">
             <div className='discount-price'> <p className='discount-text' >{discount_price}</p></div>
          <img src="/image8.png" alt="Syltherine" />
          <div className="product-info">
            <h3>Syltherine</h3>
            <p>Stylish cafe chair</p>
            <span className="price">Rp 2,500,000</span>
            <span className="discount">-30%</span>
            <div className="hover-overlay">
              <button className="add-to-cart">Add to cart</button>
              <div className="actions">
                <span>Share</span>
                <span>Compare</span>
                <span>Like</span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <button className="show-more">Show More</button>
    </div>
  );
};

export default ProductSection;
