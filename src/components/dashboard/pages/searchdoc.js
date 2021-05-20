import React, { useState } from 'react';
import { useLocation } from 'react-router';
import Navbar from '../navbar/Navbar';
import axios from 'axios';
import * as GoIcons from 'react-icons/go'
import './styles.css'

export default function Doctor() {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [doctors, setDoctors] = useState(null)
    const [requested, setRequested] = useState(null)
    const location = useLocation();
    React.useEffect(() => {
        if (location.state) {
            setUser(location.state.user)
            setToken(location.state.token)
            axios.get('http://localhost:5000/doctor/get_doc', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    'Authorization': `Bearer ${location.state.token}`
                }
            })
                .then((res) => {
                    setDoctors(res.data)
                });
            axios.get('http://localhost:5000/request/get_requests', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    'Authorization': `Bearer ${location.state.token}`
                }
            })
                .then(res => {
                    console.log(res.data)
                    if (res.data.success) {
                        setRequested(res.data.data)
                    } else {
                        setRequested(['none requested'])
                    }
                })

        }
    }, [location]);

    return (
        <div>
            <div> <Navbar token={token} user={user} /> </div>
            <div className='avoid_header'>
                <div className='main_body'>
                    <h2>Search Doctor</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                        {(doctors && requested) ? Object.keys(doctors).map((i) => {
                            return (<Card
                                userid={doctors[i].userid}
                                pmdcid={doctors[i].pmdcid}
                                isVerified={doctors[i].isVerified}
                                key={doctors[i]._id}
                                user={user}
                                token={token}
                                d_id={doctors[i]._id}
                                requested={requested}
                                setRequested={setRequested}
                            />)
                        }) : <p></p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

const Card = (props) => {
    const getVerified = () => {
        return props.isVerified ? <GoIcons.GoVerified /> : <GoIcons.GoUnverified />
    }
    const isRequested = () => {
        for (var i = 0; i < props.requested.length; i++) {
            if (props.d_id === props.requested[i]) {
                return true
            }
        }
        return false
    }
    const handelRequest = () => {
        const data = {
            p_id: props.user._id,
            d_id: props.d_id,
            msg: 'Test data passed'
        }
        axios.post('http://localhost:5000/request/add_request', data, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Authorization': `Bearer ${props.token}`
            }
        })
            .then(res => {
                if (res.data.success)
                    axios.get('http://localhost:5000/request/get_requests', {
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                            'Authorization': `Bearer ${props.token}`
                        }
                    })
                        .then(res => {
                            if (res.data.success) {
                                props.setRequested(res.data.data)
                                console.log(res.data)
                            }
                        })
            })
    }
    return (
        <div className='box' style={{
            justifyContent: 'space-between',
            display: 'flex'
        }}>
            <div style={{ width: '40%' }}>
                <p>Dr. {props.userid.fname + ' ' + props.userid.lname} {getVerified()}</p>
                <p>PMDC Licence ID: {props.pmdcid}</p>
            </div>
            <div className='p_button_div'>
                <p
                    className={isRequested() ? 'p_sent' : 'p_not_sent'}
                    onClick={!isRequested() ? handelRequest : (() => 'Cannot Request')}>
                    {isRequested() ? 'Request Sent' : 'Send Request'}
                </p>
            </div>
        </div>
    )
}

// data = {p_id = user._id, d_id = doctor._id, msg=msg}
// axios.get('http://localhost:5000/request/add_request', {
// headers: {
//     'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//             'Authorization': `Bearer ${location.state.token}`
// }
// })