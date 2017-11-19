// --- MODES ---
// settings: form input
// interstate: loading state
// display: display solutions on the map

// Modes: settings, loading, ...

const INITIAL_GLOBAL = {
  mode: 'settings'
}

const globalReducer = (state = INITIAL_GLOBAL, action) => {
  switch (action.type) {
    case 'SET_LOADING_MODE':
      return {
        ...state,
        mode: 'loading'
      }
    default:
      return state
  }
}

export default globalReducer
