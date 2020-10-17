
from rest_framework import routers

from league import views

router = routers.DefaultRouter()
router.register(r'club', views.ClubViewSet)