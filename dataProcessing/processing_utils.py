import sys, math, json, os

def degrees_to_decimals(coord_string):
    # Decimal Degrees: https://en.wikipedia.org/wiki/Decimal_degrees
    # converts coordinates from DMS format to decimal format
    # 38 deg 53' 23" N, 77 deg 00' 32" => 38.8897,-77.0089

    # remove degree symbol
    # split coordinate string to components
    elements = coord_string.replace(u'\xb0', '').split(' ')

    # if lenght of elements < 6 => parts are missing
    # return nothing
    if len(elements) < 6:
        return []

    print elements

    # convert DMS latitude to decimal latitude
    latDirection = elements[0]
    latD = float(elements[1])
    latM = int(float(elements[2]))
    latS = float(elements[2]) / 100
    latDecimal = latD + (latM / 60.0) + (latS / 3600.0)

    # convert DMS longitude to decimal longitude
    lonDirection = elements[3]
    lonD = float(elements[4])
    lonM = int(float(elements[5]))
    lonS = float(elements[5]) / 100
    lonDecimal = lonD + (lonM / 60.0) + (lonS / 3600.0)

    # if latitude in southern hemisphere => negative latitude
    if latDirection == u'S':
        latDecimal *= -1
    # if longitude in western hemisphere => negative longitude
    if lonDirection == u'W':
        lonDecimal *= -1

    return [lonDecimal, latDecimal]

def build_geocache_geometry(coord_string):

    # convert to [lon, lat] coordinates
    coordinates = degrees_to_decimals(coord_string)

    # if coordinates is empty => return empty dict
    if not coordinates:
        return {}

    # build geojson feature
    feature = {
        'type' : 'Point',
        'coordinates' : coordinates
    }

    return feature


def bounds(trail):
    # this function takes in a trail and outputs the north, south, east, and
    # west bounds

    # list of coordinates in trail
    try:
        coordinates = trail['geometry']['coordinates']
    except KeyError:
        coordinates = trail['location']['coordinates']

    # boundaries of trail
    # maximum latitude
    north = -180
    # minimum latitude
    south = 180
    # minimum longitude
    east = -180
    # maximum longitude
    west = 180

    # iterate throug coordinates
    for crd in coordinates:
        # coordinate longitude and latitude
        lon = float(crd[0])
        lat = float(crd[1])

        # if lon < west bound => lon is new west bound
        if lon < west:
            west = lon

        # if lon > east bound => lon is new east bound
        if lon > east:
            east = lon

        # if lat < south bound => lat is new south bound
        if lat < south:
            south = lat

        # if lat > north bound => lat is new north bound
        if lat > north:
            north = lat

    return {'north' : north, 'south' : south, 'east' : east, 'west' : west}


def bounding_box(trail, padding=0.00017):
    # take bounds from bounds() and builds a box that encases all of the points
    # within the bounds

    boundaries =  bounds(trail)

    north = boundaries['north'] + padding
    south = boundaries['south'] - padding
    east = boundaries['east'] - padding
    west = boundaries['west'] + padding

    box = [
        [west,north],
        [east,north],
        [east,south],
        [west, south],
        [west, north]
    ]

    return box

def build_query(trail):
    # this function builds a query object that can be passed to a find function
    # in mongodb. this query will search for all geojson objects within the
    # bounding box supplied by bounding_box()

    box = bounding_box(trail)

    withinQuery = {
       'geometry' : {
           '$geoWithin' : {
               '$geometry' : {
                   'type' : 'Polygon',
                   'coordinates' : [box]
               }
           }
       }
    }

    intersectQuery = {
        'geometry' : {
            '$geoIntersects' : {
                '$geometry' : {
                    'type' : 'Polygon',
                    'coordinates' : [box]
                }
            }
        }
    }

    query = {'$or' : [withinQuery, intersectQuery]}

    return query

def build_near_query(point, max_distance=25):
    # this function builds a query object that can be passed to a find function
    # in mongodb. this query will search for all geojson objects within 25 m of
    # the provided point

    query = {
        'geometry' : {
            '$near' : {
                '$geometry' : {
                    'type' : 'Point',
                    'coordinates' : point
                },
                '$maxDistance' : max_distance,
                '$minDistance' : 0
            }
        }
    }

    return query

def distance(lon1, lat1, lon2, lat2):
    # because longitude and latitude are points on a sphere, we must use
    # the Haversine formula to calculate distance between points.
    # formula: https://en.wikipedia.org/wiki/Haversine_formula

    # radius of earth in km
    radius = 6371

    # difference of lat and lon, converted to radians, and divided by 2
    latDiff = math.radians(lat2 - lat1) / 2.0
    lonDiff = math.radians(lon2 - lon1) / 2.0

    x = math.sin(latDiff) ** 2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * (math.sin(lonDiff) ** 2)
    y = 2 * math.atan2(math.sqrt(x), math.sqrt(1-x))

    return radius * y
