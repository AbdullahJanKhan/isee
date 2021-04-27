import React, { useState } from 'react';
import image from "../../asset/login.svg";
import "./style.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
export function Register() {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState(null);
    const [password, setPassword] = useState('');
    const [cnfpassword, setcnfPassword] = useState('');
    const submitBtn = React.createRef();

    const [success, setSuccess] = useState(false);

    const handelSubmit = (event) => {
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
                console.log(res);
                setSuccess(res.data.success)
            });
    }

    return (
        <div className="base-container">
            <div className="boxreg">
                <div className="Register">
                    Register
                    </div>
                <div className="img">
                    <img src={image} alt='Sample'></img>
                </div>
                <hr className="line"></hr>
                <div className="content">
                    <div className="form">
                        <div className="inrow">
                            <div className="form-group" style={{ marginRight: "30px" }}>
                                <label htmlFor="firstname">First name</label>
                                <input type="text"
                                    name="firstname"
                                    placeholder="First Name"
                                    onChange={data => setFname(data.target.value)}
                                    value={fname}
                                    required={true}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastname">Last name</label>
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
                                <label htmlFor="email">Email</label>
                                <input type="text"
                                    name="email"
                                    placeholder="Email"
                                    onChange={data => setEmail(data.target.value)}
                                    value={email}
                                    required={true}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="dob">Date Of Birth</label>
                                <input type="date"
                                    name="Dob"
                                    style={{ color: "rgba(128,128,128, 1.0)" }}
                                    onChange={data => setDate(new Date(data.target.value))}
                                />
                            </div>
                        </div>
                        <div className="inrow">
                            <div className="form-group" style={{ marginRight: "30px" }}>
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={data => setPassword(data.target.value)}
                                    value={password}
                                    required={true}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirm password">Confirm Password</label>
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
                    <Link to={success ? '/home' : '/register'}>
                        <button type="button" ref={submitBtn} className="btn" onClick={event => handelSubmit(event)}>
                            Register
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}