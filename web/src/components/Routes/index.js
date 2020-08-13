import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { IsLogin } from '../../services/auth'

export const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            IsLogin() && restricted ?
                <Redirect to="/" />
            : <Component {...props} />
        )} />
    )
}

export const PrivateRoute = ({component: Component, ...rest}) => {
    return (

        <Route {...rest} render={props => (
            IsLogin() ?
                <Component {...props} />
            : <Redirect to="/signin" />
        )} />
    )
}