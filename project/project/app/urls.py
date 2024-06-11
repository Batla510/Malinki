from django.urls import path
from .views import *

urlpatterns = [
    path('login',login),
    path('signup',registration),
    path('logout',logout),
    path('claims',getApps),
    path('claim',createApp),
    path('claim/<int:pk>',login),
    path('admin/<int:pk>',login),
]