from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ClubSerializer

from .models import Club


# TO implement /club
# @Path("/{id}") DELETE
# @Path("/add") POST
# @Path("/{id}/update") POST
# @Path("/{id}/squad") GET
# Get club

@api_view(['GET'])
def clubList(request):
    clubs = Club.objects.all()
    serializer = ClubSerializer(clubs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def clubDetail(request, id):
    club = Club.objects.get(id=id)
    serializer = ClubSerializer(club, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def clubCreate(request):
    serializer = ClubSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def clubCreate(request):
    serializer = ClubSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['PUT'])
def clubUpdate(request, id):
    club = Club.objects.get(id=id)
    serializer = ClubSerializer(instance=club, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def clubDelete(request, id):
    club = Club.objects.get(id=id)
    club.delete()
    return Response('Item successfully removed!')
