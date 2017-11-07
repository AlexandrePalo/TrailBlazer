import React, { Component } from 'react'
import { PathResult } from './'

class PathSelector extends Component {
  state = {
    paths: [
      { id: 1, name: 'Sample path 1', selected: false },
      { id: 2, name: 'Sample path 2', selected: false },
      { id: 3, name: 'Sample path 3', selected: false }
    ]
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
      <div>
        {this.state.paths.map(p => (
          <PathResult
            key={p.id}
            name={p.name}
            selected={p.selected}
            onClick={() => this.selectDeselect(p.id)}
          />
        ))}
      </div>
    )
  }
}

export { PathSelector }
