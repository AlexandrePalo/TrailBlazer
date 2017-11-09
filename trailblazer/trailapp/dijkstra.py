from networkx import *
from itertools import combinations
import random
from math import hypot
def dijkstra(rest):
  G = Graph()
  nodes = []
  for r in rest:
      G.add_node(r.name, pos=r.location["coordinates"])
      nodes.append([r.name,r.location["coordinates"]])
  #path = dict(all_pairs_dijkstra_path(G))
  for n in nodes:
    for m in nodes:
      if random.randint(1,101) < 40:
        G.add_edge(n[0],m[0], weight = getLength(n,m))
  path = dict(nx.all_pairs_dijkstra_path(G,weight='weight'))
  print(path[nodes[7][0]][nodes[67][0]])

#right now it just calculates the distance between two points
#this will need to be further weighted with the importance rating
def getLength(n,m):
  return hypot(n[1][0]-m[1][0], n[1][1] + m[1][1])