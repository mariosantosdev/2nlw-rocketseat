import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { PrivateRoute, PublicRoute } from './components/Routes'

import Signin from './screens/Signin'
import Signup from './screens/Signup'
import NotFound from './screens/NotFound'
import Home from './screens/Home'
import Profile from './screens/Profile'

export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <PublicRoute path="/signin" component={Signin} restricted />
                <PublicRoute path="/signup" component={Signup} restricted />
                <PrivateRoute path="/" component={Home} exact />
                <PrivateRoute path="/profile/:id" component={Profile} exact />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}