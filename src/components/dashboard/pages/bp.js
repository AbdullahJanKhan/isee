import React, { useState } from 'react'
import './styles.css'
import * as FaIcon from 'react-icons/fa'
import Navbar from '../navbar/Navbar';
import { useLocation } from 'react-router';
import axios from 'axios';


export default function BP() {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [systolic, setSystolic] = useState('')
    const [dystolic, setDystolic] = useState('')

    const location = useLocation();
    React.useEffect(() => {
        if (location.state) {
            setUser(location.state.user)
            setToken(location.state.token)
        }
    }, [location, user]);

    const handleSubmit = () => {
        const data = {
            systolic: [systolic],
            dystolic: [dystolic],
            patient: user._id
        }
        axios.post('http://localhost:5000/chart/add_bp_record', data,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res)
            })
    }

    return (
        <div>
            <div> <Navbar token={token} user={user} /> </div>
            <div className='avoid_header'>
                <div className='main_body'>
                    <div className='container'>
                        <p >Manage Blood Pressure Levels</p>
                        <hr />
                    </div>
                    <div className='box container'>
                        <div className='dir_row'>
                            <p>Add New Record</p>
                            <FaIcon.FaHeartbeat className='icon' />
                        </div>
                        <hr />
                        <div className='dir_col'>
                            <div className='form-group' style={{ padding: '2px' }}>
                                <label htmlFor="systolic" className="placeholder">Enter Systolic Value</label>
                                <input type='number' name='systolic' value={systolic} onChange={(e) => setSystolic(e.target.value)} placeholder='Systolic' />
                            </div>
                            <div className='form-group' style={{ padding: '2px' }}>
                                <label htmlFor="dystolic" className="placeholder">Enter Dystolic Value</label>
                                <input type='number' name='dystolic' value={dystolic} onChange={(e) => setDystolic(e.target.value)} placeholder='Dystolic' />
                            </div>
                            <p className='classify'
                                style={{
                                    margin: 'auto',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    marginBottom: '10px'
                                }}
                                onClick={handleSubmit} >Submit</p>

                        </div>
                    </div>
                    <hr />
                    <div><p>Graphs Would be Shown Here</p></div>
                </div>
            </div>
        </div>
    );
}