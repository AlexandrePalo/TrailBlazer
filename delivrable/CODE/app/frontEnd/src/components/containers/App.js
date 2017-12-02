import { connect } from 'react-redux'
import { App } from '../presentationals'
import { setSetModeCancel, setSetModeFinish } from '../../redux/actions'

const mapStateToProps = state => ({
  mode: state.global.mode,
  beginLocation: state.form.beginLocation
})

const mapDispatchToProps = dispatch => ({
  setSetModeFinish: coords => dispatch(setSetModeFinish(coords)),
  setSetModeCancel: () => dispatch(setSetModeCancel())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
