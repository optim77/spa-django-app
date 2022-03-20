from django.shortcuts import render, redirect
from .serializers import *
from django.http import HttpResponse, JsonResponse, HttpRequest
from django.db.models import Q
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth.models import Permission
from .forms import *
from .models import *


# def login_page(request):
#     page = 'login'
#     if request.user.is_authenticated:
#         return redirect('main')
#
#     if request.method == 'POST':
#         username = request.POST.get('username')
#         password = request.POST.get('password')
#         try:
#             user = User.objects.get(Q(username=username) | Q(email=username))
#         except:
#             messages.error(request, 'User does not exist')
#
#         user = authenticate(request, username=username, password=password)
#
#         if user is not None:
#             login(request, user)
#             return redirect('main')
#         else:
#             messages.error(request, 'Wrong username or password')
#     context = {
#         'page': page
#     }
#     return render(request, 'spacex/sign.html', context)


# def sign_up(request):
#
#     if request.user.is_authenticated:
#         return redirect('main')
#
#     if request.method == 'POST':
#         form = RegistrationForm(request.POST)
#         used = User.objects.filter(email=request.POST.get('email'))
#         print(used)
#         if not used:
#             if form.is_valid():
#                 try:
#                     form.save()
#                     messages.success(request, ' Success! You can login now')
#                     logout(request)
#                     return redirect('main')
#                 except:
#                     messages.error('Something gone wrong, try later')
#         else:
#             messages.error(request, ' This email address is already in our database')
#
#     form = RegistrationForm()
#     context = {
#         'form': form
#     }
#     return render(request, 'spacex/sign_up.html', context)

#
# def logout_user(request):
#     logout(request)
#     return redirect('main')
#
#
# @login_required(login_url='/login')
# def profile(request):
#     items = Item.objects.filter(owner=request.user)
#     context = {
#         'user': request.user,
#         'items': items
#     }
#     return render(request, 'spacex/profile.html', context)


# @login_required(login_url='/login')
# def edit_profile(request):
#
#     if request.method == 'POST':
#         form = UserForm(request.POST, instance=request.user)
#         if form.is_valid():
#             form.save()
#
#
#     form = UserForm(instance=request.user)
#     context = {
#         'form': form
#     }
#     return render(request, 'spacex/edit_profile.html', context)
#
#
# def vendor(request, id):
#     if request.user.id == id:
#         return redirect('profile')
#     seller = User.objects.get(id=id)
#     items = Item.objects.filter(owner=id)
#     context = {
#         'vendor': seller,
#         'items': items
#     }
#     return render(request, 'spacex/vendor.html', context)


def main(request):
    categories = Category.objects.all()
    random = Item.objects.order_by('?')[0:8]
    form = SingUp
    context = {
        'form': form,
        'cat': categories,
        'random': random
    }
    return render(request, 'spacex/main.html', context)


def category(request, slug):
    items = Item.objects.filter(category__slug=slug)
    count = items.count()
    context = {
        'items': items,
        'amount': count
    }
    return render(request, 'spacex/category.html', context)


def item(request, id):
    item = Item.objects.get(id=id)
    similar = Item.objects.filter(Q(name__icontains=item.name[0:10]))[1:7]
    owner = item.owner
    vendor_items = Item.objects.filter(owner=item.owner)
    count = vendor_items.count()
    context = {
        'item': item,
        'similar': similar,
        'owner': owner,
        'amount': count
    }
    return render(request, 'spacex/item.html', context)

#
# @login_required(login_url='/login')
# def add_new_item(request):
#     if request.method == 'POST':
#         new_item = AddNewItemForm(request.POST)
#         if new_item.is_valid():
#             cd = new_item.cleaned_data
#             pc = Item(
#                 name = cd['name'],
#                 description=cd['description'],
#                 image=cd['image'],
#                 price=cd['price'],
#                 category=cd['category'],
#                 owner= request.user
#             )
#             try:
#                 pc.save()
#                 messages.success(request, 'Item was just added!')
#                 return redirect('main')
#             except:
#                 messages.error(request, 'Something gone wrong, try again later')
#     form = AddNewItemForm
#     context = {
#         'form': form
#     }
#     return render(request, 'spacex/add_new.html', context)


# @login_required(login_url='/login')
# def update_item(request, id):
#     item = Item.objects.get(id=id)
#     form = AddNewItemForm(instance=item)
#     context = {
#         'form': form,
#         'id': item.id
#     }
#     if request.method == 'POST':
#         form = AddNewItemForm(request.POST, instance=item)
#         if form.is_valid():
#             try:
#                 form.save()
#                 messages.success(request, 'Item was updated')
#                 return redirect('main')
#             except:
#                 messages.error()
#
#     return render(request, 'spacex/update.html', context)


# def contact(request):
#     form = Contact()
#     context = {
#         'form': form
#     }
#     if request.method == "POST":
#         message = Contact(request.POST)
#         if message.is_valid():
#             cd = message.cleaned_data
#             pc = ContactMessage(
#                 username=cd['username'],
#                 email=cd['email'],
#                 message=cd['message']
#             )
#             try:
#                 pc.save()
#                 messages.success(request, 'Message was sent!')
#             except:
#                 messages.error(request, 'Message was sent!')
#
#     return render(request, 'spacex/contact.html', context)


def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return JsonResponse(serializer.data, safe=False)


def get_random(request):
    random = Item.objects.order_by('?')[0:8]
    serializer = RandomItemSerializer(random, many=True)
    return JsonResponse(serializer.data, safe=False)


def get_category_item(request, slug):
    category_item = Item.objects.filter(category__slug=slug)
    serializer = ItemSerializer(category_item, many=True)
    return JsonResponse(serializer.data, safe=False)


def get_item(request, id):
    item = Item.objects.get(id=id)
    item_serializer = ItemSerializer(item, many=False)

    similar = Item.objects.filter(Q(name__icontains=item.name[0:20])).order_by("?")[1:7]
    similar_serializer = ItemSerializer(similar, many=True)

    owner = item.owner
    vendor_items = Item.objects.filter(owner=item.owner)
    count = vendor_items.count()

    return JsonResponse([[item_serializer.data], [similar_serializer.data]], safe=False)

@csrf_exempt
def sent_message(request):

    ContactMessage.objects.create(
        username=request.POST.get('username', ),
        email=request.POST.get('email', ),
        message=request.POST.get('message',)
    )

    return HttpResponse(request.POST)


@csrf_exempt
def sign(request):

    User.objects.create(
        email=request.POST.get('email'),
        username=request.POST.get('username'),
        password=request.POST.get('password1')
    )

    user = User.objects.get(email=request.POST.get('email'))
    # Token.objects.create(user=user)
    return HttpResponse(request.POST)


def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})

@csrf_exempt
def login_user(request):

    username = request.POST.get('username')
    password = request.POST.get('password')
    user_acc = User.objects.get(username=username)
    permissions = Permission.objects.filter(user=user_acc.id)
    user = authenticate(request, username=username, password=password)
    try:
        is_staff = user.is_staff
    except:
        is_staff = False

    u = {
        'id': user_acc.id,
        'email': user_acc.email,
        'username': user_acc.username,
        'is_staff': is_staff
    }

    return JsonResponse(u, safe=False)

@csrf_exempt
def add_new(request):
    print(request.POST.get('cat'))
    if request.method == 'POST':
        cat = Category.objects.get(name=request.POST.get('cat'))
        user = User.objects.get(id=int(request.POST.get('owner')))
        Item.objects.create(
            name=request.POST.get('name'),
            description=request.POST.get('description'),
            image=request.POST.get('image'),
            price=request.POST.get('price'),
            category=cat,
            owner=user,
        )
        response = {'saved': True}
    else:
        response = {'saved': False}
    return JsonResponse(response, safe=False)


def edit_item(request, id):
    if request.method == 'POST':
        cat = Category.objects.get(name=request.POST.get('cat'))
        Item.objects.filter(id=id).update(
            name=request.POST.get('name'),
            description=request.POST.get('description'),
            image=request.POST.get('image'),
            price=request.POST.get('price'),
            category=cat,
        )
    item = Item.objects.get(id=id)
    serializer = ItemSerializer(item, many=False)
    return JsonResponse(serializer.data, safe=False)


def delete_item(request, id):

    Item.objects.filter(id=id).delete()
    return redirect('main')



def register(request):
    context = {

    }
    return render(request, 'spacex/sign.html', context)

