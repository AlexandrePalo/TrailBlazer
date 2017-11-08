import React, { Component } from 'react'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import store from './redux/store'
import './App.css'
import { PaperForm } from './components/presentationals'
import MapContainer from './components/containers/MapContainer'
import TrackSelector from './components/containers/TrackSelector'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <div>
            <PaperForm>
              <TrackSelector />
            </PaperForm>
            <MapContainer />
          </div>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App
