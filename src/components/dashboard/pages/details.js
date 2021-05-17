import React, { useState } from 'react'
import './styles.css'
import DocNav from '../navbar/DocNav'
import { useLocation, useParams } from 'react-router'
import axios from 'axios'

export default function Details() {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [details, setDetails] = useState(null)
    const { id } = useParams();

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
                    if (res.data.success)
                        setDetails(res.data.user)
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
                        <p>{details ? JSON.stringify(details) : <span></span>}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

