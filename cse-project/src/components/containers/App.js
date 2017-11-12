import { connect } from 'react-redux'
import { App } from '../presentationals'

const mapStateToProps = state => ({
  mode: state.global.mode
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(App)
