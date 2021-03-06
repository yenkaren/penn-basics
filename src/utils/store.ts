import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import rootReducer from '../frontend/reducers/index'

export const initStore = (initialState = {}) => createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(thunkMiddleware))
  )
