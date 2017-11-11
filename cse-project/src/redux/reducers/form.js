const INITIAL_FORM = {
  begin: { text: undefined, coords: [] },
  end: { text: undefined, coords: [] }
}

const formReducer = (state = INITIAL_FORM, action) => {
  switch (action.type) {
    case 'SET_BEGIN_TEXT':
      return {
        ...state,
        begin: { ...state.begin, text: action.payload }
      }
    default:
      return state
  }
}

export default formReducer
