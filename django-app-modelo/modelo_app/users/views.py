from django.shortcuts import render
from django.http import HttpResponse



def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")



from .models import Users
import django.db

def indexUsers(request):
    user = Users.objects.all()
    data = {
        "users": user,
        "title": 'Usuarios',
    }
    return render(request, 'users/index.html', data)
