import React, { useState } from 'react'
import './styles.css'
import Navbar from '../navbar/Navbar';
import { useLocation } from 'react-router';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';


export default function BPGraph() {

    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [graph, setGraph] = useState(null)

    const location = useLocation();
    React.useEffect(() => {
        if (location.state) {
            var u = location.state.user
            var t = location.state.token
            setUser(u)
            setToken(t)
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
    }, [location]);


    return (
        <div>
            <div> <Navbar token={token} user={user} /> </div>
            <div className='avoid_header'>
                <div className='main_body'>
                    <div>
                        <p className='section_header'>Welcome, {user ? user.fname + ' ' + user.lname : ''}</p>
                    </div>
                    <hr />
                    <div>
                        <p className='section_lable'>
                            Blood Pressure Graphs
                        </p>
                    </div>
                    <div style={{ border: '1px solid #616773', padding: '5px', borderRadius: '15px', marginBottom: '10px' }}>
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
                                                max: graph.dystolic.reduce(function (a, b) {
                                                    return Math.max(a, b);
                                                }) + 10,
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
    )
}