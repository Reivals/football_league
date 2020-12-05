
from rest_framework import routers

from league import views

router = routers.DefaultRouter()
router.register(r'club', views.ClubViewSet)
router.register(r'footballer', views.FootballerViewSet)
router.register(r'match', views.MatchViewSet)
router.register(r'goal', views.GoalViewSet)
router.register(r'card', views.CardViewSet)