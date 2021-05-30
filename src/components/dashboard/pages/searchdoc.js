import React, { useState } from 'react';
import { useLocation } from 'react-router';
import Navbar from '../navbar/Navbar';
import axios from 'axios';
import * as GoIcons from 'react-icons/go'
import * as GiIcons from 'react-icons/gi'
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
            console.log(location.state.user)
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
                    <h2>Request Doctor For Appointment</h2>
                    <hr />
                    {(doctors && requested) ? Object.keys(doctors).map((i) => {
                        return (
                            <div style={{ width: '100%', justifyContent: 'center' }} key={doctors[i]._id}>
                                <Card
                                    userid={doctors[i].userid}
                                    pmdcid={doctors[i].pmdcid}
                                    isVerified={doctors[i].isVerified}
                                    key={doctors[i].userid._id}
                                    user={user}
                                    token={token}
                                    d_id={doctors[i]._id}
                                    requested={requested}
                                    setRequested={setRequested}
                                />
                            </div>
                        )
                    }) : <p>Fetching Data</p>}
                </div>
            </div>
        </div>
    );
}

const Card = (props) => {
    const [msg, setMsg] = useState('')

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
            msg: msg,
            name: props.user.fname.toUpperCase() + ' ' + props.user.lname.toUpperCase(),
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
                            } else {
                                props.setRequested(['No Record Found'])
                            }
                        })
            })
    }

    const handelCancel = () => {
        axios.delete(`http://localhost:5000/request/delete_req/${props.user._id}/${props.d_id}`, {
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
                            console.log(res.data)
                            if (res.data.success) {
                                props.setRequested(res.data.data)
                            } else {
                                props.setRequested(['No Record Found'])
                            }
                        })
            })
    }
    return (
        <div className='box_row' style={{
            justifyContent: 'space-between',
            display: 'flex'
        }}>
            <div style={{ width: '40%', alignSelf: 'center' }}>
                <p>Dr. {props.userid.fname.toUpperCase() + ' ' + props.userid.lname.toUpperCase()} {getVerified()}</p>
                <p>PMDC Licence ID: {props.pmdcid}</p>
            </div>
            <div className='p_button_div'>
                {isRequested() ?
                    <div style={{ alignSelf: 'center' }}>
                        <p className='p_sent'>Request Sent</p>
                        <p onClick={() => handelCancel()} style={{ cursor: 'pointer' }}><GiIcons.GiCancel /> Cancel Request </p>
                    </div>
                    :
                    <div style={{ alignSelf: 'center' }}>
                        <input
                            type='text'
                            placeholder='Enter Reason'
                            value={msg}
                            onChange={e => setMsg(e.target.value)}
                        />
                        <p
                            className='p_not_sent'
                            onClick={handelRequest}
                        >
                            Send Request
                        </p>
                    </div>
                }
            </div>
        </div>
    )
}
// onClick={!isRequested() ?  : (() => 'Cannot Request')}>

// data = {p_id = user._id, d_id = doctor._id, msg=msg}
// axios.get('http://localhost:5000/request/add_request', {
// headers: {
//     'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//             'Authorization': `Bearer ${location.state.token}`
// }
// })