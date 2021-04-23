import React, { useState } from 'react';
import './styles.css'
import * as FaIcon from 'react-icons/fa'
import * as BsIcon from 'react-icons/bs'
import * as RiIcon from 'react-icons/ri'

export default function Home() {
    const [name, setName] = useState('Abdullah Jan Khan')
    return (
        <div className='main_body'>
            <div className='container'>
                <p>Welcome, {name}!</p>
                <hr />
            </div>
            <div className='container'>
                <p>DR CLASSIFIER</p>
                <div className='box dir_row'>
                    <p>CLASSIFY DISEASE</p>
                    <FaIcon.FaArrowAltCircleRight className='icon' />
                </div>
                <hr />
            </div>
            <div className='container'>
                <p>CHART MANAGEMENT</p>
                <div className='dir_row'>
                    <div className='box'>
                        <div className='dir_row'>
                            <p>BLOOD GLUCOSE</p>
                            <BsIcon.BsDroplet className='icon' />
                        </div>
                        <hr />
                        <div className='dir_col aling_text'>
                            <p> <strong>Average Value:</strong> 145 units</p>
                            <div className='dir_row'>
                                <p><strong>Add New Record: </strong></p>
                                <RiIcon.RiMapPinAddLine className='icon' />
                            </div>
                        </div>
                    </div>
                    <div className='box'>
                        <div className='dir_row'>
                            <p>BLOOD PRESSURE</p>
                            <FaIcon.FaHeartbeat className='icon' />
                        </div>
                        <hr />
                        <div className='dir_col aling_text'>
                            <p> <strong>Average Value:</strong> 145 units</p>
                            <div className='dir_row'>
                                <p><strong>Add New Record: </strong></p>
                                <RiIcon.RiMapPinAddLine className='icon' />
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
            <div className='container'>
                <p>CHART MANAGEMENT</p>
                <div className='dir_row'>
                    <div className='box'>
                        <div className='dir_row'>
                            <p>BLOOD GLUCOSE</p>
                            <BsIcon.BsDroplet className='icon' />
                        </div>
                        <hr />
                        <div className='dir_col aling_text'>
                            <p> <strong>Average Value:</strong> 145 units</p>
                            <div className='dir_row'>
                                <p><strong>Add New Record: </strong></p>
                                <RiIcon.RiMapPinAddLine className='icon' />
                            </div>
                        </div>
                    </div>
                    <div className='box'>
                        <div className='dir_row'>
                            <p>BLOOD GLUCOSE</p>
                            <BsIcon.BsDroplet className='icon' />
                        </div>
                        <hr />
                        <div className='dir_col aling_text'>
                            <p> <strong>Average Value:</strong> 145 units</p>
                            <div className='dir_row'>
                                <p><strong>Add New Record: </strong></p>
                                <RiIcon.RiMapPinAddLine className='icon' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}