"""
The geocaches we scraped were not in GeoJSON format, so this script converts each geocahce's longitude and latitude from the degree format to the decimal format. The decimal latitude and longitude are then stored in the geocahce object in GeoJSON format.
"""

import json, argparse
from processing_utils import decimal2degrees, build_geocache_geometry

# parse command line for file name
parser = argparse.ArgumentParser(description = 'Converts Geocaching.org geocaches into GeoJSON points')
parser.add_argument('fname', metavar='file', help='JSON with geocaches')
args = parser.parse_args()

# file name
fname = args.fname
# new file name
new_fname = 'geojson_' + fname

# open json file with geocaches
try:
    with open(fname, 'r') as f:
        geocaches = json.load(f)
        f.close()
except:
    print "Error with opening file"
    quit()

i = 1
total = len(geocaches)

for gc in geocaches:
    print i,"/",total
    i += 1
    try:
        gc['geometry'] = build_geocache_geometry(gc['coord'])
    except:
        print "Conversion Error:"
        print gc
        print
        continue

with open(new_fname, 'w') as nf:
    json.dump(geocaches, nf)
    nf.close()
