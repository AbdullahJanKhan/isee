import React, { useState } from 'react'
import './styles.css'
import DocNav from '../navbar/DocNav'
import { useLocation, useParams } from 'react-router'
import axios from 'axios'
import { Bar } from 'react-chartjs-2';

export default function Details() {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [details, setDetails] = useState(null)
    const { id } = useParams();
    const [bgGraph, setbgGraph] = useState(null)
    const [bpGraph, setbpGraph] = useState(null)

    const location = useLocation();
    React.useEffect(() => {
        if (location.state) {
            const t = location.state.token
            setUser(location.state.user)
            setToken(t)
            axios.get('http://localhost:5000/users/get_user/' + id, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    'Authorization': `Bearer ${t}`
                }
            })
                .then(res => {
                    if (res.data.success) {
                        setDetails(res.data.user)
                        axios.get('http://localhost:5000/chart/bg_graph/' + res.data.user._id, {
                            headers: {
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                                'Authorization': `Bearer ${t}`
                            }
                        })
                            .then(res => {
                                if (res.data.success) {
                                    setbgGraph(res.data.record)
                                    console.log(res.data)
                                }
                            })
                        axios.get('http://localhost:5000/chart/bp_graph/' + res.data.user._id, {
                            headers: {
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                                'Authorization': `Bearer ${t}`
                            }
                        })
                            .then(res => {
                                if (res.data.success) {
                                    setbpGraph(res.data.record)
                                    console.log(res.data)
                                }
                            })
                    }
                    console.log(res.data)
                })
        }
    }, [id, location, user]);
    return (
        <div>
            <div> <DocNav token={token} user={user} /> </div>
            <div className='avoid_header'>
                <div className='main_body'>
                    <div className='container'>
                        <p>User Details</p>
                        <hr />
                    </div>
                    <div>
                        <p>{details ? <Card user={details} /> : 'Fetching Data'}</p>
                    </div>
                    <div>
                        <p>Blood Glocuse Graph</p>
                        <div>
                            {bgGraph ?
                                <div>
                                    <Bar
                                        data={
                                            {
                                                labels: bgGraph.fdates,
                                                datasets:
                                                    [
                                                        {
                                                            label: 'Blood Sugar Fasting',
                                                            backgroundColor: 'rgba(75,192,192,1)',
                                                            borderColor: 'rgba(0,0,0,1)',
                                                            borderWidth: 1,
                                                            data: bgGraph.fasting
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
                                                labels: bgGraph.rdates,
                                                datasets:
                                                    [
                                                        {
                                                            label: 'Blood Sugar Random',
                                                            backgroundColor: 'rgba(75,192,192,1)',
                                                            borderColor: 'rgba(0,0,0,1)',
                                                            borderWidth: 1,
                                                            data: bgGraph.random
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
                        <div>
                            <p>Blood Pressure Graph</p>
                        </div>
                        <div>
                            {bpGraph ?
                                <div>
                                    <Bar
                                        data={
                                            {
                                                labels: bpGraph.dates,
                                                datasets:
                                                    [
                                                        {
                                                            label: 'Diastolic Blood Pressure',
                                                            backgroundColor: 'rgba(194,24,7,0.5)',
                                                            borderColor: 'rgba(194,24,7,1)',
                                                            borderWidth: 1,
                                                            data: bpGraph.systolic
                                                        },
                                                        {
                                                            label: 'Systolic Blood Pressure',
                                                            backgroundColor: 'rgba(250,128,114,0.5)',
                                                            borderColor: 'rgba(250,128,114,1)',
                                                            borderWidth: 1,
                                                            data: bpGraph.dystolic
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
        </div>
    )
}

const Card = (props) => {
    const getAge = () => {
        // new Date(Date.now() - new Date(res.data.user.dob.slice(0, 10))).getUTCFullYear() - 1970
        const age = new Date(Date.now() - (new Date(props.user.dob.slice(0, 10)).getTime()))
        return (age.getUTCFullYear() - 1970);
    }
    return (
        <div>
            <p>Name: {props.user.fname.toUpperCase() + ' ' + props.user.lname.toUpperCase()}</p>
            <p>Date Of Birth: {props.user.dob.slice(0, 10)}</p>
            <p>Age: {getAge()}</p>
            <p>Gender: {props.user.gender}</p>
        </div>
    )
}