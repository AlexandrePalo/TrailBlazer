import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

class PaperForm extends Component {
  renderBtn() {
    if (this.props.btn) {
      if (this.props.btn.raised) {
        return (
          <RaisedButton
            label={this.props.btn.label}
            onClick={() => this.props.btn.onClick()}
            primary={this.props.btn.primary}
          />
        )
      } else {
        return (
          <FlatButton
            label={this.props.btn.label}
            onClick={() => this.props.btn.onClick()}
          />
        )
      }
    }
  }
  render() {
    return (
      <div style={styles.container}>
        <Paper style={styles.paper} zDepth={3}>
          <div style={styles.header}>
            <span style={styles.title}>{this.props.title}</span>
            {this.renderBtn.bind(this)()}
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
    padding: '15px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
