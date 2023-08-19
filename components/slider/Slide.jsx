import React from "react";

const Slide = ({ image, active }) => {
  const slideStyle = {
    backgroundImage: `${image}`,
    opacity: active ? 1 : 0,
  };

  return <div className="slide" style={slideStyle}></div>;
};

export default Slide;
