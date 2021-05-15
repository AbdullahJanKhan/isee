import React, { useState } from 'react'
import './styles.css'
import * as BsIcon from 'react-icons/bs'
import * as AiIcons from 'react-icons/ai'
import Navbar from '../navbar/Navbar';
import { useLocation } from 'react-router';
import axios from 'axios';


export default function BG() {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [sugar, setSugar] = useState('')
    const [unit, setUnit] = useState('mg/dL')
    const [time, setTime] = useState('')
    const [record, setRecord] = useState(null)

    const location = useLocation();
    React.useEffect(() => {
        if (location.state) {
            setUser(location.state.user)
            setToken(location.state.token)
            getRec(location.state.token, location.state.user._id)
        }
    }, [location, user]);

    const getRec = (t, id) => {
        axios.get('http://localhost:5000/chart/get_bg_record', {
            patient: id
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Authorization': `Bearer ${t}`
            }
        })
            .then(res => {
                if (res.data.success) {
                    setRecord(res.data.record)
                }
            })
    }

    const handleSubmit = () => {
        const data = {
            unit: unit,
            value: sugar,
            timeofday: time,
            patient: user._id
        }

        axios.post('http://localhost:5000/chart/add_bg_record', data,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                if (res.data.success) {
                    setRecord(res.data.record)
                }
            })
    }

    return (
        <div>
            <div> <Navbar token={token} user={user} /> </div>
            <div className='avoid_header'>
                <div className='main_body'>
                    <div className='container'>
                        <p >Manage Blood Glucose Levels</p>
                        <hr />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div className='box container'>
                            <div className='dir_row'>
                                <p>Add New Record</p>
                                <BsIcon.BsDroplet className='icon' />
                            </div>
                            <hr />
                            <div>
                                <div className='dir_row'>
                                    <div className='form-group' style={{ padding: '2px' }}>
                                        <input type='number' value={sugar} onChange={(e) => setSugar(e.target.value)} placeholder='Sugar Value' name='reading' />
                                    </div>
                                    <div className='form-group' style={{ padding: '2px' }}>
                                        <select name='unit' onChange={(e) => setUnit(e.target.value)}>
                                            <option value="mg/dL">mg/dL</option>
                                            <option value="mmol/L">mmol/L</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='form-group dir_row' style={{ padding: '2px', margin: 'auto' }}>
                                    <div className='dir_row' style={{ alignItems: 'center' }}>
                                        <input type='radio' name='time' value='Fasting' onChange={(e) => setTime(e.target.value)} />Fasting
                                    </div>
                                    <div className='dir_row' style={{ alignItems: 'center' }}>
                                        <input type='radio' name='time' value='Random' onChange={(e) => setTime(e.target.value)} />Random
                                    </div>
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
                        <div className='box container'>
                            <div className='dir_row'>
                                <p>Latest Records</p>
                            </div>
                            <hr />
                            <div className='dir_col'>
                                {record ? <TableR value={record.value[0]} unit={record.unit[0]} takenAt={record.dateAdded[0]} timeofDay={record.dateAdded[0]}/> : <p></p>}
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

const TableR = (props) => {
    return (
        <div className='dir_row' style={{ justifyContent: 'space-evenly', width: '100%', padding: '5px' }}>
            <div style={{ width: '15%', textAlign: 'center' }}>{props.value}</div>
            <div style={{ width: '15%', textAlign: 'center' }}>{props.unit}</div>
            <div style={{ width: '15%', textAlign: 'center' }}>{props.takenAt}</div>
            <div style={{ width: '15%', textAlign: 'center' }}>{props.timeofDay}</div>
            <div style={{ width: '15%', textAlign: 'center' }}>
                <AiIcons.AiOutlineDelete />
            </div>
        </div>
    )
}