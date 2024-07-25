from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('', views.catalogo, name='default'),
    path('catalogo/', views.catalogo, name='catalogo'),
    path('filter_products/<str:fk>/', views.filter_products, name='filter_products'),
    path('catalogo/<str:category>/', views.categorized_catalog, name="categorized_catalog"),
    path('administrador/', views.admin_list, name='admin_list'),
    path('administrador/add_product/', views.add_product, name="add_product"),
    path('administrador/delete_models/', views.delete_selected_products, name="delete_models"),
    path('administrador/edit/<str:pk>/', views.edit_product, name="edit_product"),
    path('canvas/', views.canvas, name="canvas"),
    path('producto/<str:name>/', views.producto, name='producto')
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)