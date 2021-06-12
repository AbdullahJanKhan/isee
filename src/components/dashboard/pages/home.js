import React from 'react';
import './styles.css'
import Header from '../navbar/header/header';

import { VscPerson } from "react-icons/vsc"
import { FaEnvelopeOpenText, FaHeartbeat } from "react-icons/fa"
import { BsFillDropletFill } from 'react-icons/bs'
import { BiBarChartSquare } from 'react-icons/bi'
import { GrUserSettings, GrNotification, GrInfo, GrTest } from 'react-icons/gr'

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
                                <p className='section_header'>Welcome, {user ? user.fname + ' ' + user.lname : ''}</p>
                            </div>
                            <div>
                                <p className='section_lable'>Blindness Detection System: </p>
                            </div>
                            <div className='main_body_home'>
                                <div className='box_main_20'
                                    onClick={() => history.push({
                                        pathname: '/user/checkdisease',
                                        state: {
                                            user: user,
                                            token: token,
                                        }
                                    })}>
                                    <p>Check Diease</p>
                                    <GrTest />
                                </div>
                                <div className='box_main_20'
                                    onClick={() => history.push({
                                        pathname: '/user/searchDoc',
                                        state: {
                                            user: user,
                                            token: token,
                                        }
                                    })}>
                                    <p>Consult A Doctor</p>
                                    <VscPerson />
                                </div>
                                <div className='box_main_20'
                                    onClick={() => history.push({
                                        pathname: '/user/reports',
                                        state: {
                                            user: user,
                                            token: token,
                                        }
                                    })}>
                                    <p>View Reports</p>
                                    <FaEnvelopeOpenText />
                                </div>
                                <div className='box_main_20'
                                    onClick={() => history.push({
                                        pathname: '/user/messages',
                                        state: {
                                            user: user,
                                            token: token,
                                        }
                                    })}>
                                    <p>View Tips</p>
                                    <GrInfo />
                                </div>
                            </div>
                            <div>
                                <p className='section_lable'>Health Management: </p>
                            </div>
                            <div className='main_body_home'>
                                <div className='box_main_20'
                                    onClick={() => history.push({
                                        pathname: '/user/managebg',
                                        state: {
                                            user: user,
                                            token: token,
                                        }
                                    })}>
                                    <p>Add Blood Glucose Record</p>
                                    <BsFillDropletFill />
                                </div>
                                <div className='box_main_20'
                                    onClick={() => history.push({
                                        pathname: '/user/managebp',
                                        state: {
                                            user: user,
                                            token: token,
                                        }
                                    })}>
                                    <p>Add Blood Pressure Record</p>
                                    <FaHeartbeat />
                                </div>
                                <div className='box_main_20'
                                    onClick={() => history.push({
                                        pathname: '/user/graph/bg',
                                        state: {
                                            user: user,
                                            token: token,
                                        }
                                    })}>
                                    <p>View Blood Glucose Graph</p>
                                    <BiBarChartSquare />
                                </div>
                                <div className='box_main_20' onClick={() => history.push({
                                    pathname: '/user/graph/bp',
                                    state: {
                                        user: user,
                                        token: token,
                                    }
                                })}>
                                    <p>View Blood Pressure Graph</p>
                                    <BiBarChartSquare />
                                </div>
                            </div>
                            <div>
                                <p className='section_lable'>Profile Settings: </p>
                            </div>
                            <div className='main_body_home'>
                                <div className='box_main_40' onClick={() => history.push({
                                    pathname: '/user/profile',
                                    state: {
                                        user: user,
                                        token: token,
                                    }
                                })}>
                                    <p>Update Profile Settings</p>
                                    <GrUserSettings />
                                </div>
                                <div className='box_main_40' onClick={() => history.push({
                                    pathname: '/user/notification',
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