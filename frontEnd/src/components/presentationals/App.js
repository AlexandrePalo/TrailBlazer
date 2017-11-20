import React, { Component } from 'react'
import './App.css'
import MapContainer from '../containers/MapContainer'
import TrackSelector from '../containers/TrackSelector'
import ElevationGraph from '../containers/ElevationGraph'
import GlobalTrackInfo from '../containers/GlobalTrackInfo'
import Welcome from '../containers/Welcome'
import Form from '../containers/Form'
import Loading from '../containers/Loading'
import { LocationSetter } from './'

class App extends Component {
  renderScene(mode) {
    if (mode === 'settings') {
      return (
        <div style={styles.formContainer}>
          <Form />
        </div>
      )
    }

    if (mode === 'loading') {
      return (
        <div style={styles.formContainer}>
          <Loading />
        </div>
      )
    }

    if (mode === 'displayResults') {
      return (
        <div>
          <div style={styles.papersContainer1}>
            <TrackSelector />
            <ElevationGraph width={800} height={200} padding={40} />
          </div>
          <div style={styles.papersContainer2}>
            <GlobalTrackInfo />
          </div>
        </div>
      )
    }

    if (mode === 'welcome') {
      return (
        <div style={styles.formContainer}>
          <Welcome />
        </div>
      )
    }
    /*
    <div style={styles.papersContainer1}>
      <Form />
    </div>
    <div style={styles.papersContainer1}>
      <TrackSelector />
      <ElevationGraph width={800} height={200} padding={40} />
    </div>
    <div style={styles.papersContainer2}>
      <GlobalTrackInfo />
    </div>
    */
  }

  renderLocationSetter() {
    if (this.props.beginLocation.setMode) {
      if (this.props.beginLocation.currentOnMap.position.length !== 0) {
        // When the location of the map is changed
        // doesn't need to set position to absolute and check position
        // just center it

        return (
          <div
            style={{
              position: 'relative',
              left: '55%',
              width: '300px'
            }}
          >
            <LocationSetter
              lat={this.props.beginLocation.currentOnMap.coords[0]}
              lng={this.props.beginLocation.currentOnMap.coords[1]}
              onClickSet={() =>
                this.props.setSetModeFinish(
                  this.props.beginLocation.currentOnMap.coords
                )
              }
              onClickCancel={() => this.props.setSetModeCancel()}
            />
          </div>
        )
      }
    }
  }

  render() {
    return (
      <div>
        {this.renderScene(this.props.mode)}
        {this.renderLocationSetter.bind(this)()}
        <MapContainer />
      </div>
    )
  }
}

const styles = {
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  papersContainer1: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginLeft: '50px'
  },
  papersContainer2: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    marginLeft: '50px'
  }
}

export { App }
