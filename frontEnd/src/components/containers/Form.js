import { connect } from 'react-redux'
import { Form } from '../presentationals'
import {
  getBeginPredictions,
  getBeginPlaceDetails,
  setSetModeOn,
  setSetModeCancel,
  setTracksState,
  setTracksValue,
  setPoisState,
  setPoisValue,
  setDistanceRange,
  resetForm,
  setBeginValidity,
  sendForm,
  setWelcomeMode
} from '../../redux/actions'

const mapStateToProps = state => ({
  beginLocation: state.form.beginLocation,
  tracks: state.form.tracks,
  pois: state.form.pois,
  distance: state.form.distance
})

const mapDispatchToProps = dispatch => ({
  setWelcomeMode: () => dispatch(setWelcomeMode()),
  getBeginPredictions: input => dispatch(getBeginPredictions(input)),
  getBeginPlaceDetails: placeId => dispatch(getBeginPlaceDetails(placeId)),
  setSetModeOn: () => dispatch(setSetModeOn()),
  setSetModeCancel: () => dispatch(setSetModeCancel()),
  setTracksState: checked => dispatch(setTracksState(checked)),
  setTracksValue: value => dispatch(setTracksValue(value)),
  setPoisState: checked => dispatch(setPoisState(checked)),
  setPoisValue: value => dispatch(setPoisValue(value)),
  setDistanceRange: range => dispatch(setDistanceRange(range)),
  resetForm: () => dispatch(resetForm()),
  setBeginValidity: validity => dispatch(setBeginValidity(validity)),
  sendForm: (beginCoords, distanceRange, poisWeight, tracksWeight) =>
    dispatch(sendForm(beginCoords, distanceRange, poisWeight, tracksWeight))
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)
