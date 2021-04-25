import React, { useState } from 'react';
import './styles.css'
import noImg from '../../../asset/no_img.png';


export default function Home() {
    const [name, setName] = useState('Abdullah Jan Khan');
    const fileInput = React.createRef();
    const [scan, setScan] = useState(null)
    const updateName = () => setName('Abdullah Bin Tahir');
    const handleClick = event => {
        // event.preventDefault();
        fileInput.current.click();
    };
    const handleChange = event => {
        event.preventDefault();
        console.log(fileInput.current.files[0])
        console.log(URL.createObjectURL(fileInput.current.files[0]))
        setScan(URL.createObjectURL(fileInput.current.files[0]))
    }

    return (
        <div className='avoid_header'>
            <div className='main_body'>
                <div className='container' onClick={updateName}>
                    <p>Welcome, {name}!</p>
                    <hr />
                </div>
                <div className='container'>
                    <div className='imageUpload'>
                        <p>DR CLASSIFIER</p>
                        <form className='form_img'>
                            <img src={scan ? scan : noImg} alt='Eye Scan' className='scan' />
                            <br />
                            <p className='classify' onClick={handleClick}>
                                Upload Image
                        </p>
                            <input id='scan' type='file' ref={fileInput} onChange={handleChange} />
                            <p className='classify'>Classify Disease</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}