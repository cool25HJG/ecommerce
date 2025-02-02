import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import iphone from '../assets/image/iphone.png'
import slide2 from '../assets/image/slide2.png'
import slide3 from '../assets/image/slide3.png'
import slide4 from '../assets/image/slide4.png'
import slide5 from '../assets/image/slide5.png'

function Header() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const slides = [
    {
      title: "iphone 15 pro ",
      discount: "Up to 10%",
      type: "off Voucher",
      image: iphone, 
      link: ""
    },
    {
      title: " Gaming computer Desktop ",
      discount: "Up to 10%",
      type: "off Voucher",
      image: slide5, 
      link: ""
    },
    {
      title: " Gaming computer Desktop  ",
      discount: "Up to 10%",
      type: "off Voucher",
      image: slide2, 
      link: ""
    },
    {
      title: " Gaming computer Desktop",
      discount: "Up to 10%",
      type: "off Voucher",
      image: slide3, 
      link: ""
    },
    {
      title: " Gaming computer Desktop",
      discount: "Up to 10%",
      type: "off Voucher",
      image: slide4, 
      link: ""
    },
  ];

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); 
    return () => clearInterval(timer);
  }, []);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSlide < slides.length - 1) {
      setCurrentSlide(curr => curr + 1);
    }

    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(curr => curr - 1);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section className="slider-section">
      <div className="slider-container">
        <div 
          className="slides-wrapper" 
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {slides.map((slide, index) => (
            <div key={index} className="slide">
              <div className="slide-content">
                <div className="slide-text">
                  <h2>{slide.title}</h2>
                  <div className="discount-text">
                    <h1>{slide.discount}</h1>
                    <h3>{slide.type}</h3>
                  </div>
                  <button onClick={() => navigate(slide.link)}>
                    Shop Now <span>→</span>
                  </button>
                </div>
                <div className="slide-image">
                  <img src={slide.image} alt={slide.title} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Header;