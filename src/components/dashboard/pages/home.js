import React, { useState } from 'react';
import './styles.css'
import * as FaIcon from 'react-icons/fa'
import noImg from '../../../asset/no_img.png';

export default function Home() {
    const [name, setName] = useState('Abdullah Jan Khan')
    const updateName = () => setName('Abdullah Bin Tahir')

    return (
        <div className='main_body'>
            <div className='container' onClick={updateName}>
                <p>Welcome, {name}!</p>
                <hr />
            </div>
            <div className='container'>
                <p>DR CLASSIFIER</p>
                <div className='dir_row'>
                    <div className='image_upload dir_col'>
                        <p>| Right Eye</p>
                        <img src={noImg} className='scan' alt='Right Eye Scan' />
                        <br />
                        <input type='file' style={{ width: '100%' }} />
                    </div>
                    <div className='image_upload dir_col'>
                        <p>| Left Eye</p>
                        <img src={noImg} className='scan' alt='Left Eye Scan' />
                        <br />
                        <input type='file' style={{ width: '100%' }} />
                    </div>
                </div>
                <div className='classify dir_row'>
                    <p>CLASSIFY DISEASE</p>
                    <FaIcon.FaArrowAltCircleRight className='icon' />
                </div>
                <hr />
            </div>
        </div>
    );
}