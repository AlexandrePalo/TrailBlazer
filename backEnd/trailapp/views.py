from models import *
from django.http import HttpResponse
from mongoengine import*
from dijkstra import *
from path import *
from geopy.distance import vincenty
import random

def index(request):

    # Get neighborhood from a point
    neighb = Neighborhoods.objects(geometry__geo_intersects={"type": "Point", "coordinates": [-73.93414657, 40.82302903]})
    #get all restaurants within neighborhoods
    rest = Restaurants.objects(location__geo_within=neighb[0].geometry)
    #rest is a lsit of objects. Each object contains 
    #a name and location field. The location field is a dictionary with
    #type and coordinate keys. Coordinates key corresponds to list of floats. i.e. [x,y]
    i1 = random.randint(1,len(rest))
    i2 = random.randint(1,len(rest))
    rest1 = rest[i1]
    rest2 = rest[i2]
    print(rest1.name)
    print(rest2.name)
    r1x = rest1.location['coordinates'][1]
    r1y = rest1.location['coordinates'][0]
    r2x = rest2.location['coordinates'][1]
    r2y = rest2.location['coordinates'][0]
    distance = vincenty((r1x,r1y),(r2x,r2y)).meters
    allroad1 = Roads.objects(geometry__near=rest1.location, geometry__max_distance=distance)
    allroad2 = Roads.objects(geometry__near=rest2.location, geometry__max_distance=distance)

    return HttpResponse(getPath(allroad1,allroad2,(r1x,r1y),(r2x,r2y),distance))

