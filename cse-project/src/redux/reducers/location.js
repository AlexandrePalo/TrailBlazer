const INITIAL_LOCATION = {
  location: [48.85226316763254, 2.359968423843384]
}

const locationReducer = (state = INITIAL_LOCATION, action) => {
  switch (action.type) {
    case 'SET_LOCATION':
      return {
        ...state,
        location: action.payload
      }
    default:
      return state
  }
}

export default locationReducer
