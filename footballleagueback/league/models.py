from enumchoicefield import EnumChoiceField

from .enums import Result, Position, Side, CardType
from django.db import models


class Club(models.Model):
    name = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    country = models.CharField(max_length=255)

    def __str__(self):
        return 'Club(name=' + self.name + ', city=' + self.city + ')'


class Goal(models.Model):
    goalMinute = models.IntegerField()
    match = models.ForeignKey('Match', on_delete=models.CASCADE, null=True, related_name='goals')
    footballer = models.ForeignKey('Footballer', on_delete=models.SET_NULL, null=True, blank=True, related_name='+')
    side = EnumChoiceField(enum_class=Side)

    def __str__(self):
        return 'Goal(match=' + str(self.match) + ', footballer=' + str(self.footballer) + ', goal minute=' + str(
            self.goalMinute) + ', team=' + str(self.side) + ')'


class Footballer(models.Model):
    name = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)
    dateOfBirth = models.DateField()
    nationality = models.CharField(max_length=255)
    club = models.ForeignKey(Club, on_delete=models.SET_NULL, null=True, blank=True, related_name='+')
    goals = models.ForeignKey(Goal, on_delete=models.SET_NULL, null=True, blank=True, related_name='+')
    position = EnumChoiceField(enum_class=Position)
    squad = models.ForeignKey(to=Club, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return 'Footballer(name=' + self.name + ', surname=' + self.surname + ')'


class Match(models.Model):
    homeSide = models.ForeignKey('Club', on_delete=models.SET_NULL, null=True, blank=True, related_name='+')
    awaySide = models.ForeignKey('Club', on_delete=models.SET_NULL, null=True, blank=True, related_name='+')
    matchDate = models.DateField()
    result = EnumChoiceField(enum_class=Result)

    def __str__(self):
        return 'Match(homeSide=' + str(self.homeSide) + ', awaySide=' + str(self.awaySide) + ', matchMate=' + str(
            self.matchDate) + ')'


class Card(models.Model):
    minute = models.IntegerField()
    match = models.ForeignKey('Match', on_delete=models.CASCADE, null=True, related_name='cards')
    footballer = models.ForeignKey('Footballer', on_delete=models.SET_NULL, null=True, blank=True, related_name='+')
    side = EnumChoiceField(enum_class=Side)
    reason = models.CharField(max_length=255)
    type = EnumChoiceField(enum_class=CardType)
