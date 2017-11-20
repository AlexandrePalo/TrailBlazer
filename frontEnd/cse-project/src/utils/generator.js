const generateRandomPath = (position, nbPoints) => {
  let path = [[position.lat, position.lng]]
  for (let i = 0; i < nbPoints; i++) {
    path.push([
      path[i][0] + (Math.random() * 0.0008 - 0.0004),
      path[i][1] + (Math.random() * 0.0008 - 0.0004)
    ])
  }
  return path
}

const generateRandomColor = () => {
  return '#' + (((1 << 24) * Math.random()) | 0).toString(16)
}

const encodeDataUrl = data => {
  return Object.keys(data)
    .map(function(key) {
      return [key, data[key]].map(encodeURIComponent).join('=')
    })
    .join('&')
}

export { generateRandomPath, generateRandomColor, encodeDataUrl }
