import React from 'react';
import image from "../../asset/login.svg";
import "./style.css";
import axios from 'axios';
import { useHistory } from 'react-router-dom';


export function Login() {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory()
    const handelSubmit = () => {
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
                if (res.data.success) {
                    history.push('/home')
                }
            });

    }

    return (
        <div className="base-container">
            <div className="boxlog">
                <div className="login">
                    Login
                    </div>
                <div>
                    <img src={image} alt='Sample'></img>
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
                </div>
            </div>
        </div>
    );
}