"""
The initial GeoJSON road files had roads with nodes with the form [ longitude, latitude ]. This script expands the nodes to contain sections for elevation, POI weight, and Utagawa proximity weight. The updated nodes have the form of [ longitude, latitude, elevation, POI weight, Utagawa weight ].
"""

import json, argparse

# parse command line for file name
parser = argparse.ArgumentParser(description = 'Expands the GeoJSON road coordinates to include space for elevation, POI weight, and trail weight')
parser.add_argument('fname', metavar='file', help='JSON file that includes roads in GeoJSON format')
args = parser.parse_args()

# file name
fname = args.fname

try:
    with open(fname, 'r') as f:
        roads = json.load(f)
        f.close()
except:
    print "Error with opening file"
    quit()

total = len(roads)
print "Total roads:",total

i = 1

# iterate through each road in the file
for rd in roads:
    print i,"/",total
    i+=1

    # check for coordinates in GeoJSON object
    try:
        coordinates = rd['geometry']['coordinates']
    except TypeError:
        print "TypeError: no coordinates in road"
        print "continuing to next road"
        print
        continue

    # update coordinates to the form [lon, lat, elevation, poi weight, trail weight]
    rd['geometry']['coordinates'] = [crd[:2] + [None, 0, 0] for crd in coordinates]

    print

# output back to the original file
with open(fname, 'w') as f:
    roads = json.dump(roads, f)
    f.close()
