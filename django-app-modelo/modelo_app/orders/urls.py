
from django.urls import path

from . import views

urlpatterns = [
    path("", views.indexOrders, name="index_orders"),
]