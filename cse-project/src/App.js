import React, { Component } from 'react'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import store from './redux/store'
import './App.css'
import { PaperForm, SearchBar } from './components/presentationals'
import MapContainer from './components/containers/MapContainer'
import TrackSelector from './components/containers/TrackSelector'
import ElevationGraph from './components/containers/ElevationGraph'
import GlobalTrackInfo from './components/containers/GlobalTrackInfo'
import Form from './components/containers/Form'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <div>
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
            <MapContainer />
          </div>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

const styles = {
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

export default App
