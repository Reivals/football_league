from django.urls import path

from . import views

urlpatterns = [
    path('club/', views.clubList, name='club-list'),
    path('club/', views.clubCreate, name='club-create'),
    path('club/<str:id>/', views.clubDetail, name='club-details'),
    path('club/<str:id>/', views.clubUpdate, name='club-update'),
    path('club/<str:id>/', views.clubDelete, name='club-delete'),
]
