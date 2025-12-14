import React from 'react';
import './Achivement.css';
import trophy from '/trophy1.png'
import Group from '/Group.png'
import shiping from '/shipping.png'
import Customer_support from '/customer-support.png'

const Acheivemnt = () => {
  const features = [
    {
      id: 1,
      title: "High Quality",
      description: "crafted from top materials",
       image: trophy 
    },
    {
      id: 2,
      title: "Warranty Protection",
      description: "Over 2 years",
       image: Group
    },
    {
      id: 3,
      title: "Free Shipping",
      description: "Order over 150 $",
       image: shiping
    },
    {
      id: 4,
      title: "24 / 7 Support",
      description: "Dedicated support",
      image: Customer_support
    }
  ];

  return (
    <div className="features-layout-container">
      <div className="features-layout-wrapper">
        {features.map(feature => (
          <div className="feature-layout-item" key={feature.id}>
            <div className="feature-layout-icon"><img src={feature.image} alt={feature.title} /></div>
            <div className="feature-layout-text">
              <h3 className="feature-layout-title">{feature.title}</h3>
              <p className="feature-layout-desc">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>);
}
export default Acheivemnt;











