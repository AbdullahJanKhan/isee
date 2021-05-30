import React, { useState } from "react";
import './styles.css'
import DocNav from '../navbar/DocNav'
import { useLocation, useHistory } from "react-router-dom";
import * as GoIcons from 'react-icons/go';
import axios from "axios";

export default function Requests() {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [requests, setRequests] = useState(null)

    const location = useLocation();
    React.useEffect(() => {
        if (location.state) {
            setUser(location.state.user)
            setToken(location.state.token)
        }
        axios.get('http://localhost:5000/request/recieved_req', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Authorization': `Bearer ${location.state.token}`
            }
        })
            .then(res => {
                if (res.data.success) {
                    setRequests(res.data.requests)
                }
            })
    }, [location]);

    return (
        <div>
            <div> <DocNav token={token} user={user} /> </div>
            <div className='avoid_header'>
                <div className='main_body'>
                    <div className='container'>
                        <p>User Requests</p>
                        <hr />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                        {requests ? requests.map((request, index) => {
                            return <Card
                                user={user}
                                requests={request}
                                token={token}
                                setRequested={setRequests}
                                key={index}
                            />
                        })

                            :
                            <p>No Requests Recieved</p>}
                    </div>

                </div>
            </div>
        </div>
    )
}

const Card = (props) => {
    const history = useHistory()
    const handelClick = () => {
        history.push({
            pathname: '/doctor/details/' + props.requests.p_id,
            state: {
                user: props.userid,
                token: props.token
            }
        })
    }

    const handelCancel = () => {
        axios.delete(`http://localhost:5000/request/delete_req/${props.requests.p_id}/${props.requests.d_id}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Authorization': `Bearer ${props.token}`
            }
        })
            .then(res => {
                if (res.data.success)
                    axios.get('http://localhost:5000/request/recieved_req', {
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
                                props.setRequested(null)
                            }
                        })
            })
    }

    return (
        <div className='box_row' key={props.id} style={{ justifyContent: 'space-between', display: 'flex' }}>
            <div style={{ width: '80%' }}>
                <p>{props.requests.name}</p>
                <p>Reason: {props.requests.msg}</p>
                <p style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={handelClick}>View Details ?</p>
            </div>
            <div style={{
                width: '15%',
                display: 'flex',
                flexDirection: 'row',
                alignSelf: 'center',
                paddingRight: '10px',
                justifyContent: 'space-between'
            }}>
                <p style={{ border: '1px solid', borderRadius: '5px', cursor: 'pointer' }}>
                    <GoIcons.GoCheck />
                </p>
                <p style={{ border: '1px solid', borderRadius: '5px', cursor: 'pointer' }} onClick={handelCancel}>
                    <GoIcons.GoX />
                </p>

            </div>
        </div>
    )
}