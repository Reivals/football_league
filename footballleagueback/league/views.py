from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from league import models
from .serializers import ClubSerializer, FootballerSerializer, MatchSerializer, GoalSerializer, CardSerializer
from .enums import Result, Position, CardType


class ClubViewSet(viewsets.ModelViewSet):
    queryset = models.Club.objects.all()
    serializer_class = ClubSerializer



class FootballerViewSet(viewsets.ModelViewSet):
    queryset = models.Footballer.objects.all()
    serializer_class = FootballerSerializer

    @action(detail=False, methods=['GET'], name='Get positions')
    def positions(self, request, *args, **kwargs):
        return Response([str(Position.STRIKER),
                         str(Position.DEFENDER),
                         str(Position.MIDFIELDER),
                         str(Position.GOALKEEPER)])


class GoalViewSet(viewsets.ModelViewSet):
    queryset = models.Goal.objects.all()
    serializer_class = GoalSerializer


class MatchViewSet(viewsets.ModelViewSet):
    queryset = models.Match.objects.all()
    serializer_class = MatchSerializer

    @action(detail=False, methods=['GET'], name='Get results')
    def result(self, request, *args, **kwargs):
        return Response([str(Result.HOMEWIN),
                         str(Result.AWAYWIN),
                         str(Result.DRAW)])

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        if not queryset.exists():
            return Response([], status=status.HTTP_200_OK)
        else:
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)


class CardViewSet(viewsets.ModelViewSet):
    queryset = models.Card.objects.all()
    serializer_class = CardSerializer

    @action(detail=False, methods=['GET'], name='Get card types')
    def cardTypes(self, request, *args, **kwargs):
        return Response([str(CardType.YELLOW),
                         str(CardType.RED)])
