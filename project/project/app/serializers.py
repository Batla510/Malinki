from rest_framework import serializers
from .models import *

class LoginSer(serializers.Serializer):
    login = serializers.CharField()
    password = serializers.CharField()

class RegSer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['fio','phone','email','password','login']

    def save(self, **kwargs):
        user = User(
            fio = self.validated_data['fio'],
            phone=self.validated_data['phone'],
            email=self.validated_data['email'],
            login=self.validated_data['login'],
            username=self.validated_data['login'],
        )
        user.set_password(self.validated_data['password'])
        user.save()
        return user
class StatusesSer(serializers.ModelSerializer):
    class Meta:
        model = Statuses
        fields = '__all__'

class ApplicationsSer(serializers.ModelSerializer):
    status = StatusesSer()
    class Meta:
        model = Applications
        fields = ['id','name','auto_num','description','status']
class ApplicationsSerCreate(serializers.ModelSerializer):
    class Meta:
        model = Applications
        fields = ['name','auto_num','description']
class ApplicationsSerForAdmin(serializers.ModelSerializer):
    class Meta:
        model = Applications
        fields = ['id','name','auto_num','description','status']