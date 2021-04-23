import React from 'react';
import image from "../../asset/login.svg";
import "./style.css";
export class Login extends React.Component {
    render() {
        return (
            <div className="base-container">
                <div className="boxlog">
                    <div className="login">
                        Login
                </div>
                    <div className="img">
                        <img src={image} alt='Sample'></img>
                    </div>
                    <hr className="line"></hr>
                    <div className="content">
                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" placeholder="username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" placeholder="password" />
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <button type="button" className="btn">
                            Login
                    </button>
                    </div>
                </div>
            </div>
        );
    }
}