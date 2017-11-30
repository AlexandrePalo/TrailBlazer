import moment from 'moment'
import js2xmlparser from 'js2xmlparser'

const TrailBlazer = 'TrailBlazer'
// Time format: ISO8601

const xmlBaseStr = '<?xml version="1.0" encoding="UTF-8"?>'
const gpxBase = {
  '@': {
    version: '1.1',
    creator: TrailBlazer,
    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
    xmlns: 'http://www.topografix.com/GPX/1/1',
    'xsi:schemaLocation':
      'http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd'
  }
}
const parserOption = { declaration: { include: false } }

const headerGen = (name, description) => {
  // GPX
  const gpxXML = js2xmlparser.parse('gpx', gpxBase, parserOption)
  // '/>' is replaced by '>' at the end
  // We need to add </gpx> at the end of the file

  // MetaData
  const metaDataBase = {
    name,
    description,
    author: TrailBlazer,
    time: moment().toISOString() // Current datetime
  }
  const metaDataXML = js2xmlparser.parse('metadata', metaDataBase, parserOption)

  return gpxXML.slice(0, gpxXML.length - 2) + '>' + metaDataXML
}

const trkGen = (name, points) => {
  const trkBase = {
    name,
    trkseg: {
      trkpt: [
        points.map(p => ({
          '@': { lat: p[0], lng: p[1] }
          //ele: p[2]
        }))
      ]
    }
  }

  return js2xmlparser.parse('trk', trkBase, parserOption)
}

const gpxGen = (name, description, points) => {
  return (
    xmlBaseStr + headerGen(name, description) + trkGen(name, points) + '</gpx>'
  )
}

export { gpxGen }
