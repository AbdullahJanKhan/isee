import React from 'react';
import Navbar from '../navbar/Navbar';

export default function Chat() {
    return (
        <div>
            <div> <Navbar /> </div>
            <div className='avoid_header'>
                <h2>Chat</h2>
            </div>
        </div>
    );
}