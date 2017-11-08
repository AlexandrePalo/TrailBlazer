import { MapContainer } from '../presentationals'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  tracks: state.tracks
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, null)(MapContainer)
