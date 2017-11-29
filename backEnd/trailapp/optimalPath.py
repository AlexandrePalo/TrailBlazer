from networkx import *
from itertools import combinations
import random
import Geohash
from geopy.distance import vincenty
from math import hypot
from models import *
from random import randint

def getPath(road, start, poiWeight, trackWeight, minDis, maxDis):

# gatekeeping on the attributes range
  if (poiWeight > 10 or trackWeight > 10):
    return ('Improper Weights')
  if (minDis < 0 or maxDis < 0):
    return ('Distance cannot be less than zero')
# init variables
  G = Graph()
# dictionary to keep hashed coordinates
  d = {}
# init start node. will be updated later to the closest point on a 
# valid waypath
  startnode = 0
# init shortest. This is a variable to keep track of which 
# point on a known path is closest to the starting location
  shortest = maxDis
# a dictionary to store diatance-weight pairs
  weighted = {}
# a dict to store all paths according to their overall weight. 
  paths = {}
# a dictonary to store all traversed edges as pair of hashed nodes
  edges = {}
# a dict to store nodes whose edges have been contracted
  visited = {}
# start building graph using networkx. traverse the road. pick up
# each road's list of coordinates. Add each point to the graph if 
# it hasn't been added already. And add an edge between each point  
# on the road. 
  for r in road:
    coordlist = r.geometry["coordinates"]
    # to keep track of which point in the list we are visiting
    count = 0
    previous = None
    for c in coordlist:
      if not len(c) is 5:
        try :
          c = [c[0], c[1], 0, 0, 0]
        except ValueError:
          return ('Corrupted Data Value')
      #need to hash in the order of latitude and then longtitude
      k = Geohash.encode(c[1],c[0], precision=26)
      if not(k in d):
        d[k] = c;
        G.add_node(k)
      temp = getLength(c, start)
      if temp < shortest:
        shortest = temp
        startnode = k
      if (count != 0):
        #n or nc = previous node, c or k= current node as point tuples
        nc = coordlist[count-1]
        n = previous
        G.add_edge(n, k, weight = getLength(nc,c))
        weighted[getLength(nc,c)] = getWeight(nc,c, trackWeight, poiWeight)
      count += 1
      previous = k

# optimal path finding

  # traverse all neighbor edges, find best weighted edge 
  for i in range(100):
    # start from the startnode
    currentLength = 0
    currentWeight = 0
    currentNode = startnode
    # store list of nodes
    tempPath = []
    # keep traversing while length satisfies criteria
    while currentLength < maxDis:
      # get edge list for current node
      try:
        neighborEdges = G.edges(currentNode,True)
      except NetworkXError:
        return ('No Paths Found')
      bestWeighted = 0
      bestLength = maxDis
      # init best node
      bestNode = None
      # traverse all neighboring edges and pick next node
      for ne in neighborEdges:
        # if it has not been visited
        if not (((ne[0], ne[1]) in edges) or ((ne[1], ne[0]) in edges)) :
          # if it is an optimal edge
          temp = weighted.get(ne[2].get('weight'))
          if temp > bestWeighted:
            bestNode = ne[1]
            bestWeighted = temp
            bestLength = ne[2].get('weight')
      if bestNode is None:
        # register that we have visited all edges of this node
        # then it does not make sense to select the best weighted
        # edge to traverse, since we have already done that
        # so we pick one of its random neighbors to visit
        visited[currentNode] = 1
        count = 0
        # turn the neighbors iterator into a list for better time performance
        # should be okay since graph is not dense
        neighbors = list(G.neighbors(currentNode))
        total = len(neighbors)
        # pick a random best node
        bestNode = neighbors[randint(0,total-1)]
        # if this node's edges have also been all visited
        # repeat until we find one
        while bestNode in visited and count < total:
          count = count + 1
          bestNode = neighbors[randint(0,total-1)]
        if count == total-1:
          bestNode = None
        else:
          currentDecode = Geohash.decode(currentNode)
          bestDecode = Geohash.decode(bestNode)
          currentDecode = [float(currentDecode[0]),float(currentDecode[1])]
          bestDecode = [float(bestDecode[0]),float(bestDecode[1])]
          bestLength = getLength(currentDecode,bestDecode)
      
      if not bestNode is None:
        if not (((currentNode, bestNode) in edges) or ((bestNode, currentNode) in edges)) :
          # store visited edges in dict
          edges[(currentNode, bestNode)] = 1
          edges[(bestNode, currentNode)] = 1
        # visit the best node
        currentNode = bestNode
        bestNode = None
        currentLength = currentLength + bestLength
        currentWeight = currentWeight + bestWeighted
        tempPath.append(currentNode)
      else:
        break
    paths[currentWeight] = tempPath
  #get the best weighted path
  try:
    key_max = max(paths)
  except ValueError:
    return 'No Paths Found'
  print(key_max)
  bestPath = paths[key_max]
  #return as a way object
  newResult = []
  for p in bestPath:
    printHashed(p)
    tp = Geohash.decode(p)
    newResult.append([float(tp[0]),float(tp[1])])
  way = ChamberyRoads(geometry = newResult)
  return way

#calculates the distance between two nodes
def getLength(n,m):
  c1 = (n[1], n[0])
  c2 = (m[1], m[0])
  distance = vincenty(c1,c2).meters
  return distance

#calculates the weighted distance between two nodes
def getWeight(n,m, trackWeight, poiWeight):
  c1 = (n[1], n[0])
  c2 = (m[1], m[0])
  distance = vincenty(c1,c2).meters
  distance = (n[4]*trackWeight/2+1)*distance + (n[3]*trackWeight/2+1)*distance + (m[3]*poiWeight/2+1)*distance+(m[4]*poiWeight/2+1)*distance
  return distance/4

#for debug
def printHashed(n):
  tp = Geohash.decode(n)
  print "{},{}".format(tp[0],tp[1])
def printallpaths(P):
  P = P.values()
  for i in P:
    for j in i:
      printHashed(j)