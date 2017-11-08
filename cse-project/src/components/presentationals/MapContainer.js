import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import { closestPointIndexInList } from '../../utils'

class MapContainer extends Component {
  state = {
    zoom: 16
  }

  handlePolylineMouseOver = (track, lat, lng) => {
    if (this.props.currentTrackId !== track.id) {
      this.props.setCurrentTrack(track.id)
    }
    this.props.setCurrentClosestPointIndexInCurrentTrack(
      closestPointIndexInList([lat, lng], track.points)
    )
  }

  render() {
    const position = [51.505, -0.09]

    return (
      <Map center={position} zoom={this.state.zoom} ref="map">
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {this.props.tracks.map((p, i) => {
          if (p.displayed) {
            return (
              <div key={i}>
                <Marker position={p.points[0]}>
                  <Popup>
                    <span style={styles.startUpTitle}>{p.name}</span>
                  </Popup>
                </Marker>
                {p.pois.map((poi, j) => (
                  <Marker
                    position={poi.coords}
                    title={poi.name}
                    opacity={0.5}
                    key={poi.id}
                    className="class"
                  >
                    <Popup>
                      <span>
                        <span style={styles.POIPopupTitle}>
                          {poi.name}
                        </span>{' '}
                        <br />
                        <span style={styles.POIPopupDescription}>
                          {poi.description}
                        </span>
                      </span>
                    </Popup>
                  </Marker>
                ))}
                <Polyline
                  onMouseOver={e =>
                    this.handlePolylineMouseOver(p, e.latlng.lat, e.latlng.lng)}
                  color={p.color}
                  positions={p.points}
                />
              </div>
            )
          }
        })}
      </Map>
    )
  }
}

const styles = {
  startUpTitle: {
    color: 'black',
    opacity: 0.87,
    size: '14pt',
    fontWeight: 'bold'
  },
  POIPopupTitle: {
    color: 'black',
    opacity: 0.87,
    size: '14pt',
    fontWeight: 'bold'
  },
  POIPopupDescription: {
    color: 'black',
    opacity: 0.54,
    size: '12pt'
  }
}

export { MapContainer }
