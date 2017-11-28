import requests, json, sys, os.path

# add an argv section to allow users to input lat/lon coordinates

# query arguments
url = "http://overpass-api.de/api/interpreter?data=[out:json];"
way_query = "way(45.5121,5.8262,45.6508,6.0236);out;"
raw_fname = "raw_chambery_ways.json"
backup_fname = "backup_chambery_ways.json"
clean_fname = "chambery_ways.json"

# get ways from OSM
print "Requesting:",url + way_query
response = requests.get(url + way_query)

if response.status_code != 200:
    print "Error with request"
    exit()

print "Request successful"
# convert resposne to json
way_json = response.json()

# output the raw data to json
json.dump(way_json, open(raw_fname, 'wb'))

# format node queries
def node_query(id):
    return "node(" + str(id) + ");out;"

def multi_query(nodes):
    query = "("

    for id in nodes:
        query += ("node(" + str(id) + ");")

    return query + ");out;"

# ways within the bounding box of original query
ways = way_json['elements']
total_ways = len(ways)
print "Number of ways:",total_ways

if os.path.isfile(clean_fname):
    backup = json.load(open(clean_fname, 'rb'))
else:
    backup = ways

print "Number of ways in backup:",len(backup)

print

i = 0
for w in ways:

    print "Way:", w['id'], str(i+1) + "/" + str(total_ways)

    # check backup data to see if already processed
    if 'geometry' in backup[i].keys():
        ways[i] = backup[i]
        print "Uploaded from backup"
        print
        i+=1
        continue

    # init array for coordinates
    coordinates = []

    # query the list of nodes
    response = requests.get(url + multi_query(w['nodes']))
    # if query fails => print "Error"
    if response.status_code != 200:
        print "Error"
        continue
    # if query succeeds => find [lon, lat] of each node
    nodes_json = response.json()
    nodes = nodes_json['elements']

    # no way to check for missing nodes
    # might need to do some post-scraping error checking
    for n in nodes:
        print n['id']
        loc = [float(n['lon']), float(n['lat'])]
        coordinates.append(loc)



    # # iterate through node IDs
    # for node in w['nodes']:
    #     # query node
    #     response = requests.get(url + node_query(node))
    #     # check if query was successful
    #     if response.status_code != 200:
    #         print "Could not find node",node
    #         continue
    #     # query successful
    #     print node
    #     # convert to json
    #     node_json = response.json()
    #     # create [lon, lat] point for node
    #     elements = node_json['elements'][0]
    #     loc = [float(elements['lon']), float(elements['lat'])]
    #     # append [lon, lat] to coordinates
    #     coordinates.append(loc)

    # create geometry object
    w['geometry'] = {
        'type' : 'LineString',
        'coordinates' : coordinates
    }

    # every 25 ways => write to file
    if i % 25 == 0:
        json.dump(ways, open(clean_fname, 'wb'))

    # increment the ways index
    i += 1

    print

json.dump(ways, open(clean_fname, 'wb'))
