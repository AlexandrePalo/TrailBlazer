'''
This script iterates through all of the geocaches in the database and finds OpenStreetMap roads/trails within a 1 km radius of each geocache. The coordinates of the trails with the radius are then weighted according to proximity to the geocache. More specifically, coordinates within the 1 km range are weighted by (2 - distance to geocache), so if a coordinate is 0.25 km away, it will recieve a weight of 1.75 while a coordinate 1 km away will recieve a weight of 1. OpenStreetMap roads/trails that receive weights are updated in the database.
'''

import pymongo, math, json, os
from processing_utils import bounds, build_near_query, bounding_box, distance
from bson import ObjectId

# atlas mongodb url
url = "mongodb://readwrite:uHQn1REU6pf2hV1F@dva-shard-00-00-kemze.mongodb.net:27017,dva-shard-00-01-kemze.mongodb.net:27017,dva-shard-00-02-kemze.mongodb.net:27017/test?ssl=true&replicaSet=dva-shard-0&authSource=admin"

# connect to mongodb client
client = pymongo.MongoClient(url)
db = client.test
# OSM ways collection
osm = db.chambery_roads
# geocaches collection
geocaches = db.geocaches

# ids of OSM ways in collection
osm_ids = osm.distinct('_id')

# lists for collecting bounds of OSM ways
north = []
south = []
east = []
west = []

print "establishing boundaries"
# # iterate through OSM ways
# for oid in osm_ids:
#     # find way with ID oid
#     way = osm.find_one({'_id' : oid})
#     # find boundaries of way
#     try:
#         box = bounds(way)
#     # if OSM way does not have a geometry => continue to next way
#     except KeyError:
#         print "no geometry :("
#         print
#         continue
#     north.append(box['north'])
#     south.append(box['south'])
#     east.append(box['east'])
#     west.append(box['west'])
#
# print "north"
# # the northernmost bound
# top = max(north) + 0.01
# print "south"
# # the southernmost bound
# bottom = min(south) - 0.01
# print "west"
# # the westmost bound
# left = min(west) - 0.01
# print "east"
# # the eastmost bound
# right = max(east) + 0.01

# Boundaries of OpenStreetMap Dataset
# we originally iterated through all of our roads in our database to find
# the boundaries, but that took far too long. instead, we hardcoded the
# boundaries to expedite the process
top = 52.201
bottom = 41.344
left = -5.889
right = 10.723

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

# collection geocahe ids
# this allows us to iterate through each geocache in the database without
# needing to have a constant connection
geo_ids = geocaches.distinct('_id')
total = geocaches.count()

# miss file
miss_file = "weight_poi_misses.json"
misses = []

# write file
write_file = "weight_poi_writes.json"
writes = []

# check if write file exists
if os.path.isfile(write_file):
    with open(write_file, 'r') as f:
        previous_writes = json.load(f)
        f.close()

    # convert string ids from previous writes to object ids that can match
    # the mongodb ids
    oid_previous_writes = [ObjectId(write) for write in previous_writes]

    # remove previously processed geocaches from list of geocahces that will
    # be processed
    geo_ids = list(set(geo_ids) - set(oid_prev_writes))

    # additional writes will be added to the previous writes
    writes = previous_writes


print "total:",total
j = 1
# iterate through geocaches in database
for gid in geo_ids:
    # if geocaches was found, add its ID to writes
    try:
        gc = geocaches.find_one({'_id' : gid})
        writes.append(str(gid))
    # if not, add it to the misses so it can be read again later
    except:
        print "Could not find:", gid
        misses.append(str(gid))
        continue

    print gc['_id'],j,"/",total
    j+=1
    # the coordinates of the geocache location
    try:
        geo_loc = gc['geometry']['coordinates']
    except KeyError:
        print "geocache no coordinates"
        continue


    # find ways within 1 km away from the geocache
    osm_ways = osm.find(build_near_query(gc['geometry']['coordinates'], max_distance = max_distance))

    # list for nodes that get additional weight
    weighted_nodes = []

    # iterate through roads/ways nearby the geocache gc
    for way in osm_ways:
        print "found ways"
        # coordinates of OSM way
        coordinates = way['geometry']['coordinates']

        # distance between each coordinate and the geocache
        dist = [distance(geo_loc[0], geo_loc[1], c[0], c[1])
                   for c in coordinates]

        # enumerated version of dist list
        enum_dist = [(i,d) for i,d in enumerate(dist)]

        near = [x for x in enum_dist if x[1] <= 1]

        # if there are many points <= 1 km away from the geocache, allow them
        # to all be weighted
        if len(near) > 1:
            for x in near:
                idx = x[0]
                # add (2 - distance to geocaches) to poi weight of coordinate
                # if coordinate is 1 km away => weight = 1
                # if coordinate is 0 km away => weight = 2
                coordinates[idx][3] += (2 - x[1])
        # if there is only <= 1 point within 1 km of the geocache, weight
        # the two points closest to the geocache
        else:
            # sort enumerated distances
            enum_dist.sort(key=lambda x: x[1])

            # two closest points
            first_idx = enum_dist[0][0]
            second_idx = enum_dist[1][0]

            # increase POI weights of two closest points
            # weight = max(2 - distance from geocache, 1)
            coordinates[first_idx][3] += max(2 - enum_dist[0][1], 1)
            weighted_nodes.append(coordinates[first_idx][:2])

            coordinates[second_idx][3] += max(2 - enum_dist[1][1], 1)
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

    # every 50 iterations output the writes and misses to file
    if j % 50 == 0:
        with open(miss_file, 'w') as f:
            json.dump(misses, f)
            f.close()

        with open(write_file, 'w') as f:
            json.dump(writes, f)
            f.close()
