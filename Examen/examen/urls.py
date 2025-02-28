from django.urls import path
from . import views  # Importamos las vistas correctamente

urlpatterns = [
    path("eventos/", views.eventos, name="eventos"), 
    path("boletos/", views.boletos, name="boletos"), 
    path("", views.home, name="home"),  

]
