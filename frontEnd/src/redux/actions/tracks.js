//import { json as d3Json } from 'd3-request'
import fileDownload from 'js-file-download'
import { setLocation } from './'
import { gpxGen } from '../../utils'

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

const setLocationBeginTrack = (coords, id) => {
  return dispatch => {
    dispatch(show(id))
    dispatch(setLocation(coords))
  }
}

const GPXFetched = () => ({ type: 'GPX_FETCHED' })

const GPXGenerated = str => ({
  type: 'GPX_GENERATED',
  payload: str
})

const downloadGPX = track => {
  return dispatch => {
    // Loading state
    dispatch(GPXFetched())

    // Generate GPX
    const gpxString = gpxGen(track.name, track.name, track.points)

    // End of generation
    dispatch(GPXGenerated(gpxString))

    // Trigger download
    fileDownload(gpxString, 'trailBlazerFile.gpx')
  }
}

export {
  show,
  hide,
  setCurrentTrack,
  setCurrentClosestPointIndexInCurrentTrack,
  readJSONFileTrack,
  setLocationBeginTrack,
  downloadGPX
}
