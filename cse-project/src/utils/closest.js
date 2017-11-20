const distance2D = (point1, point2) => {
  return Math.sqrt(
    Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2)
  )
}

const distanceHeversine = (pt1, pt2) => {
  let R = 6371e3 // metres
  let p1 = pt1[0] * Math.PI / 180
  let p2 = pt2[0] * Math.PI / 180
  let Dp = (pt2[0] - pt1[0]) * Math.PI / 180
  let Dl = (pt2[1] - pt1[1]) * Math.PI / 180
  let a =
    Math.sin(Dp / 2) * Math.sin(Dp / 2) +
    Math.cos(p1) * Math.cos(p2) * Math.sin(Dl / 2) * Math.sin(Dl / 2)
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
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

export { closestPointInList, closestPointIndexInList, distanceHeversine }
