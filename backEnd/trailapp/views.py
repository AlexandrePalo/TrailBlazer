from optimalPath import *
from models import *
from serializers import *
from mongoengine import*
from django.http import HttpResponse
from django.http import Http404
from pymongo.errors import OperationFailure
from rest_framework import status
from rest_framework.decorators import detail_route, list_route
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from rest_framework_mongoengine import viewsets
import random

class GeocachesViewSet(viewsets.ModelViewSet):
    '''
    Contains information about Geocaces, shows first three examples
    '''
    serializer_class = GeocachesSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get_queryset(self):
        return Geocaches.objects.all()[:3]

class ChamberyRoadsViewSet(viewsets.ModelViewSet):
    '''
    Contains information about ways, shows first three examples
    '''
    serializer_class = ChamberyRoadsSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get_queryset(self):
        return ChamberyRoads.objects.all()[:3]

class RestaurantsViewSet(viewsets.ModelViewSet):
    '''
    Contains information about restaurants, shows syntax of examples
    '''
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = RestaurantsSerializer
    def get_queryset(self):
        neighb = Neighborhoods.objects.all()[:1]
        return Restaurants.objects(location__geo_within=neighb[0].geometry)


class NeighborhoodsViewSet(viewsets.ModelViewSet):
    '''
    Contains information about neighborhoods, shows first three examples
    '''
    serializer_class = NeighborhoodsSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get_queryset(self):
        return Neighborhoods.objects.all()[:3]

class RoadsViewSet(viewsets.ModelViewSet):
    '''
    Contains information about roads, shows an example
    '''
    serializer_class = RoadsSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get_queryset(self):
        return Roads.objects.all()[:10]

    @detail_route(methods=['get'])
    def get3(self, request, *args, **kwargs):
        serializer = self.get_serializer(Roads.objects.all()[:3], many=True)
        return Response(serializer.data)



class WayList(APIView):
    serializer_class = ChamberyRoadsSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = ChamberyRoads.objects.all()[:10]
    def get(self, request, *args, **kwargs):
        try:
            lat= float(self.kwargs['beginLat'])
            lon = float(self.kwargs['beginLng'])
            minDis = float(self.kwargs['minDis'])
            maxDis = float(self.kwargs['maxDis'])
            poiWeight = float(self.kwargs['poiWeight'])
            trackWeight = float(self.kwargs['trackWeight'])
        except Exception:
            return Response({'Error':'Failed to convert args to numericals'})
        
        startLocation = {"type": "Point", "coordinates": [lon, lat]}

        try:
            allroad = ChamberyRoads.objects(geometry__near=[lon,lat], geometry__max_distance=100)
            way = getPath(allroad, (lon,lat), poiWeight, trackWeight, minDis, maxDis)
        except OperationFailure:
            return Response(status=status.HTTP_404_NOT_FOUND) 
        else:
            if type(way) is str:
                return Response({'Error':way})
            serializer = ChamberyRoadsSerializer(way)
            return Response(serializer.data)


