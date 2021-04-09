import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AdminLogin from './components/auth/AdminLogin'
import UserLogin from './user/component/auth/UserLogin'
import Register from './user/component/auth/Register'
import Content from './components/layout/Content'
import Body from './user/component/layout/Body'

// import Sidebar from "./components/layout/Sidebar";
import UserRegistration from './components/users/UserRegistration'
import EditUserRegistered from './components/users/EditUserRegistered'
import RegisteredUsers from './components/users/RegisteredUsers'

import Alert from './components/layout/Alert'
import AlertUser from './user/component/layout/Alerts'
import PrivateRoute from './components/routing/PrivateRoute'

import AuthState from './context/auth/AuthState'
import AuthUserState from './user/context/auth/AuthState'
import UserState from './context/user/UserState'
import AlertState from './context/alert/AlertState'
import AlertUserState from './user/context/alert/AlertState'
import Paypal from './user/utils/Paypal'
// import setAuthToken from './utils/setAuthToken';

import './App.scss'
import UserReadings from './pages/UserReadings'

// if(localStorage.token) {
//   setAuthToken(localStorage.token);
// }

const App = () => {
    return (
        <AuthState>
            <AuthUserState>
                <UserState>
                    <AlertState>
                        <AlertUserState>
                            <Router>
                                <Fragment>
                                    <div className='container'>
                                        <Alert />
                                        <AlertUser />
                                    </div>
                                    <Switch>
                                        <PrivateRoute
                                            exact
                                            path='/UserRegistration'
                                            component={RegisteredUsers}
                                        />
                                        <PrivateRoute
                                            exact
                                            path='/UserRegistration/create'
                                            component={UserRegistration}
                                        />
                                        <PrivateRoute
                                            exact
                                            path='/UserRegistration/edit'
                                            component={EditUserRegistered}
                                        />
                                        <PrivateRoute
                                            exact
                                            path='/user/pay'
                                            component={Paypal}
                                        />
                                        <Route
                                            exact
                                            path='/:name/readings'
                                            component={UserReadings}
                                        />
                                        <Route
                                            exact
                                            path='/admin'
                                            component={AdminLogin}
                                        />

                                        <Route
                                            exact
                                            path='/user'
                                            component={UserLogin}
                                        />

                                        <PrivateRoute
                                            exact
                                            path='/body/register'
                                            component={Register}
                                        />

                                        <PrivateRoute
                                            exact
                                            path='/body'
                                            component={Body}
                                        />

                                        <PrivateRoute
                                            exact
                                            path='/'
                                            component={Content}
                                        />
                                    </Switch>

                                    {/* <UserRegistration /> */}
                                    {/* <Switch>
          <Route exact path='UserRegistration' component={UserRegistration} />
        </Switch> */}
                                </Fragment>
                            </Router>
                        </AlertUserState>
                    </AlertState>
                </UserState>
            </AuthUserState>
        </AuthState>
    )
}

export default App
