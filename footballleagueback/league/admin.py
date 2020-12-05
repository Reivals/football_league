from django.contrib import admin

# Register your models here.
from .models import Club, Goal, Footballer, Match, Card

admin.site.register(Club)
admin.site.register(Goal)
admin.site.register(Footballer)
admin.site.register(Match)
admin.site.register(Card)
