import { generateRandomPath } from '../../utils'

const INITIAL_TRACKS = {
  all: [
    {
      id: 1,
      name: 'Sample path 1',
      color: 'red',
      displayed: false,
      points: generateRandomPath(
        {
          lat: 51.505 + (Math.random() * 0.002 - 0.001),
          lng: -0.09 + (Math.random() * 0.002 - 0.001)
        },
        30
      )
    },
    {
      id: 2,
      name: 'Sample path 2',
      color: 'blue',
      displayed: false,
      points: generateRandomPath(
        {
          lat: 51.505 + (Math.random() * 0.002 - 0.001),
          lng: -0.09 + (Math.random() * 0.002 - 0.001)
        },
        30
      )
    },
    {
      id: 3,
      name: 'Sample path 3',
      color: 'green',
      displayed: false,
      points: generateRandomPath(
        {
          lat: 51.505 + (Math.random() * 0.002 - 0.001),
          lng: -0.09 + (Math.random() * 0.002 - 0.001)
        },
        30
      )
    }
  ]
}

const tracksReducer = (state = INITIAL_TRACKS, action) => {
  switch (action.type) {
    case 'SHOW':
      return {
        ...state,
        all: state.all.map(
          t => (t.id === action.payload ? { ...t, displayed: true } : t)
        )
      }
    case 'HIDE':
      return {
        ...state,
        all: state.all.map(
          t => (t.id === action.payload ? { ...t, displayed: false } : t)
        )
      }
    default:
      return state
  }
}

export default tracksReducer
