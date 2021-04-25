import React from "react";
import "./User.css";
import NavBar from './navbar/Navbar'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/home';
import Report from './pages/reports';
import Doctor from './pages/searchdoc';
import Chat from './pages/messages';
import BP from './pages/bp'
import BG from './pages/bg'
import { Login, Register } from '../login/index'
function UserDashboard() {
    return (
        <div>
            <Router>
                <div>
                    <Switch>
                        <Route exact path='/'>
                            <Redirect to='/login' />
                        </Route>
                        <Route path='/login'>
                            <Login />
                        </Route>
                        <Route path='/register'>
                            <Register />
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
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default UserDashboard;
