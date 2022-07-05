import React, { useEffect } from 'react';
import ImageCarousel from './ImageCarousel';
import './styles/Timeline.css';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
import { groupProps } from 'utila/lib/object';

function Timeline(props) {
  const currentTime = new Date(props.currentTime * 1000)
    .toISOString()
    .substr(11, 8);
  const duration = new Date(props.duration * 1000).toISOString().substr(11, 8);

  const handleScroll = () => {
    const scrollBar = document.getElementById('timeline');
    const maxScrollLeft = scrollBar.scrollWidth - scrollBar.clientWidth;
    const scrollPercentage = scrollBar.scrollLeft / maxScrollLeft;

    props.getScrollPosition(scrollPercentage);
    console.log(
      `timeline: handleScroll: scrollPercentage = ${scrollPercentage}`
    );
  };

  // useEffect(() => {
  //   console.log('useEffect');

  //   function updateScrollBar() {
  //     const scrollBar = document.getElementById('timeline');
  //     const maxScrollLeft = scrollBar.scrollWidth - scrollBar.clientWidth;
  //     const newScrollPosition =
  //       (props.currentTime / props.duration) * maxScrollLeft;
  //     scrollBar.scrollTo(newScrollPosition, 0);
  //     console.log('update');
  //   }

  //   document
  //     .querySelector('#video-player')
  //     .addEventListener('playing', updateScrollBar);

  //   return () => {
  //     document
  //       .querySelector('#video-player')
  //       .removeEventListener('playing', updateScrollBar);
  //   };
  // });

  return (
    <>
      <div className='videoTime'>
        {currentTime}/{duration}
      </div>
      <ScrollSync>
        <div className='mainTimeline'>
          <ScrollSyncPane>
            <div
              id='timeline'
              style={{ overflow: 'auto', height: '100vh' }}
              onScroll={handleScroll}>
              <ImageCarousel />
              <ImageCarousel />
            </div>
          </ScrollSyncPane>
        </div>
      </ScrollSync>
    </>
  );
}

export default Timeline;
