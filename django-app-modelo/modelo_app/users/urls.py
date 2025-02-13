from django.urls import path

from . import views

urlpatterns = [
    path("home", views.indexUsers, name="index_users"),
]