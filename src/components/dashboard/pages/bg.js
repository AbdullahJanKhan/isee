import React from 'react'
import './styles.css'
// import * as FaIcon from 'react-icons/fa'
import * as RiIcon from 'react-icons/ri'
import * as BsIcon from 'react-icons/bs'


export default function BG() {
    return (
        <div className='main_body'>
            <div className='container'>
                <p >Manage Blood Glucose Levels</p>
                <hr />
            </div>
            <div className='box container'>
                <div className='dir_row'>
                    <p>BLOOD GLOCUSE</p>
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
            <hr />
            <div><p>Graphs Would be Shown Here</p></div>
        </div>
    );
}