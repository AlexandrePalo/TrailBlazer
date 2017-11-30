const INITIAL_LOCATION = {
  location: [45.56998, 5.917419999999993] // Chambéry
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
