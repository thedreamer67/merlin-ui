import React, { useState } from 'react';
import axios from 'axios';
import './styles/Library.css'

import pic from "../../static/000031.jpg"

function Library(){
    const [selectedFile, setSelectedFile] = useState(null)
      
    // On file select (from the pop up)
    const onFileChange = event => {
        // Update the state
        setSelectedFile(event.target.files[0])
    };
      
    // On file upload (click the upload button)
    const onFileUpload = () => {
        // Create an object of formData
        const formData = new FormData();
        // Update the formData object
        formData.append(
            "myFile",
            selectedFile,
            selectedFile.name
        );
        // Details of the uploaded file
        console.log(selectedFile);
        // Request made to the backend api
        // Send formData object 
        // add url to post to backend 
        axios.post("someurl", formData, { // receive two parameter endpoint url ,form data 
        })
        .then(res => { // then print response status
            console.log(res.statusText)
        })
    };
      
    // File content to be displayed after
    // file upload is complete
    const fileData = () => {
        if (selectedFile) {
            return (
            <div>
                <h2>File Details:</h2>
                <p>File Name: {selectedFile.name}</p>
                <p>File Type: {selectedFile.type}</p>
            </div>
            );
        } else {
            return (
            <div>
                <br />
                <h4>Choose before Pressing the Upload button</h4>
            </div>
            );
        }
    };

    // const getmedia = () => {
    //     //add url here to get from backend
    //     axios.get(`somemediaurl`)
    //     .then(res => {
    //         const users = res.data;
    //         this.setState({ users });
    //     })
    // } 

    return(
        <div className='libraryPanel'>
            <div className='libraryUpload'>
                <input type="file" onChange={onFileChange} />
                <button className='librarybtn' onClick={onFileUpload}>Upload media</button>
                {fileData()}
            </div>
            <div className='libraryGrid'>
                <div className='libraryPreview'>
                    <img className='libraryImg' alt='image1' src={pic} />
                    <div className='libraryTitle'>file title.mp4</div>
                </div>
                <div className='libraryPreview'>
                    <img className='libraryImg' alt='image2' src={pic} />
                    <div className='libraryTitle'>file title.mp4</div>
                </div>
                <div className='libraryPreview'>
                    <img className='libraryImg' alt='image3' src={pic} />
                    <div className='libraryTitle'>file title.mp4</div>
                </div>
                <div className='libraryPreview'>
                    <img className='libraryImg' alt='image4' src={pic} />
                    <div className='libraryTitle'>file title.mp4</div>
                </div>
                <div className='libraryPreview'>
                    <img className='libraryImg' alt='image5' src={pic} />
                    <div className='libraryTitle'>file title.mp4</div>
                </div>
                <div className='libraryPreview'>
                    <img className='libraryImg' alt='image6' src={pic} />
                    <div className='libraryTitle'>file title.mp4</div>
                </div>
                <div className='libraryPreview'>
                    <img className='libraryImg' alt='image7' src={pic} />
                    <div className='libraryTitle'>file title.mp4</div>
                </div>
                <div className='libraryPreview'>
                    <img className='libraryImg' alt='image8' src={pic} />
                    <div className='libraryTitle'>file title.mp4</div>
                </div>
                <div className='libraryPreview'>
                    <img className='libraryImg' alt='image9'src={pic} />
                    <div className='libraryTitle'>file title.mp4</div>
                </div>
                <div className='libraryPreview'>
                    <img className='libraryImg' alt='image10' src={pic} />
                    <div className='libraryTitle'>file title.mp4</div>
                </div>
                <div className='libraryPreview'>
                    <img className='libraryImg' alt='image11' src={pic} />
                    <div className='libraryTitle'>file title.mp4</div>
                </div>
                <div className='libraryPreview'>
                    <img className='libraryImg' alt='image12' src={pic} />
                    <div className='libraryTitle'>file title.mp4</div>
                </div>
                <div className='libraryPreview'>
                    <img className='libraryImg' alt='image13' src={pic} />
                    <div className='libraryTitle'>file title.mp4</div>
                </div>
            </div>       
        </div>
    );
}

export default Library;