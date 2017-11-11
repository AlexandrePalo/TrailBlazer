import React, { Component } from 'react'
import Divider from 'material-ui/Divider'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import AutoComplete from 'material-ui/AutoComplete'
import RaisedButton from 'material-ui/RaisedButton'
import InputRange from 'react-input-range'
import './inputRange.css'
import { SearchBar, PaperForm } from './'

const poiTypes = ['Geocaching', 'Google Maps']
const trackTypes = ['Utagawa', 'Other']

class Form extends Component {
  state = {
    poiTypes: [],
    trackTypes: [],
    pois: { min: 0, max: 10 },
    tracks: { min: 0, max: 10 }
  }

  menuItemsPOI(values) {
    return poiTypes.map(name => (
      <MenuItem
        key={name}
        insetChildren={true}
        checked={values && values.indexOf(name) > -1}
        value={name}
        primaryText={name}
      />
    ))
  }
  menuItemsTrack(values) {
    return trackTypes.map(name => (
      <MenuItem
        key={name}
        insetChildren={true}
        checked={values && values.indexOf(name) > -1}
        value={name}
        primaryText={name}
      />
    ))
  }

  render() {
    return (
      <div style={{ width: '80%' }}>
        <PaperForm title="Settings">
          <div style={styles.inputContainer}>
            <div style={{ flex: 1, marginRight: '30px' }}>
              <AutoComplete
                hintText="Begin location"
                fullWidth
                dataSource={this.props.beginLocation.predictions.map(
                  d => d.description
                )}
                onUpdateInput={v => this.props.getBeginPredictions(v)}
                onNewRequest={(k, i) =>
                  this.props.getBeginPlaceDetails(
                    this.props.beginLocation.predictions[i].place_id
                  )}
              />
            </div>
            <div style={{ flex: 1, marginLeft: '30px' }}>
              <AutoComplete
                hintText="End location"
                fullWidth
                dataSource={this.props.endLocation.predictions.map(
                  d => d.description
                )}
                onUpdateInput={v => this.props.getEndPredictions(v)}
                onNewRequest={(k, i) =>
                  this.props.getEndPlaceDetails(
                    this.props.endLocation.predictions[i].place_id
                  )}
              />
            </div>
          </div>
          <div style={styles.inputContainer}>
            <div style={{ flex: 2, marginRight: '30px' }}>
              <SelectField
                fullWidth
                multiple={true}
                hintText="Select types of POIs"
                value={this.state.poiTypes}
                onChange={(e, i, values) => this.setState({ poiTypes: values })}
              >
                {this.menuItemsPOI(this.state.poiTypes)}
              </SelectField>
            </div>
            <div style={{ flex: 3, marginRight: '10px', marginLeft: '30px' }}>
              <InputRange
                draggableTrack
                maxValue={20}
                minValue={0}
                onChange={value => this.setState({ pois: value })}
                onChangeComplete={value => console.log(value)}
                value={this.state.pois}
                formatLabel={value =>
                  value > 1 ? `${value} POIs` : `${value} POI`}
              />
            </div>
          </div>
          <div style={styles.inputContainer}>
            <div style={{ flex: 2, marginRight: '30px' }}>
              <SelectField
                fullWidth
                multiple={true}
                hintText="Select types of tracks"
                value={this.state.trackTypes}
                onChange={(e, i, values) =>
                  this.setState({ trackTypes: values })}
              >
                {this.menuItemsTrack(this.state.trackTypes)}
              </SelectField>
            </div>
            <div style={{ flex: 3, marginRight: '10px', marginLeft: '30px' }}>
              <InputRange
                draggableTrack
                maxValue={100}
                minValue={0}
                onChange={value => this.setState({ tracks: value })}
                onChangeComplete={value => console.log(value)}
                value={this.state.tracks}
                formatLabel={value =>
                  value > 1 ? `${value} tracks` : `${value} track`}
              />
            </div>
          </div>
          <div style={styles.buttonRightContainer}>
            <div style={{ marginRight: '30px' }}>
              <RaisedButton label="Reset" secondary />
            </div>
            <div style={{ marginLeft: '30px', marginRight: '5px' }}>
              <RaisedButton label="Submit" primary />
            </div>
          </div>
        </PaperForm>
      </div>
    )
  }
}

const styles = {
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '20px',
    marginBottom: '20px',
    marginRight: '5px',
    marginLeft: '5px'
  },
  buttonRightContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  inputLabel: {
    marginRight: '5px',
    marginTop: '3px',
    color: 'black',
    opacity: 0.54
  }
}

export { Form }
