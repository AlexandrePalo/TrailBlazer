const INITIAL_FORM = {
  beginLocation: {
    text: undefined,
    predictions: [],
    coords: [],
    loading: false
  },
  distance: {
    min: 0,
    max: 100,
    selection: { min: 0, max: 10 }
  },
  pois: {
    choices: ['Geocaching'],
    types: [],
    min: 0,
    max: 100,
    value: 50
  },
  tracks: {
    choices: ['Utagawa'],
    types: [],
    min: 0,
    max: 100,
    value: 50
  }
}

const formReducer = (state = INITIAL_FORM, action) => {
  switch (action.type) {
    case 'SET_BEGIN_TEXT':
      return {
        ...state,
        beginLocation: { ...state.beginLocation, text: action.payload }
      }
    case 'FETCH_BEGIN_DETAILS':
    case 'FETCH_BEGIN_PREDICTIONS':
      return {
        ...state,
        beginLocation: { ...state.beginLocation, loading: true }
      }
    case 'RECEIVE_BEGIN_PREDICTIONS':
      return {
        ...state,
        beginLocation: {
          ...state.beginLocation,
          loading: false,
          predictions: action.payload
        }
      }
    case 'RECEIVE_BEGIN_DETAILS':
      return {
        ...state,
        beginLocation: {
          ...state.beginLocation,
          loading: false,
          coords: action.payload
        }
      }

    case 'SET_TRACKS_TYPES':
      return {
        ...state,
        tracks: {
          ...state.tracks,
          types: action.payload
        }
      }
    case 'SET_TRACKS_VALUE':
      return {
        ...state,
        tracks: { ...state.tracks, value: action.payload }
      }
    case 'SET_POIS_TYPES':
      return {
        ...state,
        pois: {
          ...state.pois,
          types: action.payload
        }
      }
    case 'SET_POIS_VALUE':
      return {
        ...state,
        pois: { ...state.pois, value: action.payload }
      }
    case 'SET_DISTANCE_RANGE':
      return {
        ...state,
        distance: { ...state.distance, selection: action.payload }
      }
    default:
      return state
  }
}

export default formReducer
