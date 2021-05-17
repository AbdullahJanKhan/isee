import React, { useState } from 'react'
import './styles.css'
import * as BsIcon from 'react-icons/bs'
import Navbar from '../navbar/Navbar';
import { useLocation } from 'react-router';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';


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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                            <div style={{ fontWeight: 'normal', fontSize: '90%' }}>
                                {record ?
                                    <Table record={record} />
                                    : <p></p>}
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div>
                        {record ? <Bar
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
                                            data: record.value
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
    var record = props.record
    console.log()
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ width: '15%', display: 'flex', flexDirection: 'row' }}>
                    <p>{record.value[0]}</p>
                    <p>{record.unit[0]}</p>
                </div>
                <div style={{ width: '15%' }}>
                    <p>{record.timeofday[0]}</p>
                </div>
                <div style={{ width: '35%' }}>
                    <p>{String(record.dateAdded[0]).slice(0, 10)}</p>
                </div>
                <div style={{ width: '15%' }}>
                    <p>Action</p>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ width: '15%', display: 'flex', flexDirection: 'row' }}>
                    <p>{record.value[0]}</p>
                    <p>{record.unit[0]}</p>
                </div>
                <div style={{ width: '15%' }}>
                    <p>{record.timeofday[0]}</p>
                </div>
                <div style={{ width: '35%' }}>
                    <p>{String(record.dateAdded[0]).slice(0, 10)}</p>
                </div>
                <div style={{ width: '15%' }}>
                    <p>Action</p>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ width: '15%', display: 'flex', flexDirection: 'row' }}>
                    <p>{record.value[0]}</p>
                    <p>{record.unit[0]}</p>
                </div>
                <div style={{ width: '15%' }}>
                    <p>{record.timeofday[0]}</p>
                </div>
                <div style={{ width: '35%' }}>
                    <p>{String(record.dateAdded[0]).slice(0, 10)}</p>
                </div>
                <div style={{ width: '15%' }}>
                    <p>Action</p>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ width: '15%', display: 'flex', flexDirection: 'row' }}>
                    <p>{record.value[0]}</p>
                    <p>{record.unit[0]}</p>
                </div>
                <div style={{ width: '15%' }}>
                    <p>{record.timeofday[0]}</p>
                </div>
                <div style={{ width: '35%' }}>
                    <p>{String(record.dateAdded[0]).slice(0, 10)}</p>
                </div>
                <div style={{ width: '15%' }}>
                    <p>Action</p>
                </div>
            </div>
        </div>
    )
}