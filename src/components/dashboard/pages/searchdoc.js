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
        }
    }, [location]);

    return (
        <div>
            <div> <Navbar token={token} user={user} /> </div>
            <div className='avoid_header'>
                <div className='main_body'>
                    <h2>Search Doctor</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                        {doctors ? Object.keys(doctors).map((i) => {
                            return (<Card userid={doctors[i].userid}
                                pmdcid={doctors[i].pmdcid}
                                isVerified={doctors[i].isVerified}
                                id={doctors[i]._id} />)
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
    return (
        <div className='box' key={props.id} style={{ justifyContent: 'space-between', display: 'flex' }}>
            <div style={{ width: '40%' }}>
                <p>Dr. {props.userid.fname + ' ' + props.userid.lname} {getVerified()}</p>
                <p>PMDC Licence ID: {props.pmdcid}</p>
            </div>
            <div style={{
                width: '40%',
                flexDirection: 'row-reverse',
                alignSelf: 'center',
                paddingRight: '10px'
            }}>
                <p style={{
                    width: 'max-content',
                    backgroundColor: 'grey',
                    color: "#fff",
                    cursor: 'pointer',
                    alignContent: 'center',
                    top: '50%',
                    left: '50%',
                    fontSize: '20px',
                    borderRadius: '10px',
                    padding: '5px',
                    boxShadow: '5px 5px 5px 1px grey'
                }}>Request Sent</p>
            </div>
        </div>
    )
}

            // <p></p>
            // <p></p>
            // <p>{}</p>
            // <p>Request Appointment</p>
