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
]
