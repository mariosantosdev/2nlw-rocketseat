import { SET_USER } from '../actions/types.actions'

const initialState = {
    user: {
        id: null,
        name: null,
        lastname: null,
        email: null,
        favorites: null,
        avatar: null,
        whatsapp: null,
        bio: null
    }
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            }

        default:
            return state
    }
}

export default reducers