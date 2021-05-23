import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import Navbar from '../dashboard/navbar/Navbar';
import DocNav from '../dashboard/navbar/DocNav';
import "./style.css";
import axios from 'axios';

export function UserProfile(props) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [oldpassword, setoldpassword] = useState('')
    const [newpassword, setnewpassword] = useState('')
    const [cnfnewpassword, setcnfnewpassword] = useState('')
    const [fname, setfname] = useState('')
    const [lname, setlname] = useState('')
    const [updateName, setUpdateName] = useState(true)
    const [gender, setgender] = useState('')

    const location = useLocation();
    const history = useHistory();
    React.useEffect(() => {
        if (location.state) {
            setToken(location.state.token)
            setUser(location.state.user)
            setfname(location.state.user.fname)
            setlname(location.state.user.lname)
            setgender(location.state.user.gender)
        } else {
            history.push('/')
        }
    }, [location, history]);

    const validatepassword = () => {
        console.log(oldpassword, newpassword, cnfnewpassword)
        if (newpassword === cnfnewpassword) {
            return true
        }
        return false
    }

    const handleChangePasswword = () => {
        if (validatepassword()) {
            const data = {
                oldpassword: oldpassword,
                newpassword: newpassword
            }
            axios.post('http://localhost:5000/settings/change_password', data, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    console.log(res.data)
                })
        } else {
            alert('Passwords Do not Match')
        }

    }

    const handelNameChange = () => {
        const data = {
            fname: fname,
            lname: lname
        }
        axios.patch('http://localhost:5000/settings/update_name', data, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.data.success) {
                    setUser(user)
                }
            })
        setUpdateName(true)
    }

    return (
        <div>
            <div> {props.isDoctor ?
                <DocNav token={token} user={user} /> : <Navbar token={token} user={user} />}
            </div>
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
                                    <label
                                        htmlFor="firstname"
                                        className="placeholder">
                                        First name
                                    </label>
                                    <input
                                        type="text"
                                        name="firstname"
                                        placeholder="First Name"
                                        value={fname}
                                        onChange={(e) => setfname(e.target.value)}
                                        disabled={updateName}
                                    />
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="Lastname"
                                        className="placeholder"
                                    >
                                        Last name
                                    </label>

                                    <input
                                        type="text"
                                        name="firstname"
                                        placeholder="Last Name"
                                        value={lname}
                                        onChange={(e) => setlname(e.target.value)}
                                        disabled={updateName}
                                    />
                                </div>
                                <div>
                                    <button type="button"
                                        className="btn"
                                        onClick={updateName ? () => setUpdateName(!updateName) : handelNameChange}
                                    >
                                        {updateName ? 'Update' : 'Save'}
                                    </button>
                                </div>

                            </div>
                            <div className="inrow">
                                <div className="form-group" style={{ marginRight: "30px" }}>
                                    <label htmlFor="Lastname"
                                        className="placeholder">
                                        Gender
                                    </label>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <input type="radio"
                                            name="gender"
                                            value="Male"
                                            onChange={data => setgender(data.target.value)}
                                            required={true}
                                            checked={gender === 'Male'}
                                        />Male
                                        <input type="radio"
                                            name="gender"
                                            value="Female"
                                            onChange={data => setgender(data.target.value)}
                                            required={true}
                                            checked={gender === 'Female'}
                                        />Female
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dob"
                                        className="placeholder">
                                        Date Of Birth
                                    </label>
                                    <input
                                        type="date"
                                        name="Dob"
                                        style={{ color: "rgba(128,128,128, 1.0)" }}
                                        value={user ? user.dob.slice(0, 10) : ''}
                                        onChange={data => console.log(data.target.value)}
                                    />
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
                                    <label htmlFor="password"
                                        className="placeholder">
                                        Previous Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Old Password"
                                        value={oldpassword}
                                        onChange={(e) => setoldpassword(e.target.value)}
                                    />
                                </div>
                                <div className="form-group" style={{ marginRight: "30px" }}>
                                    <label htmlFor="New password"
                                        className="placeholder">
                                        New Password
                                    </label>
                                    <input type="password"
                                        name="password"
                                        placeholder="New password"
                                        value={newpassword}
                                        onChange={(e) => setnewpassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="inrow">
                                <div className="form-group" style={{ marginRight: "30px" }}>
                                    <label htmlFor="confirm password"
                                        className="placeholder">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Confirm New Password"
                                        value={cnfnewpassword}
                                        onChange={e => setcnfnewpassword(e.target.value)}
                                    />

                                </div>
                                <div className="form-group">
                                    <button type="button"
                                        className="btn"
                                        style={{
                                            alignItems: 'flex-end',
                                            justifyContent: 'flex-end',
                                            marginTop: '9.5px'
                                        }}
                                        onClick={handleChangePasswword}
                                    >
                                        Change
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <button type="button" className="btn">
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}