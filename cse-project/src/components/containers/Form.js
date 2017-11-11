import { connect } from 'react-redux'
import { Form } from '../presentationals'
import {
  getBeginPredictions,
  getBeginPlaceDetails,
  getEndPredictions,
  getEndPlaceDetails
} from '../../redux/actions'

const mapStateToProps = state => ({
  beginLocation: state.form.beginLocation,
  endLocation: state.form.endLocation
})

const mapDispatchToProps = dispatch => ({
  getBeginPredictions: input => dispatch(getBeginPredictions(input)),
  getBeginPlaceDetails: placeId => dispatch(getBeginPlaceDetails(placeId)),
  getEndPredictions: input => dispatch(getEndPredictions(input)),
  getEndPlaceDetails: placeId => dispatch(getEndPlaceDetails(placeId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)
