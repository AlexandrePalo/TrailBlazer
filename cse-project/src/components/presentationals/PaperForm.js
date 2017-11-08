import React, { Component } from 'react'
import Paper from 'material-ui/Paper'

class PaperForm extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Paper style={styles.paper}>{this.props.children}</Paper>
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '10px'
  },
  paper: {
    marginLeft: '10px',
    marginRight: '10px',
    padding: '10px',
    zIndex: 3
  }
}

export { PaperForm }
