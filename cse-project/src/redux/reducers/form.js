const INITIAL_FORM = {
  beginLocation: {
    text: undefined,
    predictions: [],
    coords: [],
    loading: false
  },
  endLocation: { text: undefined, predictions: [], coords: [], loading: false }
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
    case 'FETCH_END_DETAILS':
    case 'FETCH_END_PREDICTIONS':
      return {
        ...state,
        endLocation: { ...state.endLocation, loading: true }
      }
    case 'RECEIVE_END_PREDICTIONS':
      return {
        ...state,
        endLocation: {
          ...state.endLocation,
          loading: false,
          predictions: action.payload
        }
      }
    case 'RECEIVE_END_DETAILS':
      return {
        ...state,
        endLocation: {
          ...state.beginLocation,
          loading: false,
          coords: action.payload
        }
      }
    default:
      return state
  }
}

export default formReducer
