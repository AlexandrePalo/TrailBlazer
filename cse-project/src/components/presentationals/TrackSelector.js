import React, { Component } from 'react'
import Spinner from 'react-spinner-material'
import { TrackResult, PaperForm } from './'
import sample1 from '../../example/sample1.json'
import sample2 from '../../example/sample2.json'
import sample3 from '../../example/sample3.json'

class TrackSelector extends Component {
  componentDidMount() {
    this.props.readJSONFileTrack(sample1)
    this.props.readJSONFileTrack(sample2)
    this.props.readJSONFileTrack(sample3)
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
      <PaperForm title="Track selector">
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
              this.props.setLocation([
                p.points[0][0] + 0.025, // shift to bottom
                p.points[0][1] + 0.1 // shift to left
              ])}
          />
        ))}
      </PaperForm>
    )
  }
}

export { TrackSelector }
