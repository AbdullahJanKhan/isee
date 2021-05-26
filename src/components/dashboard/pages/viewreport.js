import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

import ReportTemplate from './reportTemplate';
import DocNav from '../navbar/DocNav';
import Navbar from '../navbar/Navbar';
import { GiCardDiscard } from 'react-icons/gi'
import { AiOutlineSave, AiOutlineDownload } from 'react-icons/ai'
export default function ViewReports(props) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const location = useLocation()
    useEffect(() => {
        if (location.state) {
            setUser(location.state.user)
            setToken(location.state.token)
        }
    }, [location])
    return (
        <div>
            <div> {props.isDoctor ?
                <DocNav token={token} user={user} /> : <Navbar token={token} user={user} />}
            </div>
            <div style={{ padding: '100px 0px 100px 0px', margin: 'auto' }}>
                <div style={{
                    display: 'flex',
                    width: "680px",
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 'auto',
                    fontSize: '20px',
                    fontWeight: '500'
                }}>
                    <p style={{
                        border: '1px solid black',
                        padding: '10px',
                        borderRadius: '15px',
                        cursor: 'pointer',
                        width: 'max-content'
                    }}>Discard Report <GiCardDiscard /></p>
                    <p style={{
                        border: '1px solid black',
                        padding: '10px',
                        borderRadius: '15px',
                        cursor: 'pointer',
                        width: 'max-content'
                    }}>Save Report <AiOutlineSave /></p>
                    <p style={{
                        border: '1px solid black',
                        padding: '10px',
                        borderRadius: '15px',
                        cursor: 'pointer',
                        width: 'max-content',
                    }}>Download Report <AiOutlineDownload /></p>
                </div>
                <div style={{ width: "683px", height: '1024px', margin: "auto" }}>
                    <ReportTemplate />
                </div>
            </div>
        </div>
    )
}