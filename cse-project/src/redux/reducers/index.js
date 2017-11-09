import { combineReducers } from 'redux'
import tracksReducer from './tracks'
import locationReducer from './location'

export default combineReducers({
  tracks: tracksReducer,
  location: locationReducer
})
