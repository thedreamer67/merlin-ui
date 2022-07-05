import React from "react";
import ReactPlayer from "react-player";
import video from "../../assets/dargo_interview_cut.mp4";
import "./styles/VideoPlayer.css";

const VideoPlayer = () => {
  // const [isPlaying, setIsPlaying] = useState(true);
  // const [played, setPlayed] = useState(0);

  // const handlePlayPause = () => {};

  // const handleSeeking = () => {};

  // const handleFullscreen = () => {};

  // const toggleMute = () => {};

  return (
    <div
      style={{
        // margin: 'auto',
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div>
        <ReactPlayer
          className="react-player"
          width="100%"
          height="100%"
          controls={false}
          playing
          url={video}
        />
      </div>

      <section className="controls">
        <i class="fa-solid fa-play" />
      </section>
    </div>

    // <video controls className='react-player' width='100%' height='100%'>
    // 	<source src={video} type='video/mp4' />
    // </video>
  );
};

export default VideoPlayer;
