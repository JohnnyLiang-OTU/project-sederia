from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from base.models import Product
from django.contrib.admin.views.decorators import staff_member_required
from django.views.decorators.http import require_POST
from base.forms import ProductForm
import json

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

@staff_member_required
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

@require_POST
@staff_member_required
def delete_selected_products(request):
    try:
        data = json.loads(request.body)
        ids = data.get('ids', [])
        if ids:
            for e in ids:
                Product.objects.get(pk=e).delete()
            return JsonResponse({'status':'success'}, status=200)
        else:
            return JsonResponse({'status':'error',
                                 'message':'No IDs provided'}, status=400)

    except Exception as e:
        return JsonResponse({
            'status' : 'error',
            'message' : str(e)
        }, status=500)