import React, { useState } from 'react';
import image from "../../asset/login.svg";
import "./style.css";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export function Register() {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState(null);
    const [password, setPassword] = useState('');
    const [cnfpassword, setcnfPassword] = useState('');


    const handelSubmit = () => {
        if (password !== cnfpassword) {
            alert('Password Not Macthing');
            return;
        }
        const data = {
            'fname': fname,
            'lname': lname,
            'username': email,
            'password': password,
            'dob': date,
            'gender': 'Male'
        }
        console.log(data)
        axios.post('http://localhost:5000/users/register', data, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        })
            .then((res) => {
                if (res.data.success) {
                    return <Redirect to='/login' />
                }

            });
    }

    return (
        <div className="base-container">
            <div className="boxreg">
                <div className="Register">
                    Register
                    </div>
                <div>
                    <img src={image} alt='Sample'></img>
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
                    </div>
                </div>
                <div className="footer">
                    <button type="button" className="btn" onClick={() => handelSubmit()}>
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}