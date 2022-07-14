import React, { useEffect, useState } from 'react';
import './styles/ImageCarousel.css';
import pic from '../../../../static/000031.jpg';
import FrameTools from './FrameTools';
import { groupProps } from 'utila/lib/object';

function ImageCarousel(props) {
  const { handleMagicActionClick, isMagicActionActive } = props;
  const [frameclick, setFrameclick] = useState(false);
  const [isBackgroundActive, setIsBackgroundActive] = useState(false);
  const handleFrameClick = () => {
    setFrameclick(!frameclick);
  };

  const handleIsBackgroundActive = () => {
    setIsBackgroundActive(!isBackgroundActive)
  };

  useEffect(()=>{
    if (frameclick){
      setIsBackgroundActive(true)
    }
  })

  return (
    <section>
      {/* <div style={{backgroundColor: frameclick ? 'purple' : 'transparent'}}> */}
      <div>
      <div className='layer' hidden={!isBackgroundActive}></div>
        <section className='framesGrid' onClick={handleFrameClick} onMouseEnter={handleIsBackgroundActive} onMouseLeave={handleIsBackgroundActive}>
          <div className='last'></div>
              <img className='framesImg' src={pic} alt='frame1' />
              <img className='framesImg' src={pic} alt='frame2' />
              <img className='framesImg' src={pic} alt='frame3' />
              <img className='framesImg' src={pic} alt='frame4' />
              <img className='framesImg' src={pic} alt='frame5' />
              <img className='framesImg' src={pic} alt='frame6' />
              <img className='framesImg' src={pic} alt='frame7' />
              <img className='framesImg' src={pic} alt='frame8' />
              <img className='framesImg' src={pic} alt='frame9' />
              <img className='framesImg' src={pic} alt='frame10' />
              <img className='framesImg' src={pic} alt='frame11' />
              <img className='framesImg' src={pic} alt='frame12' />
              <img className='framesImg' src={pic} alt='frame13' />
              <img className='framesImg' src={pic} alt='frame14' />
              <img className='framesImg' src={pic} alt='frame15' />
              <img className='framesImg' src={pic} alt='frame16' />
              <img className='framesImg' src={pic} alt='frame17' />
              <img className='framesImg' src={pic} alt='frame18' />
              <img className='framesImg' src={pic} alt='frame19' />
              <img className='framesImg' src={pic} alt='frame20' />
          <div
            style={(function () {
              const timeline = document.getElementById('timeline');
              const scrollBarWidth = timeline.offsetWidth - timeline.clientWidth;
              let lastWidth =
                ((timeline.offsetWidth / 2 - scrollBarWidth) /
                  timeline.offsetWidth) *
                100;
              return { minWidth: lastWidth + 'vw' };
            })()}></div>
        </section>
        <Audio/>
      </div>
      {frameclick ? (
        <FrameTools
          handleMagicActionClick={handleMagicActionClick}
          isMagicActionActive={isMagicActionActive}
          // setIsMagicActionActive={setIsMagicActionActive}
        />
      ) : null}
    </section>
  );
}

function Audio(){
  return(
      <section className='AudioContainer'>
      <div className='first-padding'></div>
        <div 
          style={(function () {
            const timeline = document.getElementById('timeline');
            const scrollBarWidth = timeline.offsetWidth - timeline.clientWidth;
            let lastWidth =
              ((timeline.offsetWidth / 2 - scrollBarWidth) /
                timeline.offsetWidth) *
              100;
            let width = timeline.scrollWidth - (timeline.clientWidth/2) - (timeline.offsetWidth/2 - scrollBarWidth)
            {console.log(timeline.scrollWidth)}
            return { minWidth: width + 'px', backgroundImage: 'radial-gradient(ellipse at center, #EEFF7F, #11A011', fontSize:'13px'};
          })()}>
          Audio.mp4
        </div>  
      <div
        style={(function () {
          const timeline = document.getElementById('timeline');
          const scrollBarWidth = timeline.offsetWidth - timeline.clientWidth;
          let lastWidth =
            ((timeline.offsetWidth / 2 - scrollBarWidth) /
              timeline.offsetWidth) *
            100;
          return { minWidth: lastWidth + 'vw' };
        })()}></div>
    </section>
  )
}

export default ImageCarousel;
