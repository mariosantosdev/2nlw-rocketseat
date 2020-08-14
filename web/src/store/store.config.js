import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducers from './reducers/'

export default createStore(rootReducers, compose(applyMiddleware(thunk)))