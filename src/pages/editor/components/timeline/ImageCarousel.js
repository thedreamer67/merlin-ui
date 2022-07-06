import React, {useState} from "react";
import "./styles/ImageCarousel.css";
import pic from "../../../../static/000031.jpg";
import FrameTools from './FrameTools'
import { groupProps } from 'utila/lib/object';

function ImageCarousel(props) {
  const [frameclick, setFrameclick] = useState(false);
	const handleFrameClick = () => {
		setFrameclick(!frameclick);
	};
  return (
    <section>
    <section className="framesGrid" onClick={handleFrameClick}>
      <div className="last"></div>
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
      <img className="framesImg" src={pic} alt="frame20" />
      <div className={props.numRows > 1 ? 'lastMany' : 'last'}></div>
    </section>
    {frameclick ? <FrameTools /> : null}
    </section>
  );
}

export default ImageCarousel;
