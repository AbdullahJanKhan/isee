import React from "react";
import "./User.css";
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Report from './pages/reports';
import Doctor from './pages/searchdoc';
import Chat from './pages/messages';
import BP from './pages/bp';
import BG from './pages/bg';
import { UserProfile } from '../login/index';
function UserDashboard() {
    return (
        <div>
            <Switch>
                <Route path='/user/home'>
                    <div>
                        <Home />
                    </div>
                </Route>
                <Route path='/user/reports'>
                    <div>
                        <Report />
                    </div>
                </Route>
                <Route path='/user/searchDoc'>
                    <div>
                        <Doctor />
                    </div>
                </Route>
                <Route path='/user/messages'>
                    <div>
                        <Chat />
                    </div>
                </Route>
                <Route path='/user/managebp'>
                    <div>
                        <BP />
                    </div>
                </Route>
                <Route path='/user/managebg'>
                    <div>
                        <BG />
                    </div>
                </Route>
                <Route path='/user/profile'>
                    <div>
                        <UserProfile />
                    </div>
                </Route>
            </Switch>
        </div>
    );
}

export default UserDashboard;
