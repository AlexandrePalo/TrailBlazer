import { connect } from 'react-redux'
import { GlobalTrackInfo } from '../presentationals'
import { downloadGPX } from '../../redux/actions'

const mapStateToProps = state => {
  let track = undefined
  if (state.tracks.currentTrackId) {
    state.tracks.all.forEach(t => {
      t.id === state.tracks.currentTrackId && (track = t)
    })
  }

  return {
    track: track ? { ...track } : undefined,
    gpx: state.tracks.currentTrackGPX
  }
}

const mapDispatchToProps = dispatch => ({
  downloadGPX: track => dispatch(downloadGPX(track))
})

export default connect(mapStateToProps, mapDispatchToProps)(GlobalTrackInfo)
