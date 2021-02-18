from django.urls import path
from . import views
urlpatterns = [
    path('', views.index,name='index'),
    path(r'base_layout',views.base_layout, name='base_layout'),
    path(r'get/feeds',views.get_feeds)
]