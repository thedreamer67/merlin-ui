import React, { useState } from "react";
import "./styles/AutoCaption.css";
import EditableLabel from "react-inline-editing";

function AutoCaption() {
  const [subtitles, setSubtitles] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in enim pellentesque, egestas dui ut, dapibus sapien. Curabitur ornare convallis diam. Cras id pellentesque nulla, eget eleifend lacus. Integer fringilla consectetur lectus in euismod. Etiam tristique neque diam, non venenatis risus ultricies a. Suspendisse ac nisi sit amet velit fringilla mollis in sed dolor. Vestibulum finibus ipsum vitae pretium auctor. Aenean gravida turpis ante, in pellentesque ex vestibulum eu. Nulla luctus purus in magna imperdiet sagittis. Aliquam porta nulla sed nulla dictum, eget aliquet orci vulputate. Pellentesque in erat ac arcu consequat rutrum nec ut tellus. Proin iaculis ex nec vestibulum rhoncus. Pellentesque augue nisi, laoreet maximus imperdiet eu, condimentum quis est. Donec facilisis commodo mauris. Maecenas eu elit turpis. Donec at massa ullamcorper, hendrerit tellus ultricies, pharetra lacus. Praesent blandit maximus tortor, at molestie tellus mattis in. Suspendisse non venenatis tortor. Donec accumsan consequat tortor in ullamcorper. Etiam porttitor quam vel auctor pulvinar. Donec elementum consequat magna vel dictum. Quisque commodo turpis ac eros suscipit, id volutpat velit tempus. Phasellus eu sodales ligula. Integer auctor id velit a finibus. Vivamus feugiat urna at auctor sollicitudin. Nunc sit amet mi ex. Morbi orci erat, facilisis in ornare porta, venenatis in justo. Sed interdum arcu a pretium sodales. Fusce ullamcorper vitae est vel fermentum. In vulputate turpis eu nunc rhoncus ultrices. Sed dapibus congue nunc, quis imperdiet diam pulvinar nec. Pellentesque eu nisi malesuada, fermentum quam a, dictum magna. Nullam ac consectetur erat. Mauris sit amet quam in velit interdum lobortis. Donec feugiat odio vitae dui mollis, et ultrices nisl consectetur. Nullam sollicitudin diam id justo dapibus blandit. Phasellus vel odio efficitur, tincidunt ipsum quis, sollicitudin augue. Etiam cursus dolor sed ex scelerisque lacinia. Maecenas at ultricies eros. Mauris nec enim a dui facilisis sagittis eget id enim. Phasellus varius venenatis lectus, et aliquam erat ultrices ut. Nam ipsum sem, gravida a orci quis, luctus vehicula purus. Cras molestie justo vitae convallis tempor. Sed fermentum lacus ut augue lobortis, eu maximus lectus suscipit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque ut lorem eu tellus fermentum fermentum. Maecenas dictum, mi sed vulputate volutpat, mi magna rutrum tortor, vitae ultrices nisl justo sed nunc. Aenean gravida lorem id ornare pretium. Integer vel lectus non eros aliquet finibus. Nulla lacinia ut velit vel suscipit. Pellentesque fermentum metus sit amet ultricies tempus. Sed mollis tellus dolor, in mattis lacus efficitur non. Nam ornare, nibh et ullamcorper tempor, nulla lectus gravida magna, nec mattis nisl ligula eleifend nisl. Vestibulum ac rutrum orci, nec porta nibh. In laoreet risus quis mollis convallis. Sed varius vehicula tristique. Curabitur ultrices velit felis, vel scelerisque enim laoreet nec. Integer malesuada arcu sit amet ligula tempus dictum. Proin ac feugiat odio.");
  const [generateSubtitlesClicked, setGenerateSubtitlesClicked] = useState(false)
  
  const handleGenerateSubtitles = () => {
    setGenerateSubtitlesClicked(!generateSubtitlesClicked)
  }

  return (
    <div>
        <button className={generateSubtitlesClicked ? "autocaptionbtn-selected" : "autocaptionbtn"} onClick={handleGenerateSubtitles}>
          Generate Caption
        </button>
        { generateSubtitlesClicked ?
        // <p className="subtitles"> 
        //   {subtitles}
        // </p> :
        // <EditableLabel 
        //   text={subtitles}
        //   inputWidth="50vw"
        //   inputHeight="48.6vh"
        //   /> :
        <div className ="subtitles">
          <div className="subtitlesrow">
            <p className="time">00:00:00</p>
            <EditableLabel text="Hello guys" labelClassName="subtitles" inputClassName="subtitle"/>
          </div>        
          <div className="subtitlesrow">
            <p className="time">00:00:00</p>
            <EditableLabel text="Hello guys" className="subtitle"/>
          </div>         
          <div className="subtitlesrow">
            <p className="time">00:00:00</p>
            <EditableLabel text="Hello guys" className="subtitle"/>
          </div>   
          <div className="subtitlesrow">
            <p className="time">00:00:00</p>
            <EditableLabel text="Hello guys" className="subtitle"/>
          </div>
          <div className="subtitlesrow">
            <p className="time">00:00:00</p>
            <EditableLabel text="Hello guys" className="subtitle"/>
          </div>
          <div className="subtitlesrow">
            <p className="time">00:00:00</p>
            <EditableLabel text="Hello guys" className="subtitle"/>
          </div>
          <div className="subtitlesrow">
            <p className="time">00:00:00</p>
            <EditableLabel text="Hello guys" className="subtitle"/>
          </div>
          <div className="subtitlesrow">
            <p className="time">00:00:00</p>
            <EditableLabel text="Hello guys" className="subtitle"/>
          </div>
          <div className="subtitlesrow">
            <p className="time">00:00:00</p>
            <EditableLabel text="Hello guys" className="subtitle"/>
          </div>
          <div className="subtitlesrow">
            <p className="time">00:00:00</p>
            <EditableLabel text="Hello guys" className="subtitle"/>
          </div>
          <div className="subtitlesrow">
            <p className="time">00:00:00</p>
            <EditableLabel text="Hello guys" className="subtitle"/>
          </div>
          <div className="subtitlesrow">
            <p className="time">00:00:00</p>
            <EditableLabel text="Hello guys" className="subtitle"/>
          </div>
          <div className="subtitlesrow">
            <p className="time">00:00:00</p>
            <EditableLabel text="Hello guys" className="subtitle"/>
          </div>
          <div className="subtitlesrow">
            <p className="time">00:00:00</p>
            <EditableLabel text="Hello guys" className="subtitle"/>
          </div>
          <div className="subtitlesrow">
            <p className="time">00:00:00</p>
            <EditableLabel text="Hello guys" className="subtitle"/>
          </div>
          <div className="subtitlesrow">
            <p className="time">00:00:00</p>
            <EditableLabel text="Hello guys" className="subtitle"/>
          </div>
          <div className="subtitlesrow">
            <p className="time">00:00:00</p>
            <EditableLabel text="Hello guys" className="subtitle"/>
          </div>
        </div> :
        <p></p>}
    </div>
  );
}

export default AutoCaption;
