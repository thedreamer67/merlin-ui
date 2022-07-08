import React, {useState} from 'react';
import MaskCanvas from './MaskCanvas';
import './styles/MagicAction.css'

function MagicAction(){
    const img = document.querySelector("img")
    img.onclick = (e) => {
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;
    console.log(x, y);
    }

    const [paintclick, setpaintclick] = useState(false);
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
                <div onClick={handlePaintClick} style={{backgroundColor: paintclick ? 'purple' : 'transparent'}}>
                    <div className="toolContainer">
                        <i className="fa-solid fa-paintbrush"></i>
                        <div className="toolTitle">Paint</div>
                    </div>
                </div>      
                <div onClick={handleEraserClick} style={{backgroundColor: eraserclick ? 'purple' : 'transparent'}}>
                    <div className="toolContainer">
                        <i className="fa-solid fa-eraser"></i>
                        <div className="toolTitle">Erase</div>
                    </div>
                </div>   
                <div onClick={handleTrashClick} style={{backgroundColor: trashclick ? 'purple' : 'transparent'}}>
                    <div className="toolContainer">
                        <i className="fa-solid fa-trash-can"></i>
                        <div className="toolTitle">Clear All</div>
                    </div>
                </div>  
                <div className="toolContainer">
                    <i className="fa-solid fa-magnifying-glass-plus"></i>
                    <div className="toolTitle">Zoom In</div>
                </div>  
                <div className="toolContainer">
                    <i className="fa-solid fa-magnifying-glass-minus"></i>
                    <div className="toolTitle">Zoom Out</div>
                </div>       
            </div>
            <div className='imageContainer'>
                <img className='maskCanvas' src="https://picsum.photos/200/300"></img>
            </div>
        </div>
    );
}

export default MagicAction;
