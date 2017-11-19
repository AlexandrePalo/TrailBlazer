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

class Form extends Component {
  menuItemsPOI(values) {
    return this.props.pois.choices.map(name => (
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
    return this.props.tracks.choices.map(name => (
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
                  )
                }
                loading={this.props.beginLocation.loading}
                done={this.props.beginLocation.coords.length !== 0}
              />
            </div>
            <div style={{ marginLeft: '30px', display: 'flex', flex: 1 }} />
          </div>
          <div style={styles.inputContainer}>
            <div style={{ flex: 2, marginRight: '30px' }}>
              <SelectField
                fullWidth
                multiple={true}
                floatingLabelText="Types of POIs"
                value={this.props.pois.types}
                onChange={(e, i, values) => this.props.setPoisTypes(values)}
              >
                {this.menuItemsPOI.bind(this)(this.props.pois.types)}
              </SelectField>
            </div>
            <div style={{ flex: 3, marginRight: '20px', marginLeft: '30px' }}>
              {this.props.pois.types.length !== 0 && (
                <InputRange
                  draggableTrack
                  maxValue={this.props.pois.max}
                  minValue={this.props.pois.min}
                  onChange={value => this.props.setPoisRange(value)}
                  value={this.props.pois.selection}
                  formatLabel={value =>
                    value > 1 ? `${value} POIs` : `${value} POI`
                  }
                />
              )}
            </div>
          </div>
          <div style={styles.inputContainer}>
            <div style={{ flex: 2, marginRight: '30px' }}>
              <SelectField
                fullWidth
                multiple={true}
                floatingLabelText="Types of tracks"
                value={this.props.tracks.types}
                onChange={(e, i, values) => this.props.setTracksTypes(values)}
              >
                {this.menuItemsTrack.bind(this)(this.props.tracks.types)}
              </SelectField>
            </div>
            <div style={{ flex: 3, marginRight: '20px', marginLeft: '30px' }}>
              {this.props.tracks.types.length !== 0 && (
                <InputRange
                  draggableTrack
                  maxValue={this.props.tracks.max}
                  minValue={this.props.tracks.min}
                  onChange={value => this.props.setTracksRange(value)}
                  value={this.props.tracks.selection}
                  formatLabel={value =>
                    value > 1 ? `${value} tracks` : `${value} track`
                  }
                />
              )}
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
