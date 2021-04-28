import React from 'react';
import image from "../../asset/login.svg";
import "./style.css";
import { Link } from 'react-router-dom';
export function Login() {

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
                            <input type="text" name="username" placeholder="username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="placeholder">Password</label>
                            <input type="password" name="password" placeholder="password" />
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <Link to='/home'>
                        <button type="button" className="btn">
                            Login
                            </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}