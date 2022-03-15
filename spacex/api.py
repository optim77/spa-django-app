from .models import Category, Item, User
from .forms import SingUp
from rest_framework import viewsets, permissions
from .serializers import *
from rest_framework import mixins, viewsets
from rest_framework.response import Response
from django.shortcuts import get_object_or_404


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CategorySerializer

    def get_queryset(self):
        return self.request.user.all()


class RandomItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.order_by('?')[0:8]
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = RandomItemSerializer


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ItemSerializer


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ContactSerializer


class UserViewSet(viewsets.ViewSet):

    def list(self, request):
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, id=None):
        queryset = User.objects.all()
        user = get_object_or_404(queryset, id=id)
        serializer = UserSerializer(user)
        return Response(serializer.data)

