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
    const [bgGraph, setbgGraph] = useState(null)

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
            axios.get('http://localhost:5000/chart/bg_graph', {
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
                        <p>{details ? <Card user={details} /> : <span></span>}</p>
                    </div>
                    <div>
                        <p>Blood Glocuse Graph</p>
                        
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