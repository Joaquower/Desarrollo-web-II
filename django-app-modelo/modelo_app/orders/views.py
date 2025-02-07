from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

def indexOrders(request):
    return HttpResponse("hello, woed. You are at orders index") 