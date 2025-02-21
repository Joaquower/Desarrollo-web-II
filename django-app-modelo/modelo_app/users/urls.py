from django.urls import path

from . import views

urlpatterns = [
    path("", views.indexUsers, name="indexusers"),
    path("create", views.createUserView, name="createUserView"),
    path("createUser", views.createUser, name="createUser"),
    path("details/<int:id>", views.userDetail, name="userDetail")

]