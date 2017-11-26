import pymongo, sys, math

def bounds(trail):
    # this function takes in a trail and outputs the north, south, east, and
    # west bounds

    # list of coordinates in trail
    coordinates = trail['geometry']['coordinates']

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


def bounding_box(trail):
    # take bounds from bounds() and builds a box that encases all of the points
    # within the bounds

    boundaries =  bounds(trail)

    north = boundaries['north']
    south = boundaries['south']
    east = boundaries['east']
    west = boundaries['west']

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

    query = {
       'geometry' : {
           '$geoWithin' : {
               '$geometry' : {
                   'type' : 'Polygon',
                   'coordinates' : [bounding_box(trail)]
               }
           }
       }
    }

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


if __name__ == "__main__":
    # mongodb readwrite url
    url = "mongodb://readwrite:uHQn1REU6pf2hV1F@dva-shard-00-00-kemze.mongodb.net:27017,dva-shard-00-01-kemze.mongodb.net:27017,dva-shard-00-02-kemze.mongodb.net:27017/test?ssl=true&replicaSet=dva-shard-0&authSource=admin"

    # initialize the client and connect to the database
    client = pymongo.MongoClient(url)
    db = client.test

    # collection of utagawa trails
    utagawa = db.utagawa

    # ways in Chambery demo dataset
    osmWays = db.chambery_ways

    # list that will hold all utagawa trails that are in the area covered by
    # the OSM data
    matches = []

    # iteration counter
    i = 1

    # total number of trails in utagawa collection
    ut_count = utagawa.count()

    # iterable cursor that points to trails within the utagawa collection
    # ut_trails = utagawa.find()

    # list of all utagawa ids
    utagawa_ids = utagawa.distinct('_id')

    # iterate through utagawa trails
    for u_id in utagawa_ids:
        print str(i) + "/" + str(ut_count), len(matches)
        i += 1
        try:
            trail = utagawa.find_one({'_id' : u_id})
        except pymongo.errors.CursorNotFound:
            print "ERROR: cursor not found", u_id

    # # iterate through utagawa trails
    # for trail in ut_trails:


        # search for ways/paths in OSM database that are within the bounding
        # box of the utagawa trail
        ways = osmWays.find(build_query(trail))

        # if there are OSM ways inside of the utagawa bounding box, append the
        # utagawa trail to matches
        if ways.count():
            # add current utagawa trail to list of matches
            matches.append(trail)

            # coordinates from a single utagawa trail
            ut_coords = trail['location']['coordinates']

            # collections of nodes that have already been incremented by the
            # current utagawa trail. this prevents nodes from getting extra
            # weight
            weighted_c_nodes = []

            # iterate through coordinates of utagawa trail
            for utc in ut_coords:
                u_lat = float(utc[1])
                u_lon = float(utc[0])
                loc = [u_lon, u_lat]

                # chambery ways near coordinate in utagawa trail
                c_ways = osmWays.find(build_near_query(loc))

                # iterate through chambery ways
                for ct in c_ways:
                    # if updated gets set to true => chambery way needs to be
                    # updated in database
                    updated = False

                    # iterate through coordinates in current chambery trail
                    for coord in ct['geometry']['coordinates']:
                        # generate coordinate id this will prevent a node on a
                        # chambery trail from getting doubly weighted by
                        # multiple nodes on the utagawa trail
                        coord_id = str(coord[0]) + str(coord[1])

                        # chambery trail coordinate has not already been
                        # weighted by the utagawa trail
                        if not coord_id in weighted_c_nodes and (distance(coord[0], coord[1], u_lon, u_lat) * 1000) < 25:
                            # way needs to be updated in databse
                            updated = True
                            weighted_c_nodes.append(coord_id)

                            # coord[4] = 0

                            # increment trackWeight
                            coord[4] += 1

                    # if updated is True, one or more of the coordinates gained
                    # weight, so the coordinates in mongodb must be updated
                    if updated:
                        ct_id = ct['_id']
                        try:
                            osmWays.update_one({'_id' : ct['_id']}, {'$set' : {'geometry.coordinates' : ct['geometry']['coordinates']}})
                            print "Updated:", ct_id
                        except pymongo.errors.CursorNotFound:
                            print
                            print "ERROR: could not find",ct_id
                            print

                print "Number of weighted nodes:", len(weighted_c_nodes)
