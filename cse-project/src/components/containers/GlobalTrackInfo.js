import { connect } from 'react-redux'
import { GlobalTrackInfo } from '../presentationals'

const mapStateToProps = state => {
  console.log(state)
  if (state.tracks.currentTrackId) {
    let track = {}
    state.tracks.all.forEach(t => {
      t.id === state.tracks.currentTrackId && (track = t)
    })
    return { track }
  }
  return {}
}

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(GlobalTrackInfo)
