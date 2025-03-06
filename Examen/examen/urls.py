from django.urls import path
from . import views  # Importamos las vistas correctamente

urlpatterns = [
    path("eventos/", views.eventos, name="eventos"), 
    path("boletos/", views.boletos_todos, name="boletos_todos"),  
    path("boletos/<int:evento_id>/", views.boletos, name="boletos"),  
    path("", views.home, name="home"),
    path("eventos/lista/", views.eventos_lista, name="eventos_lista"),
    path("eventos/agregar/", views.agregar_evento, name="agregar_evento"),
    path("eventos/eliminar/<int:evento_id>/", views.eliminar_evento, name="eliminar_evento"),
    path("eventos/formulario/", views.formulario_eventos, name="formulario_eventos"),
    path("productos/", views.producto, name="productos"),
    path("productos/lista/", views.productos_lista, name="producto_lista"),
    path("productos/agregar/", views.agregar_producto, name="agregar_producto"),  
    path("productos/eliminar/<int:producto_id>/", views.eliminar_producto, name="eliminar_producto"),

]
