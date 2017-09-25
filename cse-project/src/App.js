import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './App.css'
import { MapContainer, PaperForm } from './components/presentationals'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="app">
          <div className="formContainer">
            <PaperForm />
          </div>
          <MapContainer />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
