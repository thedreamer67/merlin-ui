import React from "react";
import ReactWaves from "@dschoon/react-waves";
import "./styles/AudioWaves.css";

function AudioWaves(props) {
  const { audio } = props;

  return (
    <div className="wave">
      {/* <div className="last"></div> */}
      <ReactWaves
        audioFile={audio}
        className={"audiowaves"}
        options={{
          barHeight: 2,
          cursorWidth: 0,
          height: 200,
          hideScrollbar: true,
          progressColor: "#D1D6DA",
          responsive: true,
          waveColor: "#D1D6DA",
        }}
        playing={false}
      />
      {/* <div
        style={(function () {
          const timeline = document.getElementById("timeline");
          const scrollBarWidth = timeline.offsetWidth - timeline.clientWidth;
          let lastWidth =
            ((timeline.offsetWidth / 2 - scrollBarWidth) /
              timeline.offsetWidth) *
            100;
          return { minWidth: lastWidth + "vw" };
        })()}
      ></div> */}
    </div>
  );
}

export default AudioWaves;
