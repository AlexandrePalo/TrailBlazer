//import { json as d3Json } from 'd3-request'

const show = id => ({ type: 'SHOW', payload: id })

const hide = id => ({ type: 'HIDE', payload: id })

const setCurrentTrack = id => ({ type: 'SET_CURRENT_TRACK', payload: id })

const setCurrentClosestPointIndexInCurrentTrack = index => ({
  type: 'SET_CURRENT_CLOSEST_POINT_INDEX_IN_CURRENT_TRACK',
  payload: index
})

const fetchTrack = () => ({
  type: 'FETCH_TRACK'
})
const receiveTrack = track => ({ type: 'RECEIVE_TRACK', payload: track })

const readJSONFileTrack = JSONFile => {
  return dispatch => {
    // Fetch something
    dispatch(fetchTrack())

    // Current fetch
    // no real fetch here because Webpack directly reads json ...
    const track = {
      name: JSONFile.titre,
      pois: [],
      points: JSONFile.xml_gpx.gpx.trk[0].trkseg[0].trkpt.map(trkpt => {
        return [+trkpt.$.lat, +trkpt.$.lon, +trkpt.ele[0]]
      })
    }
    dispatch(receiveTrack(track))
  }
}

export {
  show,
  hide,
  setCurrentTrack,
  setCurrentClosestPointIndexInCurrentTrack,
  readJSONFileTrack
}
