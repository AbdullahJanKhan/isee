import React from 'react';
import "./style.css";
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';

export function Login() {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory()
    const check = () => {
        return email.length > 0 && password.length > 0
    }
    const handelSubmit = () => {
        if (check()) {
            const data = {
                'username': email,
                'password': password
            }
            axios.post('http://localhost:5000/users/login', data, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            })
                .then((res) => {
                    if (res.status === 401) {
                        alert('Test')
                    }
                    if (res.data.success) {
                        if (res.data.user.isDoctor)
                            history.push({
                                pathname: "/doctor/home",
                                state: {
                                    user: res.data.user,
                                    token: res.data.token
                                }
                            })
                        else
                            history.push({
                                pathname: "/user/home",
                                state: {
                                    user: res.data.user,
                                    token: res.data.token
                                }
                            })
                    }
                })
                .catch(res => alert('Invalid Credentials'))
        }
        else {
            alert("Fields Not Filled")
        }
    }

    return (
        <div>
            <div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        backgroundColor: "rgb(40,44,52)",
                        color: "#fff",
                    }}>
                    <p style={{ fontSize: "16px", fontWeight: "600" }}>
                        ISEE | Blindness Detection System
                    </p>
                </div>
            </div>
            <div className="base-container">
                <div className="boxlog">
                    <div className="login">
                        Login
                </div>
                    <hr className="line"></hr>
                    <div className="content">
                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="username" className="placeholder">Username</label>
                                <input type="text"
                                    name="username"
                                    placeholder="username"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="placeholder">Password</label>
                                <input type="password"
                                    name="password"
                                    placeholder="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <button type="button" className="btn" onClick={handelSubmit}>
                            Login
                        </button>
                        <Link to='/register'>
                            <p style={{ textDecoration: "underline" }}>Create A New Account?</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}