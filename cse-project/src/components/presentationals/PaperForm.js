import React, { Component } from 'react'
import Paper from 'material-ui/Paper'

class PaperForm extends Component {
  render() {
    // zdepth=3 ?
    return <Paper style={styles.paper}>{this.props.children}</Paper>
  }
}

const styles = {
  paper: {
    padding: '10px'
  }
}

export { PaperForm }
