import React from 'react';
import ImageCarousel from './ImageCarousel';
import './styles/Timeline.css';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
import { groupProps } from 'utila/lib/object';

function Timeline(props) {
  let currentTime = new Date(props.currentTime * 1000)
    .toISOString()
    .substr(11, 8);
  let duration = new Date(props.duration * 1000).toISOString().substr(11, 8);

  const handleScroll = () => {
    const scrollBar = document.getElementById('timeline');
    const maxScrollLeft = scrollBar.scrollWidth - scrollBar.clientWidth;
    const scrollPercentage = scrollBar.scrollLeft / maxScrollLeft;

    props.getScrollPosition(scrollPercentage);
    console.log(
      `timeline: handleScroll: scrollPercentage = ${scrollPercentage}`
    );
    // console.log(`scrollLeft: ${scrollBar.scrollLeft}`);
    // console.log(`scrollWidth: ${maxScrollLeft}`);
    // console.log(`scroll position %: ${scrollPercentage}`);
  };

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

export default Timeline;
