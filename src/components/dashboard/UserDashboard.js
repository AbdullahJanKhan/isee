import React from "react";
import "./User.css";
import NavBar from './navbar/Navbar'
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Home from './pages/home';
import Report from './pages/reports';
import Doctor from './pages/searchdoc';
import Chat from './pages/messages';
import BP from './pages/bp';
import BG from './pages/bg';
import { Login, Register, UserProfile } from '../login/index';
function UserDashboard() {
    var history = useHistory();
    return (
        <div>
            <Router histroy={history}>
                <div>
                    <Switch>
                        <Route exact path='/'>
                            <Redirect to='/login' />
                        </Route>
                        <Route path='/login'>
                            <div>
                                <NavBar />
                                <Login />
                            </div>
                        </Route>
                        <Route path='/register'>
                            <div>
                                <NavBar />
                                <Register />
                            </div>
                        </Route>
                        <Route path='/home'>
                            <div>
                                <NavBar />
                                <Home />
                            </div>
                        </Route>
                        <Route path='/reports'>
                            <div>
                                <NavBar />
                                <Report />
                            </div>
                        </Route>
                        <Route path='/searchDoc'>
                            <div>
                                <NavBar />
                                <Doctor />
                            </div>
                        </Route>
                        <Route path='/messages'>
                            <div>
                                <NavBar />
                                <Chat />
                            </div>
                        </Route>
                        <Route path='/managebp'>
                            <div>
                                <NavBar />
                                <BP />
                            </div>
                        </Route>
                        <Route path='/managebg'>
                            <div>
                                <NavBar />
                                <BG />
                            </div>
                        </Route>
                        <Route path='/profile'>
                            <div>
                                <NavBar />
                                <UserProfile />
                            </div>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default UserDashboard;
