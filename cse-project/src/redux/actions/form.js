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
  resetForm
}
