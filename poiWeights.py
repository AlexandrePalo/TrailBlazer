import pymongo, math
from trailsToOSM import bounds, build_near_query, bounding_box, distance

# atlas mongodb url
url = "mongodb://readwrite:uHQn1REU6pf2hV1F@dva-shard-00-00-kemze.mongodb.net:27017,dva-shard-00-01-kemze.mongodb.net:27017,dva-shard-00-02-kemze.mongodb.net:27017/test?ssl=true&replicaSet=dva-shard-0&authSource=admin"

# connect to mongodb client
client = pymongo.MongoClient(url)
db = client.test
# OSM ways collection
osm = db.chambery_ways
# geocaches collection
geocaches = db.geocaches

# ids of OSM ways in collection
osm_ids = osm.distinct('_id')

# lists for collecting bounds of OSM ways
north = []
south = []
east = []
west = []

# iterate through OSM ways
for oid in osm_ids:
    # find way with ID oid
    way = osm.find_one({'_id' : oid})
    # find boundaries of way
    try:
        box = bounding_box(way)
    # if OSM way does not have a geometry => continue to next way
    except KeyError:
        print "no geometry :("
        print
        continue
    north.append(box['north'])
    south.append(box['south'])
    east.append(box['east'])
    west.append(box['west'])

# the northernmost bound
top = max(north) + 0.01
# the southernmost bound
bottom = min(south) - 0.01
# the westmost bound
left = min(west) - 0.01
# the eastmost bound
right = max(east) + 0.01

# # demo points:
# top = 46.0971616
# bottom = 44.1360561
# left = 5.036074
# right = 6.4540979

# build query box
box = [
    [left,top],
    [right,top],
    [right,bottom],
    [left,bottom],
    [left,top]
]

query = {
    'geometry' : {
        '$geoWithin' : {
            '$geometry' : {
                'type' : 'Polygon',
                'coordinates' : [box]
            }
        }
    }
}

# maxium distance of 1000 m / 1 km
max_distance = 1000

# geocacches within the boundaries of the
geo_in_osm_range = geocaches.find(query)

# iterate through geocaches within the boundaries defined in the query
for gc in geo_in_osm_range:
    print gc['_id']

    # the coordinates of the geocache location
    geo_loc = gc['geometry']['coordinates']

    # find ways within 1 km away from the geocache
    osm_ways = osm.find(build_near_query(gc['geometry']['coordinates'], max_distance = max_distance))

    # list for nodes that get additional weight
    weighted_nodes = []

    # iterate through ways nearby the geocache gc
    for way in osm_ways:
        # coordinates of OSM way
        coordinates = way['geometry']['coordinates']

        # distance between each coordinate and the geocache
        dist = [distance(geo_loc[0], geo_loc[1], c[0], c[1])
                   for c in coordinates]

        # enumerated version of dist list
        enum_dist = [(i,d) for i,d in enumerate(dist)]

        # sort enumerated distances
        enum_dist.sort(key=lambda x: x[1])

        # two closest points
        first_idx = enum_dist[0][0]
        second_idx = enum_dist[1][0]

        # increase POI weights of two closest points
        coordinates[first_idx][3] += 1
        weighted_nodes.append(coordinates[first_idx][:2])

        coordinates[second_idx][3] += 1
        weighted_nodes.append(coordinates[second_idx][:2])

        # update the way with new geocache weights
        try:
            osm.update_one({'_id': way['_id']}, {'$set' : { 'geometry.coordinates' : coordinates }})
            print "Updated:",way['_id']
        except pymongo.errors.CursorNotFound:
            print
            print "ERROR: could not find",way['_id']
            print

    print "Number of weighted nodes:", len(weighted_nodes)
    print
