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
                            Blood Glucose Graphs
                        </p>
                    </div>
                    <div style={{ border: '1px solid #616773', padding: '5px', borderRadius: '15px', marginBottom: '10px' }}>
                        <div>
                            <p className='section_lable'>Fasting Glucose Levels:</p>
                        </div>
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
                                                max: graph.fasting.reduce(function (a, b) {
                                                    return Math.max(a, b);
                                                }) + 10,
                                            }
                                        }
                                    }}
                                />
                            </div>
                            : <p>Fetching Data</p>}
                    </div>
                    <div style={{ border: '1px solid #616773', padding: '5px', borderRadius: '15px', marginBottom: '10px' }}>
                        <div>
                            <p className='section_lable'>Random Glucose Levels: </p>
                        </div>
                        {graph ?
                            <div>
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
                                                max: graph.random.reduce(function (a, b) {
                                                    return Math.max(a, b);
                                                }) + 10,
                                            }
                                        }
                                    }}
                                />
                            </div>
                            :
                            <p>Fecthing Data</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}