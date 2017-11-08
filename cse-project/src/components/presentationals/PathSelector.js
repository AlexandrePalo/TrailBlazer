import React, { Component } from 'react'
import { PathResult } from './'

class PathSelector extends Component {
  render() {
    return (
      <div>
        {this.props.paths.map(p => (
          <PathResult
            key={p.id}
            name={p.name}
            selected={p.selected}
            onClick={() => this.props.selectDeselect(p.id)}
          />
        ))}
      </div>
    )
  }
}

export { PathSelector }
