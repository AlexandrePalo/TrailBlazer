import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'

class MapContainer extends Component {
  state = {
    zoom: 16
  }

  render() {
    const position = [51.505, -0.09]

    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {this.props.tracks.map((p, i) => {
          if (p.selected) {
            return (
              <div key={i}>
                <Marker position={p.points[0]}>
                  <Popup>
                    <span>{p.name}</span>
                  </Popup>
                </Marker>
                <Polyline color={p.color} positions={p.points} />
              </div>
            )
          }
        })}
      </Map>
    )
  }
}

export { MapContainer }
