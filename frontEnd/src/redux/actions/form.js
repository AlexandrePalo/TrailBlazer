import axios from 'axios'
import roundTo from 'round-to'
import { setLoadingMode, setDisplayResultsMode } from './global'
import { encodeDataUrl, distanceHeversine, distanceVincenty } from '../../utils'

// BackEnd Django url
const baseUrl = 'http://localhost:8000'

const google = window.google
const AutoCompleteGoogleService = new google.maps.places.AutocompleteService()
const PlacesGoogleService = new google.maps.places.PlacesService(
  document.createElement('div')
)

const setBeginText = text => ({ type: 'SET_BEGIN_TEXT', payload: text })
const fetchBeginPredictions = () => ({ type: 'FETCH_BEGIN_PREDICTIONS' })
const receiveBeginPredictions = places => ({
  type: 'RECEIVE_BEGIN_PREDICTIONS',
  payload: places
})
const getBeginPredictions = input => {
  return dispatch => {
    // Update text
    dispatch(setBeginText(input))

    // Loading state
    dispatch(fetchBeginPredictions())

    // Fetch Google Place API
    input
      ? AutoCompleteGoogleService.getQueryPredictions({ input }, results =>
          dispatch(receiveBeginPredictions(results ? results : []))
        )
      : dispatch(receiveBeginPredictions([]))
  }
}
const fetchBeginDetails = () => ({ type: 'FETCH_BEGIN_DETAILS' })
const receiveBeginDetails = coords => ({
  type: 'RECEIVE_BEGIN_DETAILS',
  payload: coords
})
const getBeginPlaceDetails = placeId => {
  return dispatch => {
    // Loading state
    dispatch(fetchBeginDetails())

    // Fetch Google Place API for details
    PlacesGoogleService.getDetails({ placeId }, result =>
      dispatch(
        receiveBeginDetails([
          result.geometry.location.lat(),
          result.geometry.location.lng()
        ])
      )
    )
  }
}
const setSetModeOn = () => ({ type: 'SET_SET_MODE_ON' })
const setSetModeFinish = coords => ({
  type: 'SET_SET_MODE_FINISH',
  payload: coords
})
const setSetModeCancel = () => ({ type: 'SET_SET_MODE_CANCEL' })
const setModeCurrent = (coords, containerPoint) => ({
  type: 'SET_MODE_CURRENT',
  payload: {
    coords,
    containerPoint
  }
})

const setPoisState = checked => ({ type: 'SET_POIS_STATE', payload: checked })
const setPoisValue = value => ({ type: 'SET_POIS_VALUE', payload: value })
const setTracksState = checked => ({
  type: 'SET_TRACKS_STATE',
  payload: checked
})
const setTracksValue = value => ({ type: 'SET_TRACKS_VALUE', payload: value })

const setDistanceRange = range => ({
  type: 'SET_DISTANCE_RANGE',
  payload: range
})

const resetForm = () => ({ type: 'RESET_FORM' })

const setBeginValidity = validity => ({
  type: 'SET_BEGIN_VALIDITY',
  payload: validity
})

const receiveBackendResult = result => ({
  type: 'RECEIVE_BACKEND_RESULT',
  payload: result
})

const sendForm = (beginCoords, distanceRange, poisWeight, tracksWeight) => {
  return dispatch => {
    // Global Loading
    dispatch(setLoadingMode())

    // Fetch a request from server
    const url =
      baseUrl +
      '/trailapp/' +
      encodeDataUrl({
        beginLat: beginCoords[0],
        beginLng: beginCoords[1],
        distanceMin: distanceRange.min * 1000,
        distanceMax: distanceRange.max * 1000,
        poisWeight,
        tracksWeight
      })

    console.log(url)

    axios
      .get(url)
      .then(function(response) {
        let dataList = response.data
        dataList.forEach((data, index) => {
          data = data.geometry.coordinates
          // Process some information
          const dataDistTemp = data.map((d, i) => {
            if (i >= 1) {
              return distanceVincenty(d, data[i - 1])
            } else {
              return 0
            }
          })
          const dataDist = dataDistTemp.map((d, i) => {
            if (i >= 1) {
              return dataDistTemp.slice(0, i + 1).reduce((a, b) => a + b)
            }
            return 0
          })

          // Lat Lng Ele Dist POIw TrackW
          const dataFull = data.map((d, i) => [
            d[0],
            d[1],
            null,
            dataDist[i],
            d[3],
            d[2]
          ])
          data = data.map((d, i) => [d[0], d[1]])

          dispatch(
            receiveBackendResult({
              name: 'Solution from algorithm',
              points: data,
              pointsFull: dataFull,
              pois: []
            })
          )
        })

        dispatch(setDisplayResultsMode())
      })
      .catch(function(error) {
        dispatch(cancelBackendRequest())
      })
  }
}

const cancelBackendRequest = () => ({ type: 'CANCEL_BACKEND_REQUEST' })

export {
  getBeginPredictions,
  getBeginPlaceDetails,
  setSetModeOn,
  setSetModeFinish,
  setSetModeCancel,
  setModeCurrent,
  setPoisState,
  setPoisValue,
  setTracksState,
  setTracksValue,
  setDistanceRange,
  resetForm,
  setBeginValidity,
  sendForm,
  cancelBackendRequest
}
