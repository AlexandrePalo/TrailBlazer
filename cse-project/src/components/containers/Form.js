import { connect } from 'react-redux'
import { Form } from '../presentationals'
import {
  getBeginPredictions,
  getBeginPlaceDetails,
  getEndPredictions,
  getEndPlaceDetails,
  setTracksTypes,
  setTracksRange,
  setPoisTypes,
  setPoisRange
} from '../../redux/actions'

const mapStateToProps = state => ({
  beginLocation: state.form.beginLocation,
  endLocation: state.form.endLocation,
  tracks: state.form.tracks,
  pois: state.form.pois
})

const mapDispatchToProps = dispatch => ({
  getBeginPredictions: input => dispatch(getBeginPredictions(input)),
  getBeginPlaceDetails: placeId => dispatch(getBeginPlaceDetails(placeId)),
  getEndPredictions: input => dispatch(getEndPredictions(input)),
  getEndPlaceDetails: placeId => dispatch(getEndPlaceDetails(placeId)),
  setTracksTypes: types => dispatch(setTracksTypes(types)),
  setTracksRange: range => dispatch(setTracksRange(range)),
  setPoisTypes: types => dispatch(setPoisTypes(types)),
  setPoisRange: range => dispatch(setPoisRange(range))
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)
