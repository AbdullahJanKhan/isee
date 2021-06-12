import React from 'react';
import './styles.css'
import Header from '../navbar/header/header';

import { VscPerson } from "react-icons/vsc"
import { GrUserSettings, GrNotification, GrTest } from 'react-icons/gr'

import { useHistory, useLocation } from 'react-router';
import { IconContext } from 'react-icons/lib';

export default function DashboardMain() {

    const [user, setUser] = React.useState(null);
    const [token, setToken] = React.useState(null);

    const location = useLocation()
    const history = useHistory();

    React.useEffect(() => {
        if (location.state) {
            setUser(location.state.user);
            setToken(location.state.token);
        }
    }, [location])

    return (
        <div>
            <Header noSidebar={true} />
            <div className='avoid_header' >
                <IconContext.Provider value={{ size: '32' }}>

                    <div style={{ margin: 'auto', display: 'flex', alignItems: 'center' }}>
                        <div className='main_body' >
                            <div>
                                <p className='section_header'>Welcome, Dr. {user ? user.fname + ' ' + user.lname : ''}</p>
                            </div>
                            <div>
                                <p className='section_lable'>Blindness Detection System: </p>
                            </div>
                            <div className='main_body_home'>
                                <div className='box_main_40'
                                    onClick={() => history.push({
                                        pathname: '/doctor/checkdisease',
                                        state: {
                                            user: user,
                                            token: token,
                                        }
                                    })}>
                                    <p>Check Diease</p>
                                    <GrTest />
                                </div>
                                <div className='box_main_40'
                                    onClick={() => history.push({
                                        pathname: '/doctor/view_request',
                                        state: {
                                            user: user,
                                            token: token,
                                        }
                                    })}>
                                    <p>View Appointment Requests</p>
                                    <VscPerson />
                                </div>
                            </div>
                            <div>
                                <p className='section_lable'>Profile Settings: </p>
                            </div>
                            <div className='main_body_home'>
                                <div className='box_main_40' onClick={() => history.push({
                                    pathname: '/doctor/profile',
                                    state: {
                                        user: user,
                                        token: token,
                                    }
                                })}>
                                    <p>Update Profile Settings</p>
                                    <GrUserSettings />
                                </div>
                                <div className='box_main_40' onClick={() => history.push({
                                    pathname: '/doctor/notification',
                                    state: {
                                        user: user,
                                        token: token,
                                    }
                                })}>
                                    <p>Notifications Settings</p>
                                    <GrNotification />
                                </div>
                            </div>
                        </div>
                    </div>
                </IconContext.Provider>
            </div>
        </div>
    )
}