import { connect } from 'react-redux'
import { Form } from '../presentationals'
import {
  getBeginPredictions,
  getBeginPlaceDetails,
  setSetModeOn,
  setSetModeCancel,
  setTracksTypes,
  setTracksValue,
  setPoisTypes,
  setPoisValue,
  setDistanceRange,
  resetForm,
  setBeginValidity
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
  setSetModeOn: () => dispatch(setSetModeOn()),
  setSetModeCancel: () => dispatch(setSetModeCancel()),
  setTracksTypes: types => dispatch(setTracksTypes(types)),
  setTracksValue: value => dispatch(setTracksValue(value)),
  setPoisTypes: types => dispatch(setPoisTypes(types)),
  setPoisValue: value => dispatch(setPoisValue(value)),
  setDistanceRange: range => dispatch(setDistanceRange(range)),
  resetForm: () => dispatch(resetForm()),
  setBeginValidity: validity => dispatch(setBeginValidity(validity))
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)
