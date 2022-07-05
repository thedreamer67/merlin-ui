import React from 'react';
import './styles/ImageCarousel.css'

import pic from "../../static/000031.jpg"

function ImageCarousel(){
    return (
        <section className='framesGrid'>
            <img className='framesImg' src={pic} />
            <img className='framesImg' src={pic} />
            <img className='framesImg' src={pic} />
            <img className='framesImg' src={pic} />
            <img className='framesImg' src={pic} />
            <img className='framesImg' src={pic} />
            <img className='framesImg' src={pic} />
            <img className='framesImg' src={pic} />
            <img className='framesImg' src={pic} />
            <img className='framesImg' src={pic} />
            <img className='framesImg' src={pic} />
            <img className='framesImg' src={pic} />
            <img className='framesImg' src={pic} />
            <img className='framesImg' src={pic} />
            <img className='framesImg' src={pic} />
            <img className='framesImg' src={pic} />
            <img className='framesImg' src={pic} />
            <img className='framesImg' src={pic} />
            <img className='framesImg' src={pic} />
            <img className='framesImg' src={pic} />
        </section>
        
    );
}

export default ImageCarousel;