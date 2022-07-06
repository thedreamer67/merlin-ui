import React, { useCallback } from "react";
import ImageCarousel from "./ImageCarousel";
import "./styles/Timeline.css";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
import { useDropzone } from "react-dropzone";

function Timeline({ open }) {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
  });

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
              <div style={{ overflow: "auto" }}>
                <ImageCarousel />
                <ImageCarousel />
              </div>
            </ScrollSyncPane>
          </div>
        </div>
      </ScrollSync>
    </React.Fragment>
  );
}

export default Timeline;
