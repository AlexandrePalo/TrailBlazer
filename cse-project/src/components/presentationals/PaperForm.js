import React, { Component } from 'react'
import Paper from 'material-ui/Paper'

class PaperForm extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Paper style={styles.paper} zDepth={3}>
          <div style={styles.header}>
            <span style={styles.title}>{this.props.title}</span>
          </div>
          <div style={styles.body}>{this.props.children}</div>
        </Paper>
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '10px'
  },
  paper: {
    marginLeft: '10px',
    marginRight: '10px',
    zIndex: 3
  },
  header: {
    backgroundColor: 'rgb(232, 232, 232)',
    padding: '15px'
  },
  body: {
    padding: '10px'
  },
  title: {
    color: 'black',
    opacity: 0.4,
    fontSize: '14pt'
  }
}

export { PaperForm }
