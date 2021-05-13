import React from 'react';
import Navbar from '../navbar/Navbar';

export default function Doctor() {
    return (
        <div>
            <div> <Navbar /> </div>
            <div className='avoid_header'>
                <h2>Search Doctor</h2>
            </div>
        </div>
    );
}