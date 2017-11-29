from networkx import *
from itertools import combinations
import random
import Geohash
from geopy.distance import vincenty
from math import hypot
from models import *

def getPath(road, start, poiWeight, trackWeight, minDis, maxDis):
  
  if (poiWeight > 10 or trackWeight > 10):
    return ('Improper Weights')
  if (minDis < 0 or maxDis < 0):
    return ('Distance cannot be less than zero')

  G = Graph()
  d = {}
  desiredNodes = []
  startnode = 0
  shortest = maxDis
  paths = {}
  for r in road:
    coordlist = r.geometry["coordinates"]
    count = 0
    tempShort = maxDis
    for c in coordlist:
      k = Geohash.encode(c[1],c[0])
      if not(k in d):
        d[k] = c;
        G.add_node(k)
      temp = getLength((c[1],c[0]), start)
      if temp < shortest:
        shortest = temp
        startnode = k
      if temp < tempShort and temp > minDis and temp < maxDis:
        tempShort = temp
        if not(k in desiredNodes):
          desiredNodes.append(k)
      if (count != 0):
        n = coordlist[count-1]
        G.add_edge(Geohash.encode(n[1],n[0]), k, weight = getLength(n,c))
      count += 1
  for n in desiredNodes:
    try :
      paths[n] = astar_path_length(G,startnode,n)
    except NetworkXNoPath:
      paths[n] = 0
      
  try:
    key_max = max(paths.keys(), key=(lambda k: paths[k]))
  except ValueError:
    return 'No Paths Found'

  while paths[key_max] > maxDis:
    paths.pop(key_max)
    key_max = max(paths.keys(), key=(lambda k: paths[k]))

  path = astar_path(G, startnode, key_max)

  newResult = []
  for p in path:
    tp = Geohash.decode(p)
    newResult.append([float(tp[0]),float(tp[1])])
  way = Roads(geometry = newResult)
  return way

def getLength(n,m):
  return vincenty(n,m).meters
