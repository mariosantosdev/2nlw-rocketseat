import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { PrivateRoute, PublicRoute } from './components/Routes'

import Signin from './screens/Signin'
import Signup from './screens/Signup'
import NotFound from './screens/NotFound'
import Home from './screens/Home'

export default () => {
    return (
        <BrowserRouter>
            <PublicRoute path="/signin" component={Signin} restricted />
            <PublicRoute path="/signup" component={Signup} restricted />
            <PrivateRoute path="/" component={Home} exact />
            <Route path="*" component={NotFound} />
        </BrowserRouter>
    )
}