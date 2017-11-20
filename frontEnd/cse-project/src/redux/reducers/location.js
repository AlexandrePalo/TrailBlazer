const INITIAL_LOCATION = {
  location: [49.1021919, 6.2129733] // Georgia Tech Lorraine
}

const locationReducer = (state = INITIAL_LOCATION, action) => {
  switch (action.type) {
    case 'RECEIVE_BEGIN_DETAILS':
    case 'SET_LOCATION':
      return {
        ...state,
        location: action.payload
      }
    case 'SET_MODE_CURRENT':
      return {
        ...state,
        location: action.payload.coords
      }
    case 'RESET_FORM':
      return {
        ...state,
        location: INITIAL_LOCATION.location
      }
    default:
      return state
  }
}

export default locationReducer
