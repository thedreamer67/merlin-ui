import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/MagicAction.css';
import Tooltip from '@mui/material/Tooltip';
import pic from '../../../../static/000031.jpg';

function MagicAction(props) {
  const [paintclick, setpaintclick] = useState(false);
  const [frameToMask, setFrameToMask] = useState(null);

  const handlePaintClick = () => {
    setpaintclick(!paintclick);
    setEraserclick(false);
    setTrashclick(false);
  };

  const [eraserclick, setEraserclick] = useState(false);
  const handleEraserClick = () => {
    setEraserclick(!eraserclick);
    setpaintclick(false);
    setTrashclick(false);
  };

  const [trashclick, setTrashclick] = useState(false);
  const handleTrashClick = () => {
    setTrashclick(!trashclick);
    setpaintclick(false);
    setEraserclick(false);
  };

  return (
    <div className='magicActionContainer'>
      <div className='toolbox'>
        <div
          onClick={handlePaintClick}
          style={{ backgroundColor: paintclick ? 'purple' : 'transparent' }}>
          <Tooltip
            title='Use this to click on an object to select'
            placement='left-end'>
            <div className='toolContainer'>
              <i className='fa-solid fa-paintbrush'></i>
              <div className='toolTitle'>Paint</div>
            </div>
          </Tooltip>
        </div>
        <div
          onClick={handleEraserClick}
          style={{ backgroundColor: eraserclick ? 'purple' : 'transparent' }}>
          <Tooltip
            title='Use this to click on an object to unselect'
            placement='left-end'>
            <div className='toolContainer'>
              <i className='fa-solid fa-eraser'></i>
              <div className='toolTitle'>Erase</div>
            </div>
          </Tooltip>
        </div>
        <div
          onClick={handleTrashClick}
          style={{ backgroundColor: trashclick ? 'purple' : 'transparent' }}>
          <Tooltip
            title='Use this to unselect all objects'
            placement='left-end'>
            <div className='toolContainer'>
              <i className='fa-solid fa-trash-can'></i>
              <div className='toolTitle'>Clear All</div>
            </div>
          </Tooltip>
        </div>
        <div className='toolContainer'>
          <i className='fa-solid fa-magnifying-glass-plus'></i>
          <div className='toolTitle'>Zoom In</div>
        </div>
        <div className='toolContainer'>
          <i className='fa-solid fa-magnifying-glass-minus'></i>
          <div className='toolTitle'>Zoom Out</div>
        </div>
        <br />
        <Tooltip title='Click to confirm selection' placement='left-end'>
          <button className='button'>Done</button>
        </Tooltip>
      </div>
      <MaskImage
        paintclick={paintclick}
        eraserclick={eraserclick}
        frameToMask={frameToMask}
        mainTimeline={props.mainTimeline}
        frameNum={props.frameNum}
      />
    </div>
  );
}

function MaskImage(props) {
  const [newSRC, setNewSRC] = useState(null);
  const [videoDetails, setVideoDetails] = useState(null);
  const { paintclick, eraserclick } = props;
  const [imgclick, setimgclick] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const baseURL = 'http://127.0.0.1:8000';
  const projectURL = `${baseURL}/project`;
  const videoURL = `${baseURL}/video`;
  const timelineVideoURL = `${projectURL}/timelinevideo`;

  useEffect(() => {
    (async function getFrame() {
      const videoDetails = await axios
        .get(`${timelineVideoURL}/${props.mainTimeline}/details`)
        .then((res) => {
          console.log(res.data);
          return JSON.parse(res.data);
        })
        .catch((err) => console.log(err));
      setVideoDetails(videoDetails);
      setNewSRC(`${videoURL}/${videoDetails.video_id}/frame/${props.frameNum}`);
    })();
  }, []);

  const handleImgClick = (e) => {
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;

    const xActual = (x / e.target.clientWidth) * videoDetails.frame_size[0];
    const yActual = (y / e.target.clientHeight) * videoDetails.frame_size[1];

    if (paintclick) {
      console.log(`Positive clicked with coords = (${xActual},${yActual})`);
      console.log('Fetching mask...');
      (async function sendMaskCoords() {
        await axios
          .put(`${videoURL}/${videoDetails.video_id}/annotation?frame_num=0`, [
            [xActual, yActual, true],
          ])
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
        setNewSRC(`${videoURL}/${videoDetails.video_id}/annotation`);
      })();
    }
    if (eraserclick) {
      console.log(`Negative clicked with coords = (${xActual},${yActual})`);
      //TODO logic to implement for eraser click
    }
  };

  return (
    <div className='imageContainer'>
      {newSRC && (
        <img className='maskCanvas' onClick={handleImgClick} src={newSRC}></img>
      )}
    </div>
  );
}

export default MagicAction;
