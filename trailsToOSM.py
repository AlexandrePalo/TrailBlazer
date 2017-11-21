import pymongo, sys

def bounding_box(trail):
    # this function takes in a trail and outputs a box that bounds all nodes
    # of the trail
    #
    # this bounding box is used to query OSM ways that are nearby utagawa trails

    # list of coordinates in trail
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

    # create box that starts and ends at point [west,north]
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
    ut_trails = utagawa.find()

    # iterate through utagawa trails
    for trail in ut_trails:
        print str(i) + "/" + str(ut_count), len(matches)
        i += 1

        # search for ways/paths in OSM database that are within the bounding
        # box of the utagawa trail
        ways = osmWays.find(build_query(trail))

        # if there are OSM ways inside of the utagawa bounding box, append the
        # utagawa trail to matches
        if ways.count():
            matches.append(trail)
