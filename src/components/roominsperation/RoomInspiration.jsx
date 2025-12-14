import React, { useEffect, useRef, useState } from "react";

import "./Roominsperation.css";
/* Import your 4 demo images from src/assets */


const slidesData = [
  {
    id: 1,
    image: "/Rectangle24.png",
    category: "Bed Room",
    smallTitle: "01",
    title: "Inner Peace",
    description: "A calm, minimalist bedroom design to relax and rest.",
  },
  {
    id: 2,
    image: "/Rectangle25.png",
    category: "Dining Room",
    smallTitle: "02",
    title: "Sunny Mornings",
    description: "Bright and airy dining area full of natural light.",
  },
  {
    id: 3,
    image: "/Rectangle26.png",
    category: "Living Room",
    smallTitle: "03",
    title: "Warm Gatherings",
    description: "Soft textures and warm tones for cozy evenings.",
  },
  {
    id: 4,
    image: "/Rectangle24.png",
    category: "Office",
    smallTitle: "04",
    title: "Focus Corner",
    description: "A clean workspace for focus and productivity.",
  },
];

export default function RoomInspiration() {
  const [index, setIndex] = useState(0);
  const autoplayRef = useRef(null);
  const pauseRef = useRef(false);

  const prevSlide = () => {
    setIndex((i) => (i - 1 + slidesData.length) % slidesData.length);
  };

  const nextSlide = () => {
    setIndex((i) => (i + 1) % slidesData.length);
  };

  // go to specific slide (by dot)
  const goTo = (i) => {
    setIndex(i);
  };

  // autoplay (4s)
  useEffect(() => {
    autoplayRef.current = () => {
      if (!pauseRef.current) {
        setIndex((i) => (i + 1) % slidesData.length);
      }
    };
  });

  useEffect(() => {
    const play = () => autoplayRef.current();
    const id = setInterval(play, 4000);
    return () => clearInterval(id);
  }, []);

  // pause on hover handlers
  const handleMouseEnter = () => {
    pauseRef.current = true;
  };
  const handleMouseLeave = () => {
    pauseRef.current = false;
  };

  return (
    <section className="inspiration-wrapper">
      <div className="inspiration-content">
        {/* LEFT TEXT */}
        <div className="left-section">
          <h1>
            50+ Beautiful rooms <br /> inspiration
          </h1>

          <p className="lead">
            Our designer already made a lot of beautiful prototype of rooms that
            inspire you
          </p>

          <button className="explore-btn" aria-label="Explore more">
            Explore More
          </button>
        </div>

        {/* RIGHT SLIDER */}
        <div
          className="right-section"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="slider-viewport">
            {slidesData.map((slide, sIdx) => {
              const isActive = sIdx === index;
              return (
                <div
                  key={slide.id}
                  className={`slide ${isActive ? "active" : ""}`}
                  aria-hidden={!isActive}
                >
                  <img src={slide.image} alt={slide.title} className="slide-img" />

                  {/* caption card inside image (bottom-left) */}
                  <div className="caption-card">
                    <div className="caption-top">
                      <span className="small">{slide.smallTitle}</span>
                      <span className="divider">—</span>
                      <span className="category">{slide.category}</span>
                    </div>

                    <h3 className="caption-title">{slide.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* left / right arrows */}
          <button
            className="arrow arrow-left"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            className="arrow arrow-right"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            ›
          </button>

          {/* dots */}
          <div className="dots">
            {slidesData.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === index ? "dot-active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
