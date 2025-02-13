from django.shortcuts import render
# Create your views here.
from django.http import HttpResponse

from .models import Question
import django.db

def indexOrders(request):
    questions = Question.objects.all()
    data = {

        "questions": questions,

        "title": 'Pedidos',
        "Total_orders":100,
        "total_payments":200,
        "orders":[
            {'id':'1','name':'Orden 1'},
            {'id':'2','name':'Orden 2'},
            {'id':'3','name':'Orden 3'}
        ]
    }
    return render(request, 'orders/index.html', data)
