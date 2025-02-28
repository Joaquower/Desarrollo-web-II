from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404
from .models import Evento, Boleto
from django.shortcuts import render, get_object_or_404, redirect


def eventos(request):
    eventos = Evento.objects.all()  
    return render(request, "eventos.html", {"eventos": eventos})


def boletos(request):
    boletos = Boleto.objects.all()  
    return render(request, "boletos.html", {"boletos": boletos})


def home(request):
    return render(request, "home.html")
