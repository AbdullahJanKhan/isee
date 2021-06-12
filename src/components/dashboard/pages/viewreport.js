import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import ReportTemplate from './reportTemplate';
import DocNav from '../navbar/DocNav';
import Navbar from '../navbar/Navbar';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { AiOutlineSave, AiOutlineDownload } from 'react-icons/ai'
import axios from "axios";

export default function ViewReports(props) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [data, setData] = useState(null)
    const location = useLocation()
    const history = useHistory()
    useEffect(() => {
        if (location.state) {
            console.log(location.state)
            setUser(location.state.user)
            setToken(location.state.token)
            setData(location.state.data)
        }
    }, [location])

    const handleSave = () => {
        const newData = {
            data: data
        }
        axios.post('http://localhost:5000/report/save_report', newData, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => console.log(res.data))

    }

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
                    }}
                        onClick={() => history.goBack()}><IoArrowBackCircleOutline /> Back </p>
                    <p style={{
                        border: '1px solid black',
                        padding: '10px',
                        borderRadius: '15px',
                        cursor: 'pointer',
                        width: 'max-content'
                    }}
                        onClick={handleSave}>Save Report <AiOutlineSave /></p>
                    <p style={{
                        border: '1px solid black',
                        padding: '10px',
                        borderRadius: '15px',
                        cursor: 'pointer',
                        width: 'max-content',
                    }}>Download Report <AiOutlineDownload /></p>
                </div>
                <div style={{ width: "683px", height: '1024px', margin: "auto" }}>
                    <ReportTemplate user={user} data={data} />
                </div>
            </div>
        </div>
    )
}