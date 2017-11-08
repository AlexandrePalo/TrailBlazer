import { combineReducers } from 'redux'
import tracksReducer from './tracks'

export default combineReducers({
  tracks: tracksReducer
})
