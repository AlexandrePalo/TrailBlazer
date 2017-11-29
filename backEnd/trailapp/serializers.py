from rest_framework_mongoengine import serializers
from models import *

class GeocachesSerializer(serializers.DocumentSerializer):
    class Meta:
        model = Geocaches
        fields = '__all__'

class ChamberyRoadsSerializer(serializers.DocumentSerializer):
    class Meta:
        model = ChamberyRoads
        fields = '__all__'

class RestaurantsSerializer(serializers.DocumentSerializer):
    class Meta:
        model = Restaurants
        fields = '__all__'

class NeighborhoodsSerializer(serializers.DocumentSerializer):
    class Meta:
        model = Neighborhoods
        fields = '__all__'

class RoadsSerializer(serializers.DocumentSerializer):
    class Meta:
        model = Roads
        fields = '__all__'
