import { SET_USER } from './types.actions'

export const SetUser = user => {
    return {
        type: SET_USER,
        payload: user
    }
}