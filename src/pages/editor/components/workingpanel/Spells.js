import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip'
import "./styles/Spells.css"
import original from '../../../../images/homebackground.jpg'
import backgroundAfter from '../../../../images/backgroundAfter.png'
import objectBefore from '../../../../images/objectBefore.png'
import objectAfter from '../../../../images/objectAfter.jpg'
import autoCap from '../../../../images/autocap.jpg'

function Spells() {
    const [demoImgSRC1, setDemoImgSRC1] = useState(objectBefore)
    const [demoImgSRC2, setDemoImgSRC2] = useState(objectAfter)
    const handleRemoveObjectHover = () => {
        setDemoImgSRC1(objectBefore)
        setDemoImgSRC2(objectAfter)
      };
    const handleRemoveBgHover = () => {
        setDemoImgSRC1(original)
        setDemoImgSRC2(backgroundAfter)
    };
    const autoCapHover = () => {
        setDemoImgSRC1(original)
        setDemoImgSRC2(autoCap)
    };
    return (
        <div className='SpellsPanel'>
            <div className='SpellsMenu'>
                <div className='SpellContainer'>
                    <Tooltip title="Drag and drop on movie to remove object" placement="top">
                        <div className="SpellBox" onMouseEnter={handleRemoveObjectHover}>
                            <i className="fa-solid fa-wand-magic-sparkles"></i>
                            <div className="toolTitle">Magic remove object</div>
                        </div>
                    </Tooltip>
                </div>
                <div className='SpellContainer'>
                    <Tooltip title="Drag and drop on movie to remove background" placement="top">
                        <div className="SpellBox" onMouseEnter={handleRemoveBgHover}>
                            <i className="fa-solid fa-wand-magic-sparkles"></i>
                            <div className="toolTitle">Magic remove background</div>
                        </div>
                    </Tooltip>
                </div>
                <div className='SpellContainer'>
                    <Tooltip title="Drag and drop on movie to create caption automatically" placement="top">
                        <div className="SpellBox" onMouseEnter={autoCapHover}>
                            <i className="fa-solid fa-wand-magic-sparkles"></i>
                            <div className="toolTitle">Magic caption</div>
                        </div>
                    </Tooltip>
                </div>
            </div>
            <div className='demoImgContainer'>
                <div className='dic'>
                    <div>Before</div>
                    <img className='demoImg' src={demoImgSRC1}></img>
                </div>
                <div className='dic'>
                    <div>After</div>
                    <img className='demoImg2' src={demoImgSRC2}></img>
                </div>
            </div>
        </div>
    )
}

export default Spells;