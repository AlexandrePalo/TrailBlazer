import React, { Component } from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import { PaperForm } from './'

class Loading extends Component {
  render() {
    return (
      <div style={styles.container}>
        <PaperForm title="Loading ...">
          <div style={styles.containerCircle}>
            <CircularProgress size={80} thickness={5} />
          </div>
        </PaperForm>
      </div>
    )
  }
}

const styles = {
  container: {},
  containerCircle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '50px',
    marginLeft: '50px',
    marginTop: '25px',
    marginBottom: '25px'
  }
}
export { Loading }
