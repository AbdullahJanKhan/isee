import React, { useState } from 'react'
import './styles.css'
import * as FaIcon from 'react-icons/fa'
import Navbar from '../navbar/Navbar';
import { useLocation } from 'react-router';
import axios from 'axios';
import { Line } from 'react-chartjs-2';


export default function BP() {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [systolic, setSystolic] = useState('')
    const [dystolic, setDystolic] = useState('')
    const [record, setRecord] = useState(null)

    const location = useLocation();
    React.useEffect(() => {
        if (location.state) {
            var u = location.state.user
            var t = location.state.token
            setUser(u)
            setToken(t)
            axios.get('http://localhost:5000/chart/get_bg_record', {
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
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

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
                        <div className='box container'>
                            <div className='dir_row'>
                                <p>Latest Records</p>
                            </div>
                            <hr />
                            <div style={{ fontWeight: 'normal', fontSize: '90%' }}>
                                {record ?
                                    <Table record={record} />
                                    : <p></p>}
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div>
                        {record ? <Line
                            data={{
                                labels: record.dateAdded,
                                datasets:
                                    [
                                        {
                                            label: 'Blood Sugar Random',
                                            backgroundColor: 'rgba(75,192,192,1)',
                                            borderColor: 'rgba(0,0,0,1)',
                                            borderWidth: 1,
                                            data: record.value
                                        },
                                        {
                                            label: 'Blood Sugar Fasting',
                                            backgroundColor: 'rgba(75,19,12,1)',
                                            borderColor: 'rgba(0,0,0,1)',
                                            borderWidth: 1,
                                            data: [10, 102, 56, 109, 200, 108]
                                        },
                                    ]
                            }}
                            options={{
                                title: {
                                    display: true,
                                    text: 'Average Rainfall per month',
                                    fontSize: 16
                                },
                                legend: {
                                    display: true,
                                    position: 'center'
                                }
                            }}
                        />
                            : <p>Graphs Would be Shown Here</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

const Table = (props) => {
    var record = props.record[props.record.length - 1]
    console.log(props.record)
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ width: '15%', display: 'flex', flexDirection: 'row' }}>
                    <p>{record.value}</p>
                    <p>{record.unit}</p>
                </div>
                <div style={{ width: '15%' }}>
                    <p>{record.isFasting ? 'Fasting' : 'Random'}</p>
                </div>
                <div style={{ width: '35%' }}>
                    <p>{new Date(record.dateAdded).toLocaleDateString()}</p>
                </div>
                <div style={{ width: '15%' }}>
                    <p>Action</p>
                </div>
            </div>
        </div>
    )
}