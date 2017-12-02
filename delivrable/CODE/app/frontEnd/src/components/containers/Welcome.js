import { connect } from 'react-redux'
import { Welcome } from '../presentationals'
import { setSettingsMode } from '../../redux/actions'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  setSettingsMode: () => dispatch(setSettingsMode())
})

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
