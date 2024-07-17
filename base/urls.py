from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('', views.catalogo, name='catalogo'),
    path('administrador/', views.admin_list, name='admin_list'),
    path('add_product/', views.add_product, name="add_product"),
    path('delete_models/', views.delete_selected_products, name="delete_models"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)