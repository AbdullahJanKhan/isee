import React from "react";
import "./User.css";
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import DR from './pages/checkdisease';
import Report from './pages/reports';
import Doctor from './pages/searchdoc';
import BP from './pages/bp';
import BG from './pages/bg';
import BGGraph from './pages/graphbg';
import BPGraph from './pages/graphbp';
import Reports from './pages/viewreport';
import Under from './pages/undercons';
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
                <Route path='/user/checkdisease'>
                    <div>
                        <DR isDoctor={false} />
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
                        <Under />
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
                        <UserProfile isDoctor={false} />
                    </div>
                </Route>
                <Route path='/user/dr_report'>
                    <div>
                        <Reports />
                    </div>
                </Route>
                <Route path='/user/notification'>
                    <div>
                        <Under />
                    </div>
                </Route>
                <Route path='/user/graph/bp'>
                    <div>
                        <BPGraph />
                    </div>
                </Route>
                <Route path='/user/graph/bg'>
                    <div>
                        <BGGraph />
                    </div>
                </Route>
            </Switch>
        </div>
    );
}

export default UserDashboard;
