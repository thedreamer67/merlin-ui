import React from "react";
import "./styles/ImageCarousel.css";
import pic from "../../static/000031.jpg";

function ImageCarousel() {
  return (
    <section className="framesGrid">
      <img className="framesImg" src={pic} alt="frame1" />
      <img className="framesImg" src={pic} alt="frame2" />
      <img className="framesImg" src={pic} alt="frame3" />
      <img className="framesImg" src={pic} alt="frame4" />
      <img className="framesImg" src={pic} alt="frame5" />
      <img className="framesImg" src={pic} alt="frame6" />
      <img className="framesImg" src={pic} alt="frame7" />
      <img className="framesImg" src={pic} alt="frame8" />
      <img className="framesImg" src={pic} alt="frame9" />
      <img className="framesImg" src={pic} alt="frame10" />
      <img className="framesImg" src={pic} alt="frame11" />
      <img className="framesImg" src={pic} alt="frame12" />
      <img className="framesImg" src={pic} alt="frame13" />
      <img className="framesImg" src={pic} alt="frame14" />
      <img className="framesImg" src={pic} alt="frame15" />
      <img className="framesImg" src={pic} alt="frame16" />
      <img className="framesImg" src={pic} alt="frame17" />
      <img className="framesImg" src={pic} alt="frame18" />
      <img className="framesImg" src={pic} alt="frame19" />
      <img className="framesImg last" src={pic} alt="frame20" />
    </section>
  );
}

export default ImageCarousel;
