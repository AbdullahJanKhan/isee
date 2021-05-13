import React from "react";
import "./User.css";
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Requests from './pages/requests'
import Details from './pages/details'
import { UserProfile } from '../login/index';
function DoctorDashboard() {
    return (
        <div>
            <div>
                <Switch>
                    <Route path='/doctor/view_request'>
                        <div>
                            <Requests />
                        </div>
                    </Route>
                    <Route path='/doctor/dr_classifier'>
                        <div>
                            <Home />
                        </div>
                    </Route>
                    <Route path='/doctor/details/:id'>
                        <div>
                            <Details />
                        </div>
                    </Route>
                    <Route path='/profile'>
                        <div>
                            <UserProfile />
                        </div>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default DoctorDashboard;
