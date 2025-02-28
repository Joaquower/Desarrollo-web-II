from django.db import models


class Localidades(models.Model):
    name = models.CharField(max_length=100, null=False)
    estatus = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Evento(models.Model):
    name = models.CharField(max_length=300, null=False)
    fecha_inicio = models.DateTimeField(null=False)
    fecha_fin = models.DateTimeField(null=False)
    localidad = models.ForeignKey(Localidades, on_delete=models.CASCADE)  

    def __str__(self):
        return self.name


class Producto(models.Model):
    name = models.CharField(max_length=200, null=False)
    precio = models.FloatField(null=False)  
    localidad = models.ForeignKey(Localidades, on_delete=models.CASCADE)  

    def __str__(self):
        return self.name


class TipoBoleto(models.Model):
    name = models.CharField(max_length=100, null=False)  

    def __str__(self):
        return self.name


class Boleto(models.Model):
    precio = models.FloatField(null=False)
    tipo_boleto = models.ForeignKey(TipoBoleto, on_delete=models.SET_NULL, null=True, blank=True)  
    evento = models.ForeignKey(Evento, on_delete=models.CASCADE) 
    fecha = models.DateTimeField(null=False)

    def __str__(self):
        return f"Boleto para {self.evento.name} - {self.precio} USD"
