const distance2D = (point1, point2) => {
  return Math.sqrt(
    Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2)
  )
}

const closestPointInList = (point, list) => {
  let distMin = Number.MAX_VALUE
  let closest = []
  list.forEach(p => {
    let d = distance2D(point, p)
    if (d < distMin) {
      distMin = d
      closest = p
    }
  })
  return closest
}

const closestPointIndexInList = (point, list) => {
  let distMin = Number.MAX_VALUE
  let closestIndex = -1
  list.forEach((p, i) => {
    let d = distance2D(point, p)
    if (d < distMin) {
      distMin = d
      closestIndex = i
    }
  })
  return closestIndex
}

export { closestPointInList, closestPointIndexInList }
