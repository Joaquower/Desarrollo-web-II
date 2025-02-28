# Desarrollo-web-II
mkdir Examen

django-admin startproject app Examen


 python manage.py runserver

 python manage.py migrate


python manage.py makemigrations examen

python manage.py sqlmigrate examen 0001

from examen.models import Localidades, Evento,Producto,TipoBoleto,Boleto

q.objects.all()