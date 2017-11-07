import React, { Component } from 'react'
import FontIcon from 'material-ui/FontIcon'

class PathResult extends Component {
  render() {
    return (
      <div style={styles.container} onClick={() => this.props.onClick()}>
        <FontIcon className="material-icons" style={styles.icon}>
          {this.props.selected ? 'done' : 'clear'}
        </FontIcon>
        <span
          style={
            this.props.selected ? styles.selectedLabel : styles.unSelectedLabel
          }
        >
          {this.props.name}
        </span>
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 400,
    cursor: 'pointer'
  },
  icon: {
    color: 'black',
    opacity: 0.54
  },
  selectedLabel: {
    marginTop: 5,
    color: 'black',
    opacity: 0.87
  },
  unSelectedLabel: {
    marginTop: 5,
    color: 'black',
    opacity: 0.54
  }
}

export { PathResult }
