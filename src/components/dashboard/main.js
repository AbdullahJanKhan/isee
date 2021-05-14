import React from 'react';
import { Login, Register, PMDC } from '../login/index'
import UserDashboard from './UserDashboard'
import DoctorDashboard from './DoctorDashboard'
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom';

export default function Main() {
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
                                <Login />
                            </div>
                        </Route>
                        <Route path='/register'>
                            <div>
                                <Register />
                            </div>
                        </Route>
                        <Route path='/add_pmdcid'>
                            <div>
                                <PMDC />
                            </div>
                        </Route>
                        <Route path='/user'>
                            <div>
                                <UserDashboard />
                            </div>
                        </Route>
                        <Route path='/doctor'>
                            <div>
                                <DoctorDashboard />
                            </div>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    )
}