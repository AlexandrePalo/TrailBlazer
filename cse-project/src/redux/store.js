import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'

export default createStore(rootReducer, applyMiddleware(createLogger()))
