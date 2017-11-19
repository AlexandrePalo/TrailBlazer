import React, { Component } from 'react'
import AutoComplete from 'material-ui/AutoComplete'
import FontIcon from 'material-ui/FontIcon'
import CircularProgress from 'material-ui/CircularProgress'

class AutocompleteLocation extends Component {
  state = {
    locationIconHovered: false
  }

  renderIcon(loading, done) {
    if (loading) {
      return <CircularProgress size={20} thickness={3} />
    }

    if (done) {
      return (
        <FontIcon className="material-icons" style={styles.iconDone}>
          done
        </FontIcon>
      )
    }
    return (
      <FontIcon className="material-icons" style={styles.iconError}>
        clear
      </FontIcon>
    )
  }

  render() {
    const {
      floatingLabelText,
      dataSource,
      onUpdateInput,
      onNewRequest,
      loading,
      done,
      searchText
    } = this.props
    return (
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ flex: 1 }}>
          <AutoComplete
            searchText={searchText}
            floatingLabelText={floatingLabelText}
            fullWidth
            dataSource={dataSource}
            onUpdateInput={v => onUpdateInput(v)}
            onNewRequest={(k, i) => onNewRequest(k, i)}
          />
        </div>
        <div style={{ marginBottom: '3px', marginLeft: '5px' }}>
          <FontIcon
            className="material-icons"
            style={
              this.state.locationIconHovered || this.props.setMode
                ? styles.iconHovered
                : styles.iconError
            }
            onMouseOver={() => this.setState({ locationIconHovered: true })}
            onMouseOut={() => this.setState({ locationIconHovered: false })}
            onClick={() => this.props.onLocationClick()}
          >
            location_on
          </FontIcon>
          {this.renderIcon(loading, done)}
        </div>
      </div>
    )
  }
}

const styles = {
  iconDone: {
    color: 'rgb(0, 188, 212)',
    opacity: 1
  },
  iconError: {
    color: 'black',
    opacity: 0.54
  },
  iconHovered: {
    color: 'rgb(0, 188, 212)',
    opacity: 1,
    cursor: 'pointer'
  }
}

export { AutocompleteLocation }
