from networkx import *
from itertools import combinations
import random
import Geohash
from geopy.distance import vincenty
from math import hypot

def getPath(road1, road2, start, end, distance):
  G = Graph()
  d = {}

  startnode = 0
  shortest = distance
  for r in road1:
    coordlist = r.geometry["coordinates"]
    count = 0
    for c in coordlist:
      k = Geohash.encode(c[1],c[0])
      if not(k in d):
        d[k] = c;
        G.add_node(k)
      temp = getLength((c[1],c[0]), start)
      if temp < shortest:
        shortest = temp
        startnode = k
      if (count != 0):
        n = coordlist[count-1]
        G.add_edge(Geohash.encode(n[1],n[0]), k, weight = getLength(n,c))
      count += 1

  endnode = 0
  shortest = distance
  for r in road2:
    coordlist = r.geometry["coordinates"]
    count = 0
    for c in coordlist:
      k = Geohash.encode(c[1],c[0])
      if not(k in d):
        d[k] = c;
        G.add_node(k)
      temp = getLength((c[1],c[0]), end)
      if temp < shortest:
        shortest = temp
        endnode = k
      if (count != 0):
        n = coordlist[count-1]
        G.add_edge(Geohash.encode(n[1],n[0]), k, weight = getLength(n,c))
      count += 1

  path = astar_path(G,startnode,endnode)
  result = []
  for p in path:
    result.append(', '.join(Geohash.decode(p)))
  return '<br/>'.join(result)

def getLength(n,m):
  return vincenty(n,m).meters
