from django.conf.urls import url
from views import *
from . import views
str1 = r'^(\w+)=(?P<beginLat>(\+||\-)([0-9]*)(\.)*([0-9]*))'
str2 = r'&(\w+)=(?P<beginLng>(\+||\-)([0-9]*)(\.)*([0-9]*))'
str3 = r'&(\w+)=(?P<minDis>([0-9]*))'
str4 = r'&(\w+)=(?P<maxDis>([0-9]*))'
str5 = r'&(\w+)=(?P<poiWeight>([0-9]*))'
str6 = r'&(\w+)=(?P<trackWeight>([0-9]*))$'

urlpatterns = [
url(str1+str2+str3+str4+str5+str6, WayList.as_view()),
]