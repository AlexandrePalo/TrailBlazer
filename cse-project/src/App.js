import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './App.css'
import {
  MapContainer,
  PaperForm,
  PathSelector
} from './components/presentationals'

class App extends Component {
  state = {
    paths: [
      {
        id: 1,
        name: 'Sample path 1',
        color: 'red',
        selected: false,
        points: this.generateRandomPath(
          {
            lat: 51.505 + (Math.random() * 0.002 - 0.001),
            lng: -0.09 + (Math.random() * 0.002 - 0.001)
          },
          30
        )
      },
      {
        id: 2,
        name: 'Sample path 2',
        color: 'blue',
        selected: false,
        points: this.generateRandomPath(
          {
            lat: 51.505 + (Math.random() * 0.002 - 0.001),
            lng: -0.09 + (Math.random() * 0.002 - 0.001)
          },
          30
        )
      },
      {
        id: 3,
        name: 'Sample path 3',
        color: 'green',
        selected: false,
        points: this.generateRandomPath(
          {
            lat: 51.505 + (Math.random() * 0.002 - 0.001),
            lng: -0.09 + (Math.random() * 0.002 - 0.001)
          },
          30
        )
      }
    ]
  }

  generateRandomPath(position, nbPoints) {
    let path = [[position.lat, position.lng]]
    for (let i = 0; i < nbPoints; i++) {
      path.push([
        path[i][0] + (Math.random() * 0.0008 - 0.0004),
        path[i][1] + (Math.random() * 0.0008 - 0.0004)
      ])
    }
    return path
  }

  selectDeselect(id) {
    let newPaths = this.state.paths
    newPaths.forEach((p, i) => {
      if (p.id === id) {
        newPaths[i].selected = !newPaths[i].selected
      }
    })
    this.setState({ paths: newPaths })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <PaperForm>
            <PathSelector
              paths={this.state.paths}
              selectDeselect={id => this.selectDeselect(id)}
            />
          </PaperForm>
          <MapContainer paths={this.state.paths} />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
