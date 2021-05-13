import React from 'react'
import './styles.css'
import * as FaIcon from 'react-icons/fa'
import * as RiIcon from 'react-icons/ri'
import Navbar from '../navbar/Navbar';


export default function BP() {
    return (
        <div>
            <div><Navbar /></div>
            <div className='avoid_header'>
                <div className='main_body'>
                    <div className='container'>
                        <p >Manage Blood Glucose Levels</p>
                        <hr />
                    </div>
                    <div className='box container'>
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
                    <hr />
                    <div><p>Graphs Would be Shown Here</p></div>
                </div>
            </div>
        </div>
    );
}