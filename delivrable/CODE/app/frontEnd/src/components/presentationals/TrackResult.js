import React, { Component } from 'react'
import FontIcon from 'material-ui/FontIcon'

class TrackResult extends Component {
  render() {
    return (
      <div style={styles.container}>
        <FontIcon
          className="material-icons"
          style={{
            ...styles.icon,
            color: this.props.color,
            opacity: this.props.displayed ? 0.87 : 0.54
          }}
          onClick={() => this.props.onClick()}
        >
          {this.props.displayed ? 'done' : 'clear'}
        </FontIcon>
        <span
          onClick={() => this.props.onClick()}
          style={{
            ...styles.label,
            color: this.props.color,
            opacity: this.props.displayed ? 0.87 : 0.54
          }}
        >
          {this.props.name}
        </span>
        <FontIcon
          className="material-icons"
          style={{
            ...styles.icon,
            color: this.props.color,
            opacity: this.props.displayed ? 0.87 : 0.54
          }}
          onClick={() => this.props.onSetLocation()}
        >
          location_searching
        </FontIcon>
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 400,
    cursor: 'pointer'
  },
  icon: {
    color: 'black',
    opacity: 0.54
  },
  label: {
    marginTop: 5,
    color: 'black',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    khtmlUserSelect: 'none',
    msUserSelect: 'none',
    fontWeight: 500
  }
}

export { TrackResult }
