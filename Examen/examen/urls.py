from django.urls import path
from . import views  # Importamos las vistas correctamente

urlpatterns = [
    path("eventos/", views.eventos, name="eventos"),  # Página de eventos
    path("boletos/", views.boletos, name="boletos"),  # Página de boletos
    path("", views.home, name="home"),  # Página de boletos

]
