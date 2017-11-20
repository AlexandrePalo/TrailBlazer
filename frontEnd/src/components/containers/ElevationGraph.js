import { ElevationGraph } from '../presentationals'
import { connect } from 'react-redux'
import { setCurrentClosestPointIndexInCurrentTrack } from '../../redux/actions'

const mapStateToProps = state => {
  if (state.tracks.currentTrackId) {
    let track = {}
    state.tracks.all.forEach(t => {
      t.id === state.tracks.currentTrackId && (track = t)
    })
    return {
      track,
      currentIndex: state.tracks.closestCurrentPointIndexInCurrentTrack
    }
  }
  return {}
}

const mapDispatchToProps = dispatch => ({
  setCurrentClosestPointIndexInCurrentTrack: index =>
    dispatch(setCurrentClosestPointIndexInCurrentTrack(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(ElevationGraph)
