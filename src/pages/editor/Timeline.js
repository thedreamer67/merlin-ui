import React from 'react';
import ImageCarousel from './ImageCarousel';
import './styles/Timeline.css'
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';

function Timeline() {
    return (
        <React.Fragment>
            <div className='videoTime'>00:00:00/00:10:30</div>
                <ScrollSync>
                    <div className='mainTimeline'>
                        <ScrollSyncPane>
                            <div style={{overflow: 'auto', height: '100vh'}}>
                            <ImageCarousel/>
                            <ImageCarousel/>
                            </div>
                        </ScrollSyncPane>
                    </div>
                </ScrollSync>
        </React.Fragment>
        
    );
}

export default Timeline;