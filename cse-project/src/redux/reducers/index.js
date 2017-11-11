import { combineReducers } from 'redux'
import tracksReducer from './tracks'
import locationReducer from './location'
import formReducer from './form'

export default combineReducers({
  tracks: tracksReducer,
  location: locationReducer,
  form: formReducer
})
