from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinLengthValidator

class User(AbstractUser):
    fio = models.CharField(max_length=50)
    phone = models.CharField(max_length=50)
    email = models.EmailField()
    password = models.CharField(validators=[MinLengthValidator(6)],max_length=100)
    login = models.CharField(unique=True,max_length=52)

    USERNAME_FIELD = 'login'
    REQUIRED_FIELDS = ['fio','phone','email','password','username']

    def __str__(self):
        return self.fio

class Statuses(models.Model):
    name = models.CharField(max_length=52)

    def __str__(self):
        return self.name

class Applications(models.Model):
    name = models.CharField(max_length=50)
    auto_num = models.CharField(max_length=50)
    description = models.TextField()
    status = models.ForeignKey(Statuses,on_delete=models.CASCADE)
    user = models.ForeignKey(User,on_delete=models.CASCADE)