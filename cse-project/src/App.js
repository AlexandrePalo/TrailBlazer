import React, { Component } from 'react'
import './App.css'
import { MapContainer, SearchBar } from './components/presentationals'

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="formContainer">
          <SearchBar />
        </div>
        <MapContainer />
      </div>
    )
  }
}

export default App
