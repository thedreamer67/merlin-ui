import React, { useCallback, useState } from 'react';
import ImageCarousel from './ImageCarousel';
import './styles/Timeline.css';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
import { useDropzone } from 'react-dropzone';
import DropzonePrompt from './DropzonePrompt';

function Timeline(props) {
  const {
    isMagicActionActive,
    handleMagicActionClick,
    setIsMagicActionActive,
  } = props;
  const onDrop = useCallback((acceptedFiles) => {
    console.log('acceptedFiles: ' + acceptedFiles);
    setTimelineFiles((prevArray) => [...prevArray, ...acceptedFiles]);
    console.log('timelineFiles: ' + timelineFiles);
  }, []);

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
  });

  const [timelineFiles, setTimelineFiles] = useState([]);

  const currentTime = new Date(props.currentTime * 1000)
    .toISOString()
    .substr(11, 8);
  const duration = new Date(props.duration * 1000).toISOString().substr(11, 8);

  const handleScroll = () => {
    const scrollBar = document.getElementById('timeline');
    const maxScrollLeft = scrollBar.scrollWidth - scrollBar.clientWidth;
    const scrollPercentage = scrollBar.scrollLeft / maxScrollLeft;

    props.getScrollPosition(scrollPercentage);
    // console.log(
    // 	`timeline: handleScroll: scrollPercentage = ${scrollPercentage}`
    // );
  };

  const handleMouseDown = (e) => {
    const scrollBar = document.getElementById('timeline');
    const maxY =
      scrollBar.getBoundingClientRect()['top'] + scrollBar.clientHeight;
    if (e.clientY > maxY) {
      props.getSeeking(true);
      // console.log(`mouseDown ${e.clientY}`);
    }
  };

  const handleMouseUp = () => {
    props.getSeeking(false);
    // console.log(`mouseUp`);
  };

  // const handleDragEnd = () => {
  // 	props.getSeeking(false);
  // 	// console.log(`dragend`);
  // };

  // const coords = (e) => {
  // 	console.log(e.clientY);
  // };

  // const [frameclick, setFrameclick] = useState(true);
  // const handleFrameClick = () => {
  // 	setFrameclick(!frameclick);
  // };

  return (
    <>
      <div className='videoTime'>
        {currentTime}/{duration}
      </div>
      <ScrollSync>
        <div className='mainTimeline'>
          <div
            className={
              timelineFiles.length !== 0 ? 'LineScroll' : 'Line'
            }></div>
          <div
            id='timelineDropZone'
            {...getRootProps({
              className: 'dropzone',
              onClick: (e) => e.stopPropagation(),
            })}
            style={{ height: '100%' }}>
            <input
              id='timelineDropzone'
              classname='input-zone'
              {...getInputProps()}
            />
            <ScrollSyncPane>
              <div
                id='timeline'
                className='timeline'
                onScroll={handleScroll}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                // onDragEnd={handleDragEnd}
                // onClick={coords}
              >
                {timelineFiles.length !== 0 ? (
                  timelineFiles.map((file) => (
                    <ImageCarousel
                      handleMagicActionClick={handleMagicActionClick}
                      isMagicActionActive={isMagicActionActive}
                      setIsMagicActionActive={setIsMagicActionActive}
                    />
                  ))
                ) : (
                  <DropzonePrompt />
                )}
              </div>
            </ScrollSyncPane>
          </div>
        </div>
      </ScrollSync>
    </>
  );
}

export default Timeline;
