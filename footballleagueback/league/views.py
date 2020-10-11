from rest_framework import viewsets

from league import models
from .serializers import ClubSerializer, FootballerSerializer, MatchSerializer, GoalSerializer


class ClubViewSet(viewsets.ModelViewSet):
    queryset = models.Club.objects.all()
    serializer_class = ClubSerializer

class FootballerViewSet(viewsets.ModelViewSet):
    queryset = models.Footballer.objects.all()
    serializer_class = FootballerSerializer

class GoalViewSet(viewsets.ModelViewSet):
    queryset = models.Goal.objects.all()
    serializer_class = GoalSerializer

class MatchViewSet(viewsets.ModelViewSet):
    queryset = models.Match.objects.all()
    serializer_class = MatchSerializer

