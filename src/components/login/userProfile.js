import React, { useState } from 'react';
import { useLocation } from 'react-router';
import Navbar from '../dashboard/navbar/Navbar';
import DocNav from '../dashboard/navbar/DocNav';
import "./style.css";

export function UserProfile(props) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const location = useLocation();
    React.useEffect(() => {
        if (location.state) {
            setUser(location.state.user)
            setToken(location.state.token)
        }
    }, [location, user]);

    return (
        <div>
            <div> {props.isDoctor ? <DocNav token={token} user={user} /> : <Navbar token={token} user={user} />} </div>
            <div className="base-container">
                <div className="boxup">
                    <div className="Register">
                        User Profile
                    </div>
                    <hr className="line"></hr>
                    <div className="content">
                        <div className="form">
                            <div className="inrow" style={{ justifyContent: 'space-evenly' }}>
                                <div className="form-group">
                                    <label htmlFor="firstname" className="placeholder">First name</label>
                                    <input type="text" name="firstname" placeholder="First Name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Lastname" className="placeholder">Last name</label>
                                    <input type="text" name="firstname" placeholder="Last Name" />
                                </div>

                            </div>
                            <div className="inrow">
                                <div className="form-group" style={{ marginRight: "30px" }}>
                                    <label htmlFor="Lastname" className="placeholder">Gender</label>
                                    <select className="other">
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dob" className="placeholder">Date Of Birth</label>
                                    <input type="date" name="Dob" style={{ color: "rgba(128,128,128, 1.0)" }} />
                                </div>
                            </div>
                            <div className="subheading">
                                <label htmlFor="email" className="change" >Change Email</label>
                            </div>
                        </div>
                    </div>
                    <hr className="line"></hr>
                    <div className="content">
                        <div className="form">
                            <div className="inrow">
                                <div className="form-group" style={{ marginRight: "30px" }}>
                                    <label htmlFor="email" className="placeholder">Email</label>
                                    <div>
                                        <input type="text" name="email" placeholder="New email" style={{ marginRight: "30px" }} />
                                        <button type="button" className="btn">
                                            Change
                                    </button>
                                    </div>
                                </div>
                            </div>
                            <div className="subheading">
                                <label htmlFor="contact" className="change">Change password</label>
                            </div>
                        </div>
                    </div>
                    <hr className="line"></hr>
                    <div className="content">
                        <div className="form">
                            <div className="inrow">
                                <div className="form-group" style={{ marginRight: "30px" }}>
                                    <label htmlFor="password" className="placeholder">Previous Password</label>
                                    <input type="password" name="password" placeholder="Password" />
                                </div>
                                <div className="form-group" style={{ marginRight: "30px" }}>
                                    <label htmlFor="confirm password" className="placeholder">New Password</label>
                                    <input type="password" name="password" placeholder="Confirm password" />
                                </div>
                                <div className="form-group" style={{ marginRight: "30px" }}>
                                    <label htmlFor="confirm password" className="placeholder">Confirm New Password</label>
                                    <input type="password" name="password" placeholder="Confirm password" />

                                </div>
                                <div className="form-group">
                                    <button type="button" className="btn" style={{ alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: '9.5px' }}>
                                        Change
                                    </button>
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
        </div>
    );
}