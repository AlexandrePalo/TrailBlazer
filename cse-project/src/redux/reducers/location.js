const INITIAL_LOCATION = {
  location: [48.85226316763254, 2.359968423843384]
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
    default:
      return state
  }
}

export default locationReducer
