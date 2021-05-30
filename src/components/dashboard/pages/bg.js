import React, { useState } from 'react'
import './styles.css'
import * as BsIcon from 'react-icons/bs'
import * as AiIcons from 'react-icons/ai'
import Navbar from '../navbar/Navbar';
import { useLocation } from 'react-router';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

export default function BG() {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [sugar, setSugar] = useState('')
    const [unit, setUnit] = useState('mg/dL')
    const [time, setTime] = useState(true)
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
            axios.get('http://localhost:5000/chart/bg_graph', {
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
            unit: unit,
            value: sugar,
            isFasting: time,
            patient: user._id,
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
                        <p >Manage Blood Glucose Levels</p>
                        <hr />
                    </div>
                    <div style={{ width: 'max-content' }}>
                        <div className='row'>
                            <h3>Add New Records: </h3>
                            <BsIcon.BsDroplet className='icon' />
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
                                            <input type='radio' name='time' value={true} onChange={() => setTime(true)} />Fasting
                                            </div>
                                        <div className='dir_row' style={{ alignItems: 'center' }}>
                                            <input type='radio' name='time' value={false} onChange={() => setTime(false)} />Random
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
                                            labels: graph.fdates,
                                            datasets:
                                                [
                                                    {
                                                        label: 'Blood Sugar Fasting',
                                                        backgroundColor: 'rgba(75,192,192,1)',
                                                        borderColor: 'rgba(0,0,0,1)',
                                                        borderWidth: 1,
                                                        data: graph.fasting
                                                    },
                                                ]
                                        }
                                    }
                                    options={{
                                        title: {
                                            display: true,
                                            text: 'Average Rainfall per month',
                                            fontSize: 16
                                        },
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
                                <Bar
                                    data={
                                        {
                                            labels: graph.rdates,
                                            datasets:
                                                [
                                                    {
                                                        label: 'Blood Sugar Random',
                                                        backgroundColor: 'rgba(75,192,192,1)',
                                                        borderColor: 'rgba(0,0,0,1)',
                                                        borderWidth: 1,
                                                        data: graph.random
                                                    },
                                                ]
                                        }
                                    }
                                    options={{
                                        title: {
                                            display: true,
                                            text: 'Average Rainfall per month',
                                            fontSize: 16
                                        },
                                        legend: {
                                            display: true,
                                            position: 'right'
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
            <p>{record.value}</p>
            <p>{record.unit}</p>
            <p>|</p>
            <p>{record.isFasting ? 'Fasting' : 'Random'}</p>
            <p>|</p>
            <p>{new Date(record.dateAdded).toLocaleDateString()}</p>
            <p>|</p>
            <p>
                <AiIcons.AiOutlineDelete />
            </p>
        </div>
    )
}