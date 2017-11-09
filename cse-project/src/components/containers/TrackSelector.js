import { TrackSelector } from '../presentationals'
import { connect } from 'react-redux'
import { show, hide, readJSONFileTrack } from '../../redux/actions'

const mapStateToProps = state => ({
  tracks: state.tracks.all,
  loading: state.tracks.loading
})

const mapDispatchToProps = dispatch => ({
  show: id => dispatch(show(id)),
  hide: id => dispatch(hide(id)),
  readJSONFileTrack: () => dispatch(readJSONFileTrack())
})

export default connect(mapStateToProps, mapDispatchToProps)(TrackSelector)
