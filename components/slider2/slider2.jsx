import React, { useState, useEffect } from "react";
import "./ImageSlider.css";

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + images.length) % images.length
    );
  };
  const images = ["/header/header1.jpeg", "/header/header2.jpeg"];

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 10000); // Change image every 10 seconds (10000 milliseconds)

    return () => {
      clearInterval(intervalId); // Cleanup when the component unmounts
    };
  }, []);

  return (
    <div className="slider-container2">
      {/* <button className="prev" onClick={prevSlide}>
        Previous
  </button>*/}
      <div className="slide3">
        <img src={images[currentSlide]} alt={`Slide ${currentSlide + 1}`} />
      </div>
      {/* <button className="next" onClick={nextSlide}>
        Next
      </button>  */}
    </div>
  );
};

export default ImageSlider;
