from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404
from .models import Evento, Boleto, Localidades
from django.shortcuts import render, get_object_or_404, redirect
from django.utils.timezone import now
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt  # Importa esto




def eventos(request):
    eventos = Evento.objects.all()  
    return render(request, "eventos.html", {"eventos": eventos})


def boletos(request):
    boletos = Boleto.objects.all()  
    return render(request, "boletos.html", {"boletos": boletos})


def home(request):
    return render(request, "home.html")




def eventos_lista(request):
    eventos = Evento.objects.all().values("id", "name", "fecha_inicio", "fecha_fin", "localidad__name")
    return JsonResponse({"eventos": list(eventos)}, safe=False)



@csrf_exempt  # Desactiva temporalmente la protección CSRF
def agregar_evento(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)  
            name = data.get("name")
            fecha_inicio = data.get("fecha_inicio")
            fecha_fin = data.get("fecha_fin")
            localidad_id = data.get("localidad")

            if not name or not fecha_inicio or not fecha_fin or not localidad_id:
                return JsonResponse({"error": "Todos los campos son obligatorios"}, status=400)

            if fecha_fin < fecha_inicio:
                return JsonResponse({"error": "La fecha de fin no puede ser menor a la de inicio"}, status=400)

            localidad = Localidades.objects.get(id=localidad_id)

            if Evento.objects.filter(localidad=localidad).exists():
                return JsonResponse({"error": "Ya hay un evento en esta localidad"}, status=400)

            evento = Evento.objects.create(
                name=name,
                fecha_inicio=fecha_inicio,
                fecha_fin=fecha_fin,
                localidad=localidad
            )
            return JsonResponse({"success": "Evento agregado exitosamente", "evento": {
                "id": evento.id,
                "name": evento.name,
                "fecha_inicio": evento.fecha_inicio,
                "fecha_fin": evento.fecha_fin,
                "localidad": localidad.name
            }}, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)



@csrf_exempt  # Desactivar CSRF solo para pruebas (Recomendado implementar CSRF Token en producción)
def eliminar_evento(request, evento_id):
    if request.method == "DELETE":
        try:
            evento = get_object_or_404(Evento, id=evento_id)
            evento.delete()
            return JsonResponse({"success": "Evento eliminado exitosamente"}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)


def eventos_lista(request):
    eventos = Evento.objects.all().values("id", "name", "fecha_inicio", "fecha_fin", "localidad__name")
    return JsonResponse({"eventos": list(eventos)}, status=200)

def formulario_eventos(request):
    localidades = Localidades.objects.all()
    return render(request, "formulario_eventos.html", {"localidades": localidades})