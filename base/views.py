from django.shortcuts import render, redirect
from django.http import HttpResponse
from base.models import Product
from django.contrib.admin.views.decorators import staff_member_required
from base.forms import ProductForm
# Create your views here.

def catalogo(request):
    product_query = Product.objects.all()
    context = {'product_query' : product_query}
    return render(request, 'base/catalogo.html', context)





# <-------- ADMIN STUFF ---------->

@staff_member_required
def admin_list(request):
    product_query = Product.objects.all()
    context = {'product_query' : product_query}
    return render(request, 'admin/admin_list.html', context)

def add_product(request):
    if request.method == 'POST':
        product_form = ProductForm(request.POST, request.FILES)
        if product_form.is_valid():
            product_form.save()
            if 'submit_add_another' in request.POST:
                return redirect('add_product')
            else:
                return redirect('admin_list')
    else:
        product_form = ProductForm()
    
    context = {'product_form' : product_form}
    return render(request, 'admin/product_form.html', context)