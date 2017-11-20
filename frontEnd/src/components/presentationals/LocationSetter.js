import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { PaperForm } from './'

class LocationSetter extends Component {
  render() {
    return (
      <PaperForm title="Location">
        <div style={styles.container}>
          <div>
            <span style={styles.label}>Latitude:</span>
            <span style={styles.coord}>{this.props.lat}°</span>
          </div>
          <div>
            <span style={styles.label}>Longitude:</span>
            <span style={styles.coord}>{this.props.lng}°</span>
          </div>
          <div style={styles.buttonContainer}>
            <div style={{ marginRight: '15px', marginLeft: '5px' }}>
              <RaisedButton
                label="Cancel"
                secondary
                onClick={() => this.props.onClickCancel()}
              />
            </div>
            <div style={{ marginLeft: '15px' }}>
              <RaisedButton
                label="Set"
                primary
                onClick={() => this.props.onClickSet()}
              />
            </div>
          </div>
        </div>
      </PaperForm>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    color: 'black',
    opacity: '0.54'
  },
  coord: {
    color: 'black',
    opacity: '0.87',
    marginLeft: '15px'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '15px'
  }
}
export { LocationSetter }
