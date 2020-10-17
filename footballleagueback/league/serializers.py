from rest_framework import serializers
from .models import Club, Footballer, Match, Goal


class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = '__all__'  # display all fields

class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = '__all__'  # display all fields

class FootballerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Footballer
        fields = '__all__'  # display all fields

class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = '__all__'  # display all fields
