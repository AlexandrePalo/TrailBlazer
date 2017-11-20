import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import fileDownload from 'js-file-download'
import { gpxGen } from '../../utils'
import { PaperForm } from './'

class GlobalTrackInfo extends Component {
  handleDownloadGPXClick = () => {
    this.props.downloadGPX(this.props.track)
  }

  render() {
    if (this.props.track) {
      return (
        <PaperForm title="Toolbox">
          <div style={styles.container}>
            <RaisedButton
              label={this.props.gpx.loading ? 'Loading ...' : 'Download GPX'}
              disabled={this.props.gpx.loading}
              primary={true}
              style={{ marginRight: '15px' }}
              labelStyle={
                this.props.gpx.loading
                  ? {
                      paddingRight: '32px',
                      paddingLeft: '32px'
                    }
                  : {}
              }
              onClick={() => this.handleDownloadGPXClick.bind(this)()}
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
