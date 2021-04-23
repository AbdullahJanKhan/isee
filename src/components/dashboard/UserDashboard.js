import React from "react";
import "./User.css";
import NavBar from './navbar/Navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Report from './pages/reports';
import Doctor from './pages/searchdoc';
import Chat from './pages/messages';
import BP from './pages/bp'
import BG from './pages/bg'

function UserDashboard() {
    return (
        <div>
            <Router>
                <div>
                    <NavBar />
                </div>
                <div style={{ padding: "90px 0px 10px 0px" }}>
                    <Switch>
                        <Route path='/home'>
                            <Home />
                        </Route>
                        <Route path='/reports'>
                            <Report />
                        </Route>
                        <Route path='/searchDoc'>
                            <Doctor />
                        </Route>
                        <Route path='/messages'>
                            <Chat />
                        </Route>
                        <Route path='/managebp'>
                            <BP />
                        </Route>
                        <Route path='/managebg'>
                            <BG />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default UserDashboard;