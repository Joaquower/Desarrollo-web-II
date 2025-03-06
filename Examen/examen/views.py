from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404
from .models import Evento, Boleto, Localidades, Producto, TipoBoleto
from django.shortcuts import render, get_object_or_404, redirect
from django.utils.timezone import now
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime





def eventos(request):
    eventos = Evento.objects.all()  
    return render(request, "eventos.html", {"eventos": eventos})

def boletos_todos(request):
    boletos = Boleto.objects.all()
    return render(request, "boletos.html", {"boletos": boletos, "evento": None})  # No hay evento específico


def boletos(request, evento_id):
    evento = get_object_or_404(Evento, id=evento_id)
    boletos = Boleto.objects.filter(evento=evento)

    return render(request, "boletos.html", {"boletos": boletos, "evento": evento})


def home(request):
    return render(request, "home.html")




def eventos_lista(request):
    eventos = Evento.objects.all().values("id", "name", "fecha_inicio", "fecha_fin", "localidad__name")
    return JsonResponse({"eventos": list(eventos)}, safe=False)



@csrf_exempt
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


            fecha_inicio_obj = datetime.fromisoformat(fecha_inicio)
            fecha_fin_obj = datetime.fromisoformat(fecha_fin)


            if fecha_fin_obj < fecha_inicio_obj:
                return JsonResponse({"error": "La fecha de fin no puede ser menor que la de inicio."}, status=400)


            if fecha_inicio_obj.date() <= now().date():
                return JsonResponse({"error": "La fecha de inicio debe ser mayor al día de hoy."}, status=400)

            localidad = Localidades.objects.get(id=localidad_id)

            evento_existente = Evento.objects.filter(
                localidad=localidad, fecha_inicio__date=fecha_inicio_obj.date()
            ).exists()

            if evento_existente:
                return JsonResponse({"error": "No puedes agregar dos eventos seguidos en la misma localidad."}, status=400)

            evento = Evento.objects.create(
                name=name,
                fecha_inicio=fecha_inicio_obj,
                fecha_fin=fecha_fin_obj,
                localidad=localidad
            )

            tipos_boletos = TipoBoleto.objects.all()
            boletos_creados = []

            for tipo in tipos_boletos:
                boleto = Boleto.objects.create(
                    precio=100.0,  
                    tipo_boleto=tipo,
                    evento=evento,
                    fecha=fecha_inicio_obj 
                )
                boletos_creados.append({
                    "id": boleto.id,
                    "tipo": tipo.name,
                    "precio": boleto.precio
                })

            return JsonResponse({
                "success": "Evento y boletos creados exitosamente",
                "evento": {
                    "id": evento.id,
                    "name": evento.name,
                    "fecha_inicio": evento.fecha_inicio,
                    "fecha_fin": evento.fecha_fin,
                    "localidad": localidad.name
                },
                "boletos": boletos_creados
            }, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt  
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


#seccion de productos
def producto(request):
    productos = Producto.objects.all()
    localidades = Localidades.objects.all()  
    return render(request, "productos.html", {"productos": productos, "localidades": localidades})

def productos_lista(request):
    productos = Producto.objects.all().values(
        "id", "name", "precio", "localidad__name", "fecha_inicio", "fecha_fin"
    )
    return JsonResponse({"productos": list(productos)}, safe=False, status=200)

@csrf_exempt
def agregar_producto(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            name = data.get("name")
            precio = data.get("precio")
            localidad_id = data.get("localidad")
            fecha_inicio = data.get("fecha_inicio")
            fecha_fin = data.get("fecha_fin")

            if not name or not precio or not localidad_id or not fecha_inicio or not fecha_fin:
                return JsonResponse({"error": "Todos los campos son obligatorios"}, status=400)

            if float(precio) <= 0:
                return JsonResponse({"error": "El precio del producto debe ser mayor a 0"}, status=400)

            # Contar productos agregados hoy
            productos_hoy = Producto.objects.filter(fecha_inicio__date=now().date()).count()
            if productos_hoy >= 10:
                return JsonResponse({"error": "Solo se pueden agregar 10 productos por día"}, status=400)

            localidad = Localidades.objects.get(id=localidad_id)

            producto = Producto.objects.create(
                name=name,
                precio=precio,
                localidad=localidad,
                fecha_inicio=fecha_inicio,
                fecha_fin=fecha_fin
            )

            return JsonResponse({"success": "Producto agregado exitosamente", "producto": {
                "id": producto.id,
                "name": producto.name,
                "precio": producto.precio,
                "localidad": localidad.name,
                "fecha_inicio": producto.fecha_inicio,
                "fecha_fin": producto.fecha_fin
            }}, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt  # Desactivar CSRF solo para pruebas (recomendado implementar CSRF Token en producción)
def eliminar_producto(request, producto_id):
    if request.method == "DELETE":
        try:
            producto = get_object_or_404(Producto, id=producto_id)
            producto.delete()
            return JsonResponse({"success": "Producto eliminado exitosamente"}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)
