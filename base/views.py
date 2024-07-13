from django.shortcuts import render
from django.http import HttpResponse
from base.models import Product
# Create your views here.

def catalogo(request):
    product_query = Product.objects.all()
    context = {'product_query' : product_query}
    return render(request, 'base/catalogo.html', context)
