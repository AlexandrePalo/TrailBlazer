import { MapContainer } from '../presentationals'
import { connect } from 'react-redux'
import {
  setCurrentTrack,
  setCurrentClosestPointIndexInCurrentTrack
} from '../../redux/actions'

const mapStateToProps = state => ({
  tracks: state.tracks.all,
  currentTrackId: state.tracks.currentTrackId
})
const mapDispatchToProps = dispatch => ({
  setCurrentTrack: id => dispatch(setCurrentTrack(id)),
  setCurrentClosestPointIndexInCurrentTrack: index =>
    dispatch(setCurrentClosestPointIndexInCurrentTrack(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)
