import { generateRandomColor } from '../../utils'

const INITIAL_TRACKS = {
  currentTrackId: undefined,
  currentTrackGPX: { loading: false, gpxStr: undefined, toBeOpened: false },
  closestCurrentPointIndexInCurrentTrack: undefined,
  loading: false,
  all: []
}

const colors = [
  'red',
  'blue',
  'orange',
  'green',
  'black',
  'grey',
  'pink',
  'yellow',
  'cyan'
]

const tracksReducer = (state = INITIAL_TRACKS, action) => {
  switch (action.type) {
    case 'SHOW':
      return {
        ...state,
        all: state.all.map(
          t => (t.id === action.payload ? { ...t, displayed: true } : t)
        ),
        currentTrackId: action.payload,
        closestCurrentPointIndexInCurrentTrack: undefined
      }
    case 'HIDE':
      return {
        ...state,
        all: state.all.map(
          t => (t.id === action.payload ? { ...t, displayed: false } : t)
        ),
        currentTrackId:
          state.currentTrackId === action.payload
            ? undefined
            : state.currentTrackId
      }
    case 'SET_CURRENT_TRACK':
      return {
        ...state,
        currentTrackId: action.payload,
        closestCurrentPointIndexInCurrentTrack: undefined
      }
    case 'SET_CURRENT_CLOSEST_POINT_INDEX_IN_CURRENT_TRACK':
      if (state.currentTrackId) {
        return {
          ...state,
          closestCurrentPointIndexInCurrentTrack: action.payload
        }
      } else {
        return state
      }
    case 'FETCH_TRACK':
      return { ...state, loading: true }
    case 'RECEIVE_BACKEND_RESULT':
      return {
        ...state,
        loading: false,
        all: [
          ...state.all,
          {
            ...action.payload,
            id:
              state.all.length === 0
                ? 1
                : Math.max.apply(Math, state.all.map(t => t.id)) + 1,
            displayed: false,
            color: colors[action.payload.index] // TODO: index err
          }
        ]
      }
    case 'RECEIVE_TRACK':
      return {
        ...state,
        loading: false,
        all: [
          ...state.all,
          {
            ...action.payload,
            id:
              state.all.length === 0
                ? 1
                : Math.max.apply(Math, state.all.map(t => t.id)) + 1,
            displayed: false,
            color: generateRandomColor()
          }
        ]
      }

    case 'GPX_FETCHED':
      return {
        ...state,
        currentTrackGPX: { loading: true, gpxStr: undefined, toBeOpened: false }
      }
    case 'GPX_GENERATED':
      return {
        ...state,
        currentTrackGPX: {
          loading: false,
          gpxStr: action.payload
        }
      }
    default:
      return state
  }
}

export default tracksReducer
