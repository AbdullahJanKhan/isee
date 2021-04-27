import React, { useState } from 'react';
import './styles.css'
import noImg from '../../../asset/no_img.png';
import axios from 'axios';

export default function Home() {
    const [name, setName] = useState('Abdullah Jan Khan');
    const fileInput = React.createRef();
    const [scan, setScan] = useState(null)
    const updateName = () => setName('Abdullah Bin Tahir');
    const handleClick = event => {
        fileInput.current.click();
    };
    const handleChange = event => {
        event.preventDefault();
        const data = new FormData();
        data.append('file', fileInput.current.files[0]);
        axios.post('http://localhost:5000/users/upload', data, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        })
            .then((res) => {
                setScan(res.data)
            });
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
                            <img src={scan ? `http://localhost:5000/${scan.filename}` : noImg} alt='Eye Scan' className='scan' />
                            <br />
                            <p className='classify' onClick={handleClick}>
                                Upload Image
                        </p>
                            <input id='scan' type='file' ref={fileInput} accept="image/*" onChange={handleChange} />
                            <p className='classify'>Classify Disease</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}