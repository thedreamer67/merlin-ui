import React, { useCallback, useState } from "react";
import ImageCarousel from "./ImageCarousel";
import "./styles/Timeline.css";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
import { useDropzone } from "react-dropzone";
import DropzonePrompt from "./DropzonePrompt";

function Timeline({ open }) {

  const onDrop = useCallback((acceptedFiles) => {
    console.log("acceptedFiles: " + acceptedFiles);
    setTimelineFiles(prevArray => [...prevArray, ...acceptedFiles])
    console.log("timelineFiles: " + timelineFiles)
  }, []);

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
  });

  const [timelineFiles, setTimelineFiles] = useState([])

  return (
    <React.Fragment>
      <div className="videoTime">00:00:00/00:10:30</div>
      <ScrollSync>
        <div className="mainTimeline">
          <div
            {...getRootProps({
              className: "dropzone",
              onClick: (e) => e.stopPropagation(),
              // noClick: true,
            })}
          >
            <input classname="input-zone" {...getInputProps()} />
             <ScrollSyncPane>
              <div className="scrollDemo" style={{ overflow: "auto", maxHeight: "30vh" }}>
                {timelineFiles.length != 0 ? 
                  timelineFiles.map((file) => <ImageCarousel/>) :
                  <DropzonePrompt/>} 
              </div>
             </ScrollSyncPane>
          </div>
        </div>
      </ScrollSync>
    </React.Fragment>
  );
}

export default Timeline;
