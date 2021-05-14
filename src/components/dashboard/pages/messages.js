import React, { useState } from 'react';
import { useLocation } from 'react-router';
import Navbar from '../navbar/Navbar';

export default function Chat() {
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
            <div> <Navbar token={token} user={user} /> </div>
            <div className='avoid_header'>
                <h2>Chat</h2>
            </div>
        </div>
    );
}