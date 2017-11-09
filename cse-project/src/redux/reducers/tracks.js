import { generateRandomColor, closestPointIndexInList } from '../../utils'

const INITIAL_TRACKS = {
  currentTrackId: undefined,
  closestCurrentPointIndexInCurrentTrack: undefined,
  loading: false,
  all: [
    {
      id: 1,
      name: 'Sample path 1',
      color: 'red',
      displayed: false,
      pois: [
        {
          id: 100,
          coords: [51.50548824773089, -0.09191163250956211],
          name: 'POI 1',
          description: 'Description of the POI 1'
        },
        {
          id: 101,
          coords: [51.50563168737412, -0.09176676396782125],
          name: 'POI 2',
          description: 'Description of the POI 2'
        }
      ],
      points: [
        [51.50547859696556, -0.09075390223400344, 100],
        [51.50564167229916, -0.09091340024327664, 102],
        [51.50578905008157, -0.09120707206745804, 110]
      ]
    }
  ]
}

const getTrackIndexById = (state, id) => {
  state.all.forEach((t, i) => {
    if (t.id === id) {
      return i
    }
  })
}

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
    case 'RECEIVE_TRACK':
      return {
        ...state,
        loading: false,
        all: [
          ...state.all,
          {
            ...action.payload,
            id: Math.max.apply(Math, state.all.map(t => t.id)) + 1,
            displayed: false,
            color: generateRandomColor()
          }
        ]
      }
    default:
      return state
  }
}

export default tracksReducer
