import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './App.css'
import {
  MapContainer,
  PaperForm,
  SearchBar
} from './components/presentationals'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="app">
          <div className="formContainer">
            <PaperForm>
              <SearchBar />
            </PaperForm>
          </div>
          <MapContainer />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
