import React, { Component } from 'react'
import Divider from 'material-ui/Divider'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import AutoComplete from 'material-ui/AutoComplete'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import CircularProgress from 'material-ui/CircularProgress'
import InputRange from 'react-input-range'
import './inputRange.css'
import { SearchBar, PaperForm, AutocompleteLocation } from './'

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
          <div style={{ ...styles.inputContainer, marginTop: '-10px' }}>
            <div style={{ marginRight: '30px', display: 'flex', flex: 1 }}>
              <AutocompleteLocation
                floatingLabelText="Begin location"
                dataSource={this.props.beginLocation.predictions.map(
                  d => d.description
                )}
                onUpdateInput={v => this.props.getBeginPredictions(v)}
                onNewRequest={(k, i) =>
                  this.props.getBeginPlaceDetails(
                    this.props.beginLocation.predictions[i].place_id
                  )}
                loading={this.props.beginLocation.loading}
                done={this.props.beginLocation.coords.length !== 0}
              />
            </div>
            <div style={{ marginLeft: '30px', display: 'flex', flex: 1 }}>
              <AutocompleteLocation
                floatingLabelText="End location (optional)"
                dataSource={this.props.endLocation.predictions.map(
                  d => d.description
                )}
                onUpdateInput={v => this.props.getEndPredictions(v)}
                onNewRequest={(k, i) =>
                  this.props.getEndPlaceDetails(
                    this.props.endLocation.predictions[i].place_id
                  )}
                loading={this.props.endLocation.loading}
                done={this.props.endLocation.coords.length !== 0}
              />
            </div>
          </div>
          <div style={styles.inputContainer}>
            <div style={{ flex: 2, marginRight: '30px' }}>
              <SelectField
                fullWidth
                multiple={true}
                floatingLabelText="Types of POIs"
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
                floatingLabelText="Types of tracks"
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
          <div style={styles.buttonContainer}>
            <div style={{ marginRight: '15px', marginLeft: '5px' }}>
              <RaisedButton label="Reset" secondary />
            </div>
            <div style={{ marginLeft: '15px' }}>
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
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  iconDone: {
    color: 'rgb(0, 188, 212)',
    opacity: 1
  }
}

export { Form }
