"""
This script converts the JSON Utagawa trails into GeoJSON objects that can be imported into the database.
"""

import json, os, argparse

# parse command line for file name
parser = argparse.ArgumentParser(description = 'Converts scraped Utagawa trails into GeoJSON ojbects')
parser.add_argument('fname', metavar='file', help='JSON file with Utagawa trails')
args = parser.parse_args()

# file name
fname = args.fname

print "reading file"
# open dirty trail file
with open(fname, 'r') as f:
    dirty = json.load(f)
    f.close()

clean = []
total = len(dirty)
# iterate through trails
print "iterating through file"
for i in range(len(dirty)):
    print i,"/",total
    oldTrail = dirty[i]

    # build a new trail
    trail = {}
    # keep these parts of the trails
    trail['downloadDate'] = oldTrail['downloadDate']
    trail['distance'] = oldTrail['distance']
    trail['url'] = oldTrail['url']
    trail['duree'] = oldTrail['duree']
    trail['descente'] = oldTrail['descente']
    trail['interet'] = oldTrail['interet']
    trail['montee'] = oldTrail['montee']
    trail['titre'] = oldTrail['titre']
    trail['itineraireShort'] = oldTrail['itineraireShort']

    coordinates = []

    # check if trail coordinates are included
    try:
        points = oldTrail['xml_gpx']['gpx']['trk'][0]['trkseg'][0]['trkpt']
    # if not, skip to next trail
    except KeyError:
        continue

    # convert to geojson
    for pt in points:
        lon = pt['$']['lon']
        lat = pt['$']['lat']
        # check if elevation is included
        try:
            elevation = float(pt['ele'][0])
            coordinates.append([lon,lat,elevation])
        # if not, do not include elevation
        except KeyError:
            coordinates.append([lon,lat])

    trail['location'] = {
        'type' : 'LineString',
        'coordinates' : coordinates
    }

    clean.append(trail)

# write clean trails to json
with open('geojson_' + fname, 'w') as f:
    json.dump(clean, f)
    f.close()

print "done"
