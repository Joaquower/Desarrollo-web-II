from django.db import models



class Users(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    age = models.IntegerField()
    rfc = models.CharField(max_length=13)
    photo = models.CharField(max_length=200)
    created_dated_at = models.DateTimeField(auto_now=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class User_addres(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    street = models.CharField(max_length=150)
    zip_code = models.IntegerField()
    city = models.CharField(max_length=150)
    country = models.CharField(max_length=150)
    created_date = models.DateTimeField(auto_now=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.user_id) + ' - ' + self.street