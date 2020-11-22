from rest_framework import viewsets

from league import models
from .serializers import ClubSerializer, FootballerSerializer


class ClubViewSet(viewsets.ModelViewSet):
    queryset = models.Club.objects.all()
    serializer_class = ClubSerializer

class FootballerViewSet(viewsets.ModelViewSet):
    queryset = models.Footballer.objects.all()
    serializer_class = FootballerSerializer

