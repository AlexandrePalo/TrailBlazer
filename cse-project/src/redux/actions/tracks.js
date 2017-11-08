const show = id => ({ type: 'SHOW', payload: id })
const hide = id => ({ type: 'HIDE', payload: id })
const setCurrentTrack = id => ({ type: 'SET_CURRENT_TRACK', payload: id })
const setCurrentClosestPointIndexInCurrentTrack = index => ({
  type: 'SET_CURRENT_CLOSEST_POINT_INDEX_IN_CURRENT_TRACK',
  payload: index
})

export {
  show,
  hide,
  setCurrentTrack,
  setCurrentClosestPointIndexInCurrentTrack
}
