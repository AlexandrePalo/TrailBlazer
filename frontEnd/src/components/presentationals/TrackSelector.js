import React, { Component } from 'react'
import Spinner from 'react-spinner-material'
import { TrackResult, PaperForm } from './'

class TrackSelector extends Component {
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
      <PaperForm
        title="Track selector"
        btn={{
          label: 'New request',
          onClick: () => this.props.setSettingsMode(),
          raised: true,
          primary: true
        }}
      >
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
            onSetLocation={() =>
              this.props.setLocationBeginTrack(
                [
                  p.points[0][0], // + 0.025, // shift to bottom
                  p.points[0][1] // + 0.1 // shift to left
                ],
                p.id
              )
            }
          />
        ))}
      </PaperForm>
    )
  }
}

export { TrackSelector }
