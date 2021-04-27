import React from 'react';
import image from "../../asset/login.svg";
import "./style.css";
export function UserProfile() {

    return (
        <div className="base-container">
                <div className="boxreg">
                    <div className="Register">
                        Register
                    </div>
                    <div>
                        <img src={image}></img>
                    </div>
                    <hr className="line"></hr>
                    <div className="content">
                        <div className="form">
                            <div className="inrow">
                            <div className="form-group" style={{marginRight:"30px"}}>
                                <label htmlFor="firstname" className="placeholder">First name</label>
                                <input type="text" name="firstname" placeholder="First Name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="firstname" className="placeholder">Last name</label>
                                <input type="text" name="firstname" placeholder="Last Name" />
                            </div>
                            </div>
                            <div className="inrow">
                            <div className="form-group" style={{marginRight:"30px"}}>
                                <label htmlFor="email" className="placeholder">Email</label>
                                <input type="text" name="email" placeholder="Email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="dob" className="placeholder">Date Of Birth</label>
                                <input type="date" name="Dob" style={{color:"rgba(128,128,128, 1.0)", width:"100%", marginRight:"0.8em"}} />
                            </div>
                            </div>
                            <div className="inrow">
                            <div className="form-group" style={{marginRight:"30px"}}>
                                <label htmlFor="password" className="placeholder">Password</label>
                                <input type="password" name="password" placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirm password" className="placeholder">Confirm Password</label>
                                <input type="password" name="password" placeholder="Confirm password" />
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <button type="button" className="btn">
                            Register
                        </button>
                    </div>
                </div>
            </div>
    );
}