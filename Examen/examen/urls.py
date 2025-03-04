from django.urls import path
from . import views  # Importamos las vistas correctamente

urlpatterns = [
    path("eventos/", views.eventos, name="eventos"), 
    path("boletos/", views.boletos, name="boletos"), 
    path("", views.home, name="home"),
    path("eventos/lista/", views.eventos_lista, name="eventos_lista"),
    path("eventos/agregar/", views.agregar_evento, name="agregar_evento"),
    path("eventos/eliminar/<int:evento_id>/", views.eliminar_evento, name="eliminar_evento"),
    path("eventos/formulario/", views.formulario_eventos, name="formulario_eventos"),

]
