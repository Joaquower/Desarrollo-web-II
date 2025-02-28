from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404
from .models import Evento, Boleto
from django.shortcuts import render, get_object_or_404, redirect

# 📌 Mostrar la lista de eventos
def eventos(request):
    eventos = Evento.objects.all()  # Obtiene todos los eventos
    return render(request, "eventos.html", {"eventos": eventos})

# 📌 Mostrar la lista de boletos
def boletos(request):
    boletos = Boleto.objects.all()  # Obtiene todos los boletos
    return render(request, "boletos.html", {"boletos": boletos})

# 📌 Página de inicio
def home(request):
    return render(request, "home.html")
