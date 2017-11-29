from mongoengine import *
from trailblazer.settings import DBNAME

#connect(DBNAME)

class Restaurants(Document):
  location = PointField()
  name = StringField(max_length=120)

class Neighborhoods(Document):
  geometry = PolygonField()
  name = StringField(max_length=120)

class Roads(Document):
  geometry = LineStringField()
  # properties = DictField()
  meta = {'strict': False}

class Geocaches(Document):
  geometry = PointField()
  attributes = ListField(StringField(max_length=50))
  type = StringField()
  difficulty = StringField()
  name = StringField(max_length=120)
  meta = {'strict': False}

class ChamberyRoads(Document):
  geometry = LineStringField()
  # tags = DictField()
  meta = {'strict': False}