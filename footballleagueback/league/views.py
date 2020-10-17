from rest_framework import viewsets

from league import models
from .serializers import ClubSerializer

class ClubViewSet(viewsets.ModelViewSet):
    queryset = models.Club.objects.all()
    serializer_class = ClubSerializer

