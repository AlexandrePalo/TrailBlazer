const google = window.google
const AutoCompleteGoogleService = new google.maps.places.AutocompleteService()
const PlacesGoogleService = new google.maps.places.PlacesService(
  document.createElement('div')
)

const fetchBeginPredictions = () => ({ type: 'FETCH_BEGIN_PREDICTIONS' })
const receiveBeginPredictions = places => ({
  type: 'RECEIVE_BEGIN_PREDICTIONS',
  payload: places
})
const getBeginPredictions = input => {
  return dispatch => {
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

const setPoisTypes = types => ({ type: 'SET_POIS_TYPES', payload: types })
const setPoisRange = range => ({ type: 'SET_POIS_RANGE', payload: range })
const setTracksTypes = types => ({ type: 'SET_TRACKS_TYPES', payload: types })
const setTracksRange = range => ({ type: 'SET_TRACKS_RANGE', payload: range })

const setDistanceRange = range => ({
  type: 'SET_DISTANCE_RANGE',
  payload: range
})

export {
  getBeginPredictions,
  getBeginPlaceDetails,
  setPoisTypes,
  setPoisRange,
  setTracksTypes,
  setTracksRange,
  setDistanceRange
}
