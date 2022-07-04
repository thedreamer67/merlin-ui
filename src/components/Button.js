import React from 'react';
import '../styles/Button.css'
import { Link } from 'react-router-dom'

export function Button() {
    return (
        <Link to='exit'>
            <button className='btn'>Exit</button>
        </Link>
    )
}