import React, { useState } from 'react';
import "./style.css";
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import Header from '../dashboard/navbar/header/header';

export function PMDC() {
    const [pmdc, setPmdc] = useState('')
    const [_id, setId] = useState('');
    const location = useLocation();
    const history = useHistory();

    React.useEffect(() => {
        if (location.state) {
            setId(location.state.id)
        }
    }, [location]);


    const handleSubmit = () => {
        const data = {
            'id': _id,
            'pmdcid': pmdc
        }
        axios.post('http://localhost:5000/doctor/is_doctor', data, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        })
            .then((res) => {
                if (res.data.success)
                    history.push(res.data.to)
                else {
                    setPmdc('')
                }
            });

    }
    return (
        <div>
            <div> <Header noSidebar={true} /> </div>
            <div className="base-container">
                <div className="boxlog">
                    <div className="login">
                        Add PMDC ID
                   </div>
                    <hr className="line"></hr>
                    <div className="content">
                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="pmdcid" className="placeholder">PMCD ID</label>
                                <input type="text"
                                    name="pmdcid"
                                    placeholder="Enter PMDC ID"
                                    value={pmdc}
                                    onChange={e => setPmdc(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <button type="button" className="btn" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}