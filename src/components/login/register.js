import React, { useState } from 'react';
import "./style.css";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Header from '../dashboard/navbar/header/header';

export function Register() {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState(null);
    const [password, setPassword] = useState('');
    const [cnfpassword, setcnfPassword] = useState('');
    const [gender, setgender] = useState('');
    const [occupation, setOccupation] = useState('');
    const history = useHistory();

    const handelSubmit = () => {
        if (password !== cnfpassword) {
            alert('Password Not Macthing');
            return;
        }
        const isDoctor = occupation === 'doctor'
        const data = {
            'fname': fname,
            'lname': lname,
            'username': email,
            'password': password,
            'dob': date,
            'gender': gender,
            'isDoctor': isDoctor
        }
        axios.post('http://localhost:5000/users/register', data, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        })
            .then((res) => {
                if (res.data.success && isDoctor) {
                    history.push({
                        pathname: "/add_pmdcid",
                        state: {
                            id: res.data.id
                        }
                    });
                } else if (res.data.success) {
                    history.push('/login');
                } else {
                    reset();
                }
            });
    }

    const reset = () => {
        setFname('')
        setLname('')
        setEmail('')
        setDate(null)
        setPassword('')
        setcnfPassword('')
        setgender('')
        setOccupation('')
    }

    return (
        <div>
            <div> <Header noSidebar={true} /> </div>
            <div className="base-container">
                <div className="boxreg">
                    <div className="Register">
                        Register
                    </div>
                    <hr className="line"></hr>
                    <div className="content">
                        <div className="form">
                            <div className="inrow">
                                <div className="form-group" style={{ marginRight: "30px" }}>
                                    <label htmlFor="firstname" className="placeholder">First name</label>
                                    <input type="text"
                                        name="firstname"
                                        placeholder="First Name"
                                        onChange={data => setFname(data.target.value)}
                                        value={fname}
                                        required={true}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastname" className="placeholder">Last name</label>
                                    <input type="text"
                                        name="lastname"
                                        placeholder="Last Name"
                                        onChange={data => setLname(data.target.value)}
                                        value={lname}
                                        required={true}
                                    />
                                </div>
                            </div>
                            <div className="inrow">
                                <div className="form-group" style={{ marginRight: "30px" }}>
                                    <label htmlFor="email" className="placeholder">Email</label>
                                    <input type="text"
                                        name="email"
                                        placeholder="Email"
                                        onChange={data => setEmail(data.target.value)}
                                        value={email}
                                        required={true}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dob" className="placeholder">Date Of Birth</label>
                                    <input type="date"
                                        name="Dob"
                                        style={{ color: "rgba(128,128,128, 1.0)" }}
                                        onChange={data => setDate(new Date(data.target.value))}
                                    />
                                </div>
                            </div>
                            <div className="inrow">
                                <div className="form-group" style={{ marginRight: "30px" }}>
                                    <label htmlFor="password" className="placeholder">Password</label>
                                    <input type="password"
                                        name="password"
                                        placeholder="Password"
                                        onChange={data => setPassword(data.target.value)}
                                        value={password}
                                        required={true}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirm password" className="placeholder">Confirm Password</label>
                                    <input type="password"
                                        name="password"
                                        placeholder="Confirm password"
                                        onChange={event => {
                                            setcnfPassword(event.target.value)
                                        }}
                                        value={cnfpassword}
                                        required={true}
                                    />
                                </div>
                            </div>
                            <div className="inrow">
                                <div className="form-group" style={{ marginRight: "30px" }}>
                                    <label htmlFor="gender" className="placeholder">Gender:</label>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <input type="radio"
                                            name="gender"
                                            value="Male"
                                            onChange={data => setgender(data.target.value)}
                                            required={true}
                                        />Male
                                        <input type="radio"
                                            name="gender"
                                            value="Male"
                                            onChange={data => setgender(data.target.value)}
                                            required={true}
                                        />Female
                                    </div>
                                </div>
                                <div className="form-group" >
                                    <label htmlFor="occupation" className="placeholder">Occupation</label>
                                    <select
                                        name="occupation"
                                        placeholder="Occupation"
                                        onChange={event => {
                                            setOccupation(event.target.value)
                                        }}
                                        value={cnfpassword}
                                        required={true}
                                    >
                                        <option value='other'>Other</option>
                                        <option value='doctor'>Doctor</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <button type="button" className="btn" onClick={() => handelSubmit()}>
                            Register
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
}