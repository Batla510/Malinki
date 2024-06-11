from django.shortcuts import render
from .serializers import *
from .models import *
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from rest_framework.authtoken.models import Token
from .permissions import IsClient

@api_view(['GET'])
def login(request):
    user_ser = LoginSer(data=request.data)
    if user_ser.is_valid():
        try:
            user = User.objects.get(login=user_ser.validated_data['login'])
        except:
            return Response({'error':{'code':401,"message": "Authentication failed"}},status=401)
        token,_ = Token.objects.get_or_create(user=user)
        if user.is_staff:
            isAdmin = True
        else:
            isAdmin = False
        return Response({'data':{'user_token':token.key,'isAdmin':isAdmin}},status=200)
    return Response({'error':{'code':422,'message':'Validation error','errors':user_ser.errors}},status=422)

@api_view(['POST'])
def registration(request):
    user_ser = RegSer(data=request.data)
    if user_ser.is_valid():
        user = user_ser.save()
        token = Token.objects.create(user=user)
        if user.is_staff:
            isAdmin = True
        else:
            isAdmin = False
        return Response({'data': {'user_token': token.key, 'isAdmin': isAdmin}}, status=200)
    return Response({'error': {'code': 422, 'message': 'Validation error', 'errors': user_ser.errors}}, status=422)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def logout(request):
    request.user.auth_token.delete()
    return Response({'data':{'mesaage':'logout'}},status=200)

@api_view(['GET'])
def getApps(request):
    if request.user.is_staff:
        return Response({'error':{'code':403,'message':'Forbidden for you'}},status=403)
    elif request.user.is_authenticated:
        apps = Applications.objects.filter(user=request.user)
    else:
        apps = Applications.objects.all()
    apps_ser = ApplicationsSer(apps,many=True)
    apps = []
    for app in apps_ser.data:
        newApp ={
            'id':app['id'],
            'name': app['name'],
            'auto_num': app['auto_num'],
            'description': app['description'],
            'status': app['status']['name'],
        }
        apps.append(newApp)
    return Response({'data':apps},status=200)

@api_view(['POST'])
@permission_classes([IsClient])
def createApp(request):
    app_ser = ApplicationsSerCreate(datta=request.data)
    if app_ser.is_valid():
        Applications.objects.create(name=app_ser.validated_data['name'],
                                    auto_num=app_ser.validated_data['auto_num'],
                                    description=app_ser.validated_data['description'],
                                    user=request.user)
        return Response({'data':{'message':'Your claim added'}},status=201)
    return Response({'error':{'code':422,'message':'Validation error','errors':app_ser.errors}},status=422)

@api_view(['DELETE'])
@permission_classes([IsClient])
def changeAppForClient(request,pk):
    try:
        app = Applications.objects.get(pk=pk,user=request.user)
    except:
        return Response({'error':{'code':404,'message':'Not found'}},status=404)
    app.delete()
    return Response({'data':{'message':'Claim was removed'}},status=200)

@api_view(['PATCH','DELETE'])
@permission_classes([IsAdminUser])
def changeAppForAdmin(request,pk):
    try:
        app = Applications.objects.get(pk=pk)
    except:
        return Response({'error': {'code': 404, 'message': 'Not found'}}, status=404)
    if request.method == 'DELETE':
        app.delete()
        return Response({'data': {'message': 'Claim was removed'}}, status=200)
    elif request.method == 'PATCH':

        app_ser = ApplicationsSerForAdmin(data=request.data,instance=app,partial=True)
        if app_ser.is_valid():
            app_ser.save()
            app = app_ser.data
            status = Statuses.objects.get(pk=int(app['status']))
            print(status.name)
            newApp = {
                'id': app['id'],
                'name': app['name'],
                'auto_num': app['auto_num'],
                'description': app['description'],
                'status': status.name,
            }
            return Response({'data':newApp})
        return Response({'error': {'code': 422, 'message': 'Validation error', 'errors': app_ser.errors}}, status=422)