import React, { Component } from 'react'
import { TrackResult } from './'

class TrackSelector extends Component {
  render() {
    return (
      <div>
        {this.props.tracks.map(p => (
          <TrackResult
            key={p.id}
            name={p.name}
            displayed={p.displayed}
            onClick={() => {
              if (p.displayed) {
                this.props.hide(p.id)
              } else {
                this.props.show(p.id)
              }
            }}
          />
        ))}
      </div>
    )
  }
}

export { TrackSelector }
