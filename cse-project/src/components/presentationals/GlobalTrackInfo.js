import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { PaperForm } from './'

class GlobalTrackInfo extends Component {
  render() {
    console.log(this.props.track)
    if (this.props.track) {
      return (
        <PaperForm>
          <div style={styles.container}>
            <RaisedButton
              label="Download GPX"
              primary={true}
              style={{ marginRight: '15px' }}
            />
            <RaisedButton label="Open in Google Maps" primary={false} />
          </div>
        </PaperForm>
      )
    } else {
      return null
    }
  }
}

const styles = {
  container: {}
}

export { GlobalTrackInfo }
