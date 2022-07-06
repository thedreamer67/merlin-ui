import React, {useEffect} from "react";
import ImageCarousel from "./ImageCarousel";
import "./styles/Timeline.css";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";


function Timeline() {

    useEffect(() => {
        const scrollDemo = document.querySelector("#scrollDemo");
        console.log(scrollDemo)
       
        scrollDemo.addEventListener("scroll", event => {
           console.log(scrollDemo.scrollLeft);
        }, { passive: true });
    }, []);


  return (
    <React.Fragment>
      <div className="videoTime">00:00:00/00:10:30</div>
      <ScrollSync>
        <div className="mainTimeline">
          <div className="Line"></div>
          <ScrollSyncPane>
            <div id="scrollDemo" style={{ overflow: "auto" }} className='scrollDemo'>
              <ImageCarousel />
              <ImageCarousel />
              <ImageCarousel />
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
