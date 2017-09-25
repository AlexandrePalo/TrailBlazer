import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import { SearchBar } from './'

class PaperForm extends Component {
  render() {
    return (
      <Paper zdepth={3} style={styles.paper}>
        <SearchBar />
      </Paper>
    )
  }
}

const styles = {
  paper: {
    padding: '10px'
  }
}

export { PaperForm }
