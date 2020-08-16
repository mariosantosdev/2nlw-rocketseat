import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducers from './reducers/'

const storeConfig = () => {
    return createStore(rootReducers, compose(applyMiddleware(thunk)))
}

export default storeConfig