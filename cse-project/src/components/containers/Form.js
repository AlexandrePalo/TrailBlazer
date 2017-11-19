import { connect } from 'react-redux'
import { Form } from '../presentationals'
import {
  getBeginPredictions,
  getBeginPlaceDetails,
  setTracksTypes,
  setTracksValue,
  setPoisTypes,
  setPoisValue,
  setDistanceRange
} from '../../redux/actions'

const mapStateToProps = state => ({
  beginLocation: state.form.beginLocation,
  tracks: state.form.tracks,
  pois: state.form.pois,
  distance: state.form.distance
})

const mapDispatchToProps = dispatch => ({
  getBeginPredictions: input => dispatch(getBeginPredictions(input)),
  getBeginPlaceDetails: placeId => dispatch(getBeginPlaceDetails(placeId)),
  setTracksTypes: types => dispatch(setTracksTypes(types)),
  setTracksValue: value => dispatch(setTracksValue(value)),
  setPoisTypes: types => dispatch(setPoisTypes(types)),
  setPoisValue: value => dispatch(setPoisValue(value)),
  setDistanceRange: range => dispatch(setDistanceRange(range))
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)
