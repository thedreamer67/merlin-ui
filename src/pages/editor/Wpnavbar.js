import React, { useState } from 'react';
import './styles/Wpnavbar.css'
import Library from './Library'
import AutoCaption from './AutoCaption'
import { Link } from 'react-router-dom'

function Wpnavbar(){
    const [click, setClick] = useState(false)
    const [libraryclick, setlibraryclick] = useState(false)
    const [captionclick, setcaptionclick] = useState(false)
    const handleLibraryClick = () => {setlibraryclick(!libraryclick); setcaptionclick(false)}
    const handleCaptionClick = () => {setcaptionclick(!captionclick); setlibraryclick(false)}

    return (
        <React.Fragment>
        <nav className='wpnavbar'>
            <ul className={click ? 'wpnav-menu active' : 'wpnav-menu'}>
                <li className='wpnav-item'>
                    <Link to='/library'>
                        <button className='wpbtn' onClick={handleLibraryClick}>Library</button>
                    </Link>
                </li>
                <li className='wpnav-item'>
                    <button className='wpbtn' onClick={handleCaptionClick}>Auto Caption</button>
                </li>
            </ul>
        </nav>
        { libraryclick ? <Library /> : null }
        { captionclick ? <AutoCaption /> : null }
        </React.Fragment>
    );
}

export default Wpnavbar;