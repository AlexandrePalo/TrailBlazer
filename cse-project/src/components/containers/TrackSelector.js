import { TrackSelector } from '../presentationals'
import { connect } from 'react-redux'
import {
  show,
  hide,
  readJSONFileTrack,
  setLocationBeginTrack
} from '../../redux/actions'

const mapStateToProps = state => ({
  tracks: state.tracks.all,
  loading: state.tracks.loading
})

const mapDispatchToProps = dispatch => ({
  show: id => dispatch(show(id)),
  hide: id => dispatch(hide(id)),
  readJSONFileTrack: JSONFile => dispatch(readJSONFileTrack(JSONFile)),
  setLocationBeginTrack: (location, id) =>
    dispatch(setLocationBeginTrack(location, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(TrackSelector)
