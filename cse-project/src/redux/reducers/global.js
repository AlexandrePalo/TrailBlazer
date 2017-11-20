// --- MODES ---
// settings: form input
// interstate: loading state
// display: display solutions on the map

// Modes: welcome, settings, loading, displayResults

// TODO: use react navigation ...

const INITIAL_GLOBAL = {
  mode: 'welcome'
}

const globalReducer = (state = INITIAL_GLOBAL, action) => {
  switch (action.type) {
    case 'SET_LOADING_MODE':
      return {
        ...state,
        mode: 'loading'
      }
    case 'CANCEL_BACKEND_REQUEST':
    case 'SET_SETTINGS_MODE':
      return {
        ...state,
        mode: 'settings'
      }
    case 'SET_WELCOME_MODE':
      return {
        ...state,
        mode: 'welcome'
      }
    case 'SET_DISPLAY_RESULTS_MODE':
      return {
        ...state,
        mode: 'displayResults'
      }
    default:
      return state
  }
}

export default globalReducer
