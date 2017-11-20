import delay from 'delay'
import { setLoadingMode, setDisplayResultsMode } from './global'
import { encodeDataUrl } from '../../utils'

// Will probably be localhost, on a different port for Django backend
const baseUrl = 'http://www.alexandrepalo.com' // TODO: define an url

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

const setPoisTypes = types => ({ type: 'SET_POIS_TYPES', payload: types })
const setPoisValue = value => ({ type: 'SET_POIS_VALUE', payload: value })
const setTracksTypes = types => ({ type: 'SET_TRACKS_TYPES', payload: types })
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

const sendForm = (beginCoords, distanceRange, poisWeight, tracksWeight) => {
  return dispatch => {
    // Global Loading
    dispatch(setLoadingMode())

    // Fetch a request from server
    const url =
      baseUrl +
      '?' +
      encodeDataUrl({
        beginLat: beginCoords[0],
        beginLng: beginCoords[1],
        distanceMin: distanceRange.min,
        distanceMax: distanceRange.max,
        poisWeight,
        tracksWeight
      })
    console.log(url)

    // Fake response
    delay(2000).then(() => {
      dispatch(setDisplayResultsMode())
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
  setPoisTypes,
  setPoisValue,
  setTracksTypes,
  setTracksValue,
  setDistanceRange,
  resetForm,
  setBeginValidity,
  sendForm,
  cancelBackendRequest
}
