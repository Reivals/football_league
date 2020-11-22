from django.urls import path
from . import views

urlpatterns = [
    path('club', views.clubList, name='club-list'),
    path('club/add', views.clubCreate, name='club-create'),
    path('club/<str:id>/', views.clubDetail, name='club-details'),
    path('club/<str:id>/update', views.clubUpdate, name='club-update'),
    path('club/<str:id>/', views.clubDelete, name='club-delete'),

    path('footballer', views.footballerList, name='footballer-list'),
    path('footballer/add', views.footballerCreate, name='footballer-create'),
    path('footballer/<str:id>/', views.footballerDetail, name='footballer-details'),
    path('footballer/<str:id>/update', views.footballerUpdate, name='footballer-update'),
    path('footballer/<str:id>/', views.footballerDelete, name='footballer-delete'),

    path('match', views.matchList, name='match-list'),
    path('match/add', views.matchCreate, name='match-create'),
    path('match/<str:id>/', views.matchDetail, name='match-details'),
    path('match/<str:id>/update', views.matchUpdate, name='match-update'),
    path('match/<str:id>/', views.matchDelete, name='match-delete'),

    path('goal', views.goalList, name='goal-list'),
    path('goal/add', views.goalCreate, name='goal-create'),
    path('goal/<str:id>/', views.goalDetail, name='goal-details'),
    path('goal/<str:id>/update', views.goalUpdate, name='goal-update'),
    path('goal/<str:id>/', views.goalDelete, name='goal-delete'),
]
