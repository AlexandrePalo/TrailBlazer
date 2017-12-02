from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import include, url
from django.contrib import admin
from rest_framework_mongoengine import routers
from trailapp import views

router = routers.DefaultRouter()
router.register(r'geocaches', views.GeocachesViewSet,r"geocaches")
router.register(r'chamberyways', views.ChamberyRoadsViewSet,r"chamberyways")
router.register(r'Restaurants', views.RestaurantsViewSet,r"Restaurants")
router.register(r'Neighborhoods', views.NeighborhoodsViewSet,r"Neighborhoods")
router.register(r'Roads', views.RoadsViewSet,r"Roads")

# Wire up our API using automatic URL routing.
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^trailapp/', include('trailapp.urls', namespace='roads')),
    url(r'^api/', include(router.urls, namespace='api')),
]