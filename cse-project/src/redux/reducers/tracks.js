import { generateRandomPath, closestPointIndexInList } from '../../utils'

const INITIAL_TRACKS = {
  currentTrackId: undefined,
  closestCurrentPointIndexInCurrentTrack: undefined,
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
        [51.50547859696556, -0.09075390223400344],
        [51.50564167229916, -0.09091340024327664],
        [51.50578905008157, -0.09120707206745804],
        [51.50593135290407, -0.09106642404972576],
        [51.50580363679397, -0.09141713478538435],
        [51.50541454542603, -0.09156360968343442],
        [51.50540270621053, -0.09194395806532432],
        [51.50548824773089, -0.09191163250956211],
        [51.505418348972505, -0.0917910732076745],
        [51.505667201574326, -0.0917208907545518],
        [51.5057185485248, -0.09142115922704218],
        [51.505490072081926, -0.09108266372430035],
        [51.50547186274444, -0.09143538250821606],
        [51.505633288487886, -0.09156433189400347],
        [51.50549590266207, -0.09118750913908448],
        [51.505683111490505, -0.0915422225259329],
        [51.50577316020651, -0.0916712210219344],
        [51.50563168737412, -0.09176676396782125],
        [51.505384603914514, -0.09203102562749899],
        [51.505306238248224, -0.09205626931745514],
        [51.505306127772066, -0.09190669748350885],
        [51.50566867819919, -0.09187947458971814],
        [51.505401541190956, -0.09166626046790834],
        [51.50541888195244, -0.09164224320385655],
        [51.50576293142038, -0.09167724952990808],
        [51.50590154494434, -0.09172307112672608],
        [51.50593360892754, -0.09171614541546085],
        [51.50631990127947, -0.09190702960683224],
        [51.505982254826016, -0.0915237895443479],
        [51.50627925454468, -0.09159495719334543],
        [51.506112951697695, -0.09141320868255776]
      ]
    },
    {
      id: 2,
      name: 'Sample path 2',
      color: 'blue',
      displayed: false,
      pois: [],
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
      pois: [],
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
        )
      }
    case 'HIDE':
      return {
        ...state,
        all: state.all.map(
          t => (t.id === action.payload ? { ...t, displayed: false } : t)
        )
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
    default:
      return state
  }
}

export default tracksReducer
