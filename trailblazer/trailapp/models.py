from mongoengine import *
from trailblazer.settings import DBNAME

connect(DBNAME, host = "mongodb://readwrite:uHQn1REU6pf2hV1F@dva-shard-00-00-kemze.mongodb.net:27017,dva-shard-00-01-kemze.mongodb.net:27017,dva-shard-00-02-kemze.mongodb.net:27017/test?ssl=true&replicaSet=dva-shard-0&authSource=admin")
#connect(DBNAME)

class Restaurants(Document):
  location = PointField()
  name = StringField(max_length=120)

class Neighborhoods(Document):
  geometry = PolygonField()
  name = StringField(max_length=120)

class Roads(Document):
  geometry = LineStringField()
  properties = DictField()
  meta = {'strict': False}