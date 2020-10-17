from django.db import models


# Create your models here.
# id jest by default

class Club(models.Model):
    name = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    squad = models.ForeignKey('Footballer', on_delete=models.SET_NULL, null=True, blank=True, related_name='+')

    def __str__(self):
        return self.name


class Goal(models.Model):
    TEAM = (
        ('HOME', 'home'),
        ('AWAY', 'away')
    )

    goal_minute = models.IntegerField()
    match = models.ForeignKey('Match', on_delete=models.SET_NULL, null=True, related_name='+')
    footballer = models.ForeignKey('Footballer', on_delete=models.SET_NULL, null=True, blank=True, related_name='+')
    team = models.CharField(choices=TEAM, max_length=255)


class Footballer(models.Model):
    name = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)
    date_of_birth = models.DateField()
    nationality = models.CharField(max_length=255)
    club = models.ForeignKey(Club, on_delete=models.SET_NULL, null=True, blank=True, related_name='+')
    goals = models.ForeignKey(Goal, on_delete=models.SET_NULL, null=True, blank=True, related_name='+')


class Match(models.Model):
    RESULT = (
        ('HOMEWIN', 'home win'),
        ('AWAYWIN', 'away win'),
        ('DRAW', 'draw')
    )
    home_side = models.ForeignKey('Club', on_delete=models.SET_NULL, null=True, blank=True, related_name='+')
    away_side = models.ForeignKey('Club', on_delete=models.SET_NULL, null=True, blank=True, related_name='+')
    match_date = models.DateField()
    goals = models.ForeignKey('Goal', on_delete=models.SET_NULL, null=True, blank=True, related_name='+')
    result = models.CharField(choices=RESULT, max_length=255)
