
from django.urls import path

from . import views

urlpatterns = [
    path("home", views.indexOrders, name="index_orders"),
]