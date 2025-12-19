
import React, { useState } from 'react';
import facebook from '/facebookl.svg';
import linkedin from '/linkedin.svg';
import twitter from '/twitter.svg';
import { Star, StarHalf} from 'lucide-react';
import './Single_productcompo.css';
import Asgaardsofa from '/Asgaardsofa.png';
import sofaset1 from '/sofaset1.png';
import sofaset2 from '/sofaset2.png';
import sofaset3 from '/sofaset3.png';
import sofaset4 from '/sofaset4.png';


const Single_productcompo = () => {
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [quantity, setQuantity] = useState(1);

  const thumbnails = [sofaset1, sofaset2, sofaset3, sofaset4];

  const colors = [
    { name: 'blue', color: '#818CF8' },
    { name: 'black', color: '#000000' },
    { name: 'gold', color: '#CA8A04' }
  ];

  const sizes = ['L', 'XL', 'XS'];

  return (
    <div className="container">
      <div className="wrapper">
        <div className="grid">

          {/* LEFT SIDE */}
          <div className="imageSection">
            <div className="thumbnailContainer">
              {thumbnails.map((img,i) => (
                <div  className="thumbnail">
                  <div className="thumbnailInner"><img src={img} alt="sofaset1" /></div>
                </div>
              ))}
            </div>

            <div className="mainImage">
              <div className="mainImageInner">
                <div className="sofaContainer">
                  <div className="sofaWrapper">

                    <div className="sofaBase">
                      <img src={Asgaardsofa} alt="Asgaardsofa" />

                    </div>
               

                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="detailsSection">
            <div>
              <h1 className="title">Asgaard sofa</h1>
              <p className="prices">Rs. 250,000.00</p>
            </div>

            <div className="ratingContainer">
              <div className="stars">
                <Star className="starFilled" />
                <Star className="starFilled" />
                <Star className="starFilled" />
                <Star className="starFilled" />
                <StarHalf className="starFilled" />
              </div>
              <div className="divider"></div>
              <p className="reviewText">5 Customer Review</p>
            </div>

            <p className="description">
              Setting the bar as one of the loudest speakers in its class...
            </p>

            {/* SIZE */}
            <div>
              <p className="label">Size</p>
              <div className="optionsContainer">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`sizeButton ${selectedSize === size ? 'sizeButtonActive' : ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* COLOR */}
            <div>
              <p className="label">Color</p>
              <div className="optionsContainer">
                {colors.map(c => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`colorButton ${selectedColor === c.name ? 'colorButtonActive' : ''}`}
                    style={{ backgroundColor: c.color }}
                  />
                ))}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="actionsContainer">
              <div className="quantitySelector">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="quantityButton">-</button>
                <span className="quantityDisplay">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="quantityButton">+</button>
              </div>

              <button className="cartButton">Add To Cart</button>
              <button className="compareButton">+ Compare</button>
            </div>

            {/* META */}
            <div className="metaSection">
              <div className="metaRow">
                <span className="metaLabel">SKU</span>
                <span>:</span>
                <span className="metaValue">SS001</span>
              </div>
              <div className="metaRow">
                <span className="metaLabel">Category</span>
                <span>:</span>
                <span className="metaValue">Sofas</span>
              </div>
              <div className="metaRow">
                <span className="metaLabel">Tags</span>
                <span>:</span>
                <span className="metaValue">Sofa, Chair, Home, Shop</span>
              </div>

              <div className="metaRow">
                <span className="metaLabel">Share</span>
                <span>:</span>
                <div className="socialIcons">
                  <button className="socialButton"><img src={facebook} alt="facebook" /></button>
                  <button className="socialButton"><img src={linkedin} alt="linkdin" /></button>
                  <button className="socialButton"><img src={twitter} alt="twitter" /></button>
                
              
                  {/* <button className="socialButton"><Linkedin size={20} /></button>
                  <button className="socialButton"><Twitter size={20} /></button> */}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
export default Single_productcompo;