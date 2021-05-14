import React, { useState } from 'react'
import './styles.css'
import * as RiIcon from 'react-icons/ri'
import * as BsIcon from 'react-icons/bs'
import Navbar from '../navbar/Navbar';
import { useLocation } from 'react-router';


export default function BG() {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)

    const location = useLocation();
    React.useEffect(() => {
        if (location.state) {
            setUser(location.state.user)
            setToken(location.state.token)
        }
    }, [location, user]);

    return (
        <div>
            <div> <Navbar token={token} user={user} /> </div>
            <div className='avoid_header'>
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
            </div>
        </div>
    );
}