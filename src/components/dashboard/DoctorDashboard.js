import React from "react";
import "./User.css";
import { Switch, Route } from 'react-router-dom';
import Home from './pages/drhome';
import DR from './pages/checkdisease'
import Requests from './pages/requests'
import Details from './pages/details'
import Report from './pages/viewreport'
import Under from './pages/undercons'
import { UserProfile } from '../login/index';
function DoctorDashboard() {
    return (
        <div>
            <Switch>
                <Route path='/doctor/home'>
                    <div>
                        <Home />
                    </div>
                </Route>
                <Route path='/doctor/view_request'>
                    <div>
                        <Requests />
                    </div>
                </Route>
                <Route path='/doctor/checkdisease'>
                    <div>
                        <DR isDoctor={true} />
                    </div>
                </Route>
                <Route path='/doctor/details/:id'>
                    <div>
                        <Details />
                    </div>
                </Route>
                <Route path='/doctor/profile'>
                    <div>
                        <UserProfile isDoctor={true} />
                    </div>
                </Route>
                <Route path='/doctor/dr_report'>
                    <div>
                        <Report />
                    </div>
                </Route>
                <Route path='/doctor/notification'>
                    <div>
                        <Under isDoctor={true} />
                    </div>
                </Route>
            </Switch>
        </div>
    );
}

export default DoctorDashboard;
