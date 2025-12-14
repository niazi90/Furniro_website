import React from "react";
import "./Sharesection.css";

const ShareSection = () => {
  return (
    <section className="share-wrapper">
      <h2 className="share-title">
        Share your setup with <br />
        <span>#FuniroFurniture</span>
      </h2>

      <div className="share-grid">

        <img src="/1.png" className="item item1" alt="" />
        <img src="/2.png" className="item item2" alt="" />
        <img src="/4.png" className="item item3" alt="" />

        <img src="/5.png" className="item item4" alt="" />
        <img src="/6.png" className="item item5" alt="" />
        <img src="/7.png" className="item item6" alt="" />

        <img src="/8.png" className="item item7" alt="" />
        <img src="/7.png" className="item item8" alt="" />
      </div>
    </section>
  );
};

export default ShareSection;
