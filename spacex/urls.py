from django.urls import path
from . import views
from rest_framework import routers
from .api import CategoryViewSet, RandomItemViewSet, UserViewSet

router = routers.DefaultRouter()
router.register('get_categories/', CategoryViewSet, 'category')
router.register('get_random/', RandomItemViewSet, 'random_items')
router.register('login/', UserViewSet, 'login')

urlpatterns = router.urls

urlpatterns = [
    path('', views.main, name='main'),
    path('contact/', views.sent_message, name='contact'),
    path('category/<slug:slug>/', views.get_category_item, name='category'),
    path('item/<int:id>', views.get_item, name='item'),
    path('sign/', views.sign, name='sign'),
    path('add_new/', views.add_new, name='add_new'),
    # path('profile/', views.account, name='profile'),
    path('get_random/', views.get_random, name='get_random'),
    path('get_categories/', views.get_categories, name='get_categories'),
    path('delete/<int:id>/', views.delete_item, name='delete_item'),
    path('edit/<str:id>/', views.edit_item, name='update_item'),
    path('csrf/', views.csrf),
    path('login_user/', views.login_user, name='login_user'),
    path('add_category/', views.add_category, name='add_category')
    # path('vendor/<int:id>', views.vendor, name='vendor'),
    # path('edit_profile/', views.edit_profile, name='edit_profile'),


    # path('login/', views.login_page, name='login_page'),
    # path('sign_up/', views.sign_up, name='sign_page'),
    # path('logout/', views.logout_user, name='logout'),
]