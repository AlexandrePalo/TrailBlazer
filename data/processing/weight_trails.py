import pymongo, sys, math, json, os
from processing_utils import bounding_box, build_query, build_near_query, distance
from bson import ObjectId

# mongodb readwrite url
url = "mongodb://readwrite:uHQn1REU6pf2hV1F@dva-shard-00-00-kemze.mongodb.net:27017,dva-shard-00-01-kemze.mongodb.net:27017,dva-shard-00-02-kemze.mongodb.net:27017/test?ssl=true&replicaSet=dva-shard-0&authSource=admin"

# initialize the client and connect to the database
client = pymongo.MongoClient(url)
db = client.test

# collection of utagawa trails
utagawa = db.utagawa

# ways in Chambery demo dataset
osmWays = db.chambery_roads

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

# collections of errors that never got written to the db
misses = []

# file for collectionve misses
miss_file = 'weight_trails_misses.json'

# collection of ids of all sucessful writes
writes = []
write_file = 'weight_trails_writes.json'

if not os.path.isfile(write_file):
    writes = []
else:
    with open(write_file, 'r') as f:
        writes = json.load(f)
        f.close()

    # convert string Utagawa ids to BSON format
    oid_writes = [ObjectId(write) for write in writes]

    # remove ids of previously written trails
    utagawa_ids = list(set(utagawa_ids) - set(oid_writes))
    ut_count = len(utagawa_ids);

# iterate through utagawa trails
for u_id in utagawa_ids:
    print str(i) + "/" + str(ut_count), len(matches)
    i += 1

    if str(u_id) in writes:
        print "already written"
        continue
    try:
        print "trying to find trail"
        trail = utagawa.find_one({'_id' : u_id})
        print "found trail"
    except pymongo.errors.CursorNotFound:
        print "ERROR: cursor not found", u_id
        # add utagawa trail id to misses => will reiterate over later
        misses.append({'u_id' : u_id})
        continue
    except pymongo.errors.AutoReconnect:
        print "ERROR: auto recconnect failed"
        misses.append({'u_id' : u_id})
        continue

    # search for ways/paths in OSM database that are within the bounding
    # box of the utagawa trail
    try:
        print "trying to find osm ways"
        ways = osmWays.find(build_query(trail))
    except pymongo.errors.AutoReconnect:
        print "ERROR: auto recconnect failed"
        misses.append({'u_id' : u_id})
        continue


    # if there are OSM ways inside of the utagawa bounding box, append the
    # utagawa trail to matches
    if ways.count():
        print "found ways"
        # add current utagawa trail to list of matches
        matches.append(trail)

        # list of all OSM ways nearby utagawa trail
        way_ids = ways.distinct('_id')

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
            try:
                c_ways = osmWays.find(build_near_query(loc))
            except pymongo.errors.AutoReconnect:
                print "ERROR: auto recconnect failed"
                misses.append({'u_id' : u_id, 'utc' : utc})
                continue

            c_ways_ids = c_ways.distinct('_id')

            # iterate through chambery ways
            for ctid in c_ways_ids:
                try:
                    ct = osmWays.find_one({'_id' : ctid})
                except pymongo.errors.CursorNotFound:
                    print "ERROR: cursor not found", ctid
                    # add utagawa trail id to misses => will reiterate over later
                    misses.append({'u_id' : u_id, 'utc' : utc, 'ctid' : ctid})
                    continue
                except pymongo.errors.AutoReconnect:
                    print "ERROR: auto recconnect failed"
                    misses.append({'u_id' : u_id, 'utc' : utc, 'ctid' : ctid})
                    continue

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

                        # increment trail weight
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

    writes.append(str(u_id))

    # write misses to file
    with open(miss_file, 'w') as f:
        json.dump(misses, f)
        f.close()

    # write writes to file
    with open(write_file, 'w') as f:
        json.dump(writes, f)
        f.close()
