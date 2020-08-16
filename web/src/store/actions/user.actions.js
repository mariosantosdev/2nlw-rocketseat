import { SET_USER } from './types.actions'

export const login = user => {
    return {
        type: SET_USER,
        payload: user
    }
}

export const SetUser = user => {
    return dispatch => {
        localStorage.setItem('user', JSON.stringify(user))
        dispatch(login(user))
    }
}