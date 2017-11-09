import React, { Component } from 'react'
import Spinner from 'react-spinner-material'
import { TrackResult } from './'

class TrackSelector extends Component {
  componentDidMount() {
    this.props.readJSONFileTrack()
  }

  render() {
    if (this.props.loading) {
      return (
        <Spinner
          size={40}
          spinnerColor={'#333'}
          spinnerWidth={2}
          visible={true}
        />
      )
    }
    return (
      <div>
        {this.props.tracks.map(p => (
          <TrackResult
            key={p.id}
            name={p.name}
            color={p.color}
            displayed={p.displayed}
            onClick={() => {
              if (p.displayed) {
                this.props.hide(p.id)
              } else {
                this.props.show(p.id)
              }
            }}
            onSetLocation={() => this.props.setLocation(p.points[0])}
          />
        ))}
      </div>
    )
  }
}

export { TrackSelector }
