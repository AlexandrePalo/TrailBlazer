## Data Processing

### Files

#### clean_roads.py

The initial GeoJSON road files had roads with nodes with the form [ longitude, latitude ]. This script expands the nodes to contain sections for elevation, POI weight, and Utagawa proximity weight. The updated nodes have the form of [ longitude, latitude, elevation, POI weight, Utagawa weight ].

#### clean_utagawa.py

This script converts the JSON Utagawa trails into GeoJSON objects that can be imported into the database.

#### geocaches2geojson.py

The geocaches we scraped were not in GeoJSON format, so this script converts each geocahce's longitude and latitude from the degree format to the decimal format. The decimal latitude and longitude are then stored in the geocahce object in GeoJSON format.

#### weight_poi.py

This script iterates through all of the geocaches in the database and finds OpenStreetMap roads/trails within a 1 km radius of each geocache. The coordinates of the trails with the radius are then weighted according to proximity to the geocache. More specifically, coordinates within the 1 km range are weighted by (2 - distance to geocache), so if a coordinate is 0.25 km away, it will recieve a weight of 1.75 while a coordinate 1 km away will recieve a weight of 1. OpenStreetMap roads/trails that receive weights are updated in the database.

#### weight_trails.py

This script iterate through the Utagawa trails and find nearby OpenStreetMap trails. If an OpenStreetMap road coordinate is within 25 m of one of the nodes on an Utagawa trail, the OSM coordinate's trail weight will increase by 1. Each Utagawa trail can only weight an OpenStreetMap road coordinate once, so if an OSM coordinate is nearby 5 nodes on one Utagawa trail, the OSM coordinate's weight will still only increase by 1. OpenStreetMap trails that receive weights are updated in the database.

#### processing_utils.py

This file contains various functions that are repeatedly used by the above files.
