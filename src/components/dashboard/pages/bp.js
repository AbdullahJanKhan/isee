import React, { useState } from 'react'
import './styles.css'
import * as FaIcon from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import Navbar from '../navbar/Navbar';
import { useLocation } from 'react-router';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

export default function BP() {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [systolic, setSystolic] = useState('')
    const [dystolic, setDystolic] = useState('')
    const [record, setRecord] = useState(null)
    const [check, setCheck] = useState(false)
    const [graph, setGraph] = useState(null)

    const location = useLocation();
    React.useEffect(() => {
        if (location.state) {
            var u = location.state.user
            var t = location.state.token
            setUser(u)
            setToken(t)
            axios.get('http://localhost:5000/chart/get_bp_record', {
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
            axios.get('http://localhost:5000/chart/bp_graph', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    'Authorization': `Bearer ${t}`
                }
            })
                .then(res => {
                    if (res.data.success) {
                        setGraph(res.data.record)
                        console.log(res.data)
                    }
                })

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [check]);

    const handleSubmit = () => {
        const data = {
            systolic: systolic,
            dystolic: dystolic,
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
                if (res.data.success) {
                    record.push(data)
                    setCheck(!check)
                }
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
                    <div style={{ width: 'max-content' }}>
                        <div className='row'>
                            <h3>Add New Records: </h3>
                            <FaIcon.FaHeartbeat className='icon' />
                        </div>
                        <hr />
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className='new_records'>
                                <div>
                                    <p hidden={true}>Record Saved</p>
                                </div>
                                <div>
                                    <div className='col'>
                                        <div className='form-group' style={{ padding: '2px' }}>
                                            <label htmlFor="dystolic" className="placeholder">Enter Diastolic Value</label>
                                            <input type='number' name='dystolic' value={dystolic} onChange={(e) => setDystolic(e.target.value)} placeholder='Dystolic' />
                                        </div>
                                        <div className='form-group' style={{ padding: '2px' }}>
                                            <label htmlFor="systolic" className="placeholder">Enter Systolic Value</label>
                                            <input type='number' name='systolic' value={systolic} onChange={(e) => setSystolic(e.target.value)} placeholder='Systolic' />
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
                            </div>
                        </div>
                    </div>

                    <div className='table_container'>
                        <div style={{ width: 'max-content' }}>
                            <h3>Latest Records: </h3>
                            <hr />
                        </div>
                        <hr />
                        <div style={{ fontWeight: 'normal', fontSize: '90%' }}>
                            {record ?
                                <div>
                                    {Object.keys(record).map((i) => <Row record={record[i]} key={record[i]._id} />)}
                                </div>
                                : <p></p>}
                        </div>
                    </div>
                    <hr />
                    <div>
                        {graph ?
                            <div>
                                <Bar
                                    data={
                                        {
                                            labels: graph.dates,
                                            datasets:
                                                [
                                                    {
                                                        label: 'Diastolic Blood Pressure',
                                                        backgroundColor: 'rgba(194,24,7,0.5)',
                                                        borderColor: 'rgba(194,24,7,1)',
                                                        borderWidth: 1,
                                                        data: graph.systolic
                                                    },
                                                    {
                                                        label: 'Systolic Blood Pressure',
                                                        backgroundColor: 'rgba(250,128,114,0.5)',
                                                        borderColor: 'rgba(250,128,114,1)',
                                                        borderWidth: 1,
                                                        data: graph.dystolic
                                                    },
                                                ]
                                        }
                                    }
                                    options={{

                                        legend: {
                                            display: true,
                                            position: 'center'
                                        },
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                                max: 300
                                            }
                                        }
                                    }}
                                />
                            </div>
                            : <p>Fetching Data</p>}

                    </div>
                </div>
            </div>
        </div>
    );
}

const Row = (props) => {
    const record = props.record
    return (
        <div className='table_row'>
            <p>{record.systolic}</p>
            <p>{record.unit}</p>
            <p>|</p>
            <p>{record.dystolic}</p>
            <p>{record.unit}</p>
            <p>|</p>
            <p>{new Date(record.dateAdded).toLocaleDateString()}</p>
            <p>|</p>
            <p>
                <AiIcons.AiOutlineDelete />
            </p>
        </div>
    )
}