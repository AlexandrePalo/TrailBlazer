import React, { Component } from 'react'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import store from '../../redux/store'
import './App.css'
import { PaperForm, SearchBar } from './'
import MapContainer from '../containers/MapContainer'
import TrackSelector from '../containers/TrackSelector'
import ElevationGraph from '../containers/ElevationGraph'
import GlobalTrackInfo from '../containers/GlobalTrackInfo'
import Form from '../containers/Form'

class App extends Component {
  renderScene(mode) {
    if (mode === 'settings') {
      return (
        <div style={styles.formContainer}>
          <Form />
        </div>
      )
    }
    /*
    <div style={styles.papersContainer1}>
      <Form />
    </div>
    <div style={styles.papersContainer1}>
      <TrackSelector />
      <ElevationGraph width={800} height={200} padding={40} />
    </div>
    <div style={styles.papersContainer2}>
      <GlobalTrackInfo />
    </div>
    */
  }

  render() {
    return (
      <div>
        {this.renderScene(this.props.mode)}
        <MapContainer />
      </div>
    )
  }
}

const styles = {
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  papersContainer1: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginLeft: '50px'
  },
  papersContainer2: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    marginLeft: '50px'
  }
}

export { App }
