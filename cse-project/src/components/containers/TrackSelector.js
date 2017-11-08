import { TrackSelector } from '../presentationals'
import { connect } from 'react-redux'
import { show, hide } from '../../redux/actions'

const mapStateToProps = state => ({
  tracks: state.tracks.all
})

const mapDispatchToProps = dispatch => ({
  show: id => dispatch(show(id)),
  hide: id => dispatch(hide(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(TrackSelector)
