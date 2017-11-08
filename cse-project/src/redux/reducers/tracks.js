import { generateRandomPath } from '../../utils'

const INITIAL_TRACKS = [
  {
    id: 1,
    name: 'Sample path 1',
    color: 'red',
    selected: false,
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
    selected: true,
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
    selected: false,
    points: generateRandomPath(
      {
        lat: 51.505 + (Math.random() * 0.002 - 0.001),
        lng: -0.09 + (Math.random() * 0.002 - 0.001)
      },
      30
    )
  }
]

const tracksReducer = (state = INITIAL_TRACKS, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default tracksReducer

/*
selectDeselect(id) {
  let newPaths = this.state.paths
  newPaths.forEach((p, i) => {
    if (p.id === id) {
      newPaths[i].selected = !newPaths[i].selected
    }
  })
  this.setState({ paths: newPaths })
}
*/
