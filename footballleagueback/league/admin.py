from django.contrib import admin

# Register your models here.
from .models import Club, Goal, Footballer, Match

admin.site.register(Club)
admin.site.register(Goal)
admin.site.register(Footballer)
admin.site.register(Match)
