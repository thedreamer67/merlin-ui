import React, { useState } from 'react';
import '../styles/Wpnavbar.css'

function Wpnavbar(){
    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)
    return (
        <nav className='wpnavbar'>
            <ul className={click ? 'wpnav-menu active' : 'wpnav-menu'}>
                <li className='wpnav-item'>
                    <button className='wpbtn'>Library</button>
                </li>
                <li className='wpnav-item'>
                    <button className='wpbtn'>Auto Caption</button>
                </li>
            </ul>
        </nav>
    );
}

export default Wpnavbar;