import { connect } from 'react-redux'
import { Loading } from '../presentationals'
import { cancelBackendRequest } from '../../redux/actions'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  cancelBackendRequest: () => dispatch(cancelBackendRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(Loading)
