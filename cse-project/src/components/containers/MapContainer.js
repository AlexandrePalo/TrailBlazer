import { MapContainer } from '../presentationals'
import { connect } from 'react-redux'
import {
  setCurrentTrack,
  setCurrentClosestPointIndexInCurrentTrack,
  setModeCurrent
} from '../../redux/actions'

const mapStateToProps = state => ({
  tracks: state.tracks.all,
  currentTrackId: state.tracks.currentTrackId,
  closestCurrentPointIndexInCurrentTrack:
    state.tracks.closestCurrentPointIndexInCurrentTrack,
  location: state.location.location,
  beginLocation: state.form.beginLocation
})
const mapDispatchToProps = dispatch => ({
  setModeCurrent: (coords, containerPoint) =>
    dispatch(setModeCurrent(coords, containerPoint)),
  setCurrentTrack: id => dispatch(setCurrentTrack(id)),
  setCurrentClosestPointIndexInCurrentTrack: index =>
    dispatch(setCurrentClosestPointIndexInCurrentTrack(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)
