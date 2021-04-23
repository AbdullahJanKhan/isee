import React from 'react'
import './styles.css'
import * as FaIcon from 'react-icons/fa'
import * as RiIcon from 'react-icons/ri'


export default function BP() {
    return (
        <div className='main_body'>
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
            <hr />
            <div><p>Graphs Would be Shown Here</p></div>
        </div>
    );
}