import React, { useState } from 'react'
import './styles.css'
import DocNav from '../navbar/DocNav'
import { useLocation } from 'react-router'

export default function Details() {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)

    const location = useLocation();
    React.useEffect(() => {
        if (location.state) {
            setUser(location.state.user)
            setToken(location.state.token)
        }
    }, [location, user]);
    return (
        <div>
            <div> <DocNav token={token} user={user} /> </div>
            <div className='avoid_header'>
                User Details
            </div>
        </div>
    )
}