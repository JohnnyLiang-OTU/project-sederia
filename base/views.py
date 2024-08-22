from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from base.models import Product, Category, Counter
from django.contrib.admin.views.decorators import staff_member_required
from django.views.decorators.http import require_POST
from base.forms import ProductForm, CategoryForm
from django.urls import reverse
from django.core.mail import EmailMessage
from django.conf import settings
import json, os
# Create your views here.


def home(request):
    product_query = Product.objects.all()
    context = {'product_query' : product_query}
    return render(request, 'base/home.html', context)

def catalogo(request):
    product_query = Product.objects.all()
    context = {'product_query' : product_query}
    return render(request, 'base/catalogo.html', context)

def categorized_catalog(request, category):
    category = Category.objects.get(name__iexact=category)
    if category:
        product_query = Product.objects.filter(category = category)
    else:
        return HttpResponse("Error 404 - Category No Existe")
    return render(request, 'base/catalogo.html', {'product_query' : product_query})

def filter_products(request, fk):
    query_id = fk
    if query_id:
        if query_id == '0':
            product_query = Product.objects.all()
        else:
            product_query = Product.objects.filter(category_id = query_id)
    else:
        product_query = Product.objects.all()
    
    product_query = list(product_query.values())
    return JsonResponse(data={'product_query' : product_query})

def producto(request, name):
    product = get_object_or_404(Product, name=name)
    return render(request, 'base/producto.html', {'product':product})

def send_email(request):
    email_counter = Counter.objects.get(name='email_counter')
    try:
        data = json.loads(request.body)
        name = data.get('name')
        email = data.get('email')
        telephone = data.get('telephone')
        message = data.get('message')
        body = f"""Nombre: {name}\nEmail: {email}\nTelefono: {telephone}\n\n{message}"""
        email_message = EmailMessage(
            "Quote Request #"+email_counter,
            body,
            settings.EMAIL_HOST_USER,
            ["zicrox2@hotmail.com"],
        )

        email_counter.value += 1
        email_counter.save()

        return JsonResponse({
            "success": True,
        })
    except:
        return JsonResponse({
            "success": False,
        })

# <-------- ADMIN STUFF ---------->

@staff_member_required
def admin_list(request):
    product_query = Product.objects.all()
    category_query = Category.objects.all()
    context = {'product_query' : product_query,
               'category_query' : category_query}
    return render(request, 'admin/admin_list.html', context)

@staff_member_required
def add_product(request):
    if request.method == 'POST':
        product_form = ProductForm(request.POST, request.FILES)
        if product_form.is_valid():
            product_form.save()
            action = request.POST.get('action')
            if action == 'submit_add_another':
                return JsonResponse({
                    'success': True,
                    'redirect_url': reverse('add_product')
                })
            else:
                return JsonResponse({
                    'success': True,
                    'redirect_url': reverse('admin_list'),
                })
        else:
            return JsonResponse({'success': False, 'errors': product_form.errors})
    else:
        product_form = ProductForm()
   
    context = {'product_form': product_form}
    return render(request, 'admin/product_form.html', context)

@staff_member_required
def edit_product(request, pk):
    product = Product.objects.get(id=pk)
    if request.method == 'POST':
        product_form = ProductForm(request.POST, request.FILES, instance=product)
        if product_form.is_valid():
            product_form.save()
            return JsonResponse({'success' : True,
                                 'redirect_url': reverse('admin_list')})
        else:
            return JsonResponse({'success' : False, 'errors': product_form.errors})
    else:
        product_form = ProductForm(instance=product)

    return render(request, 'admin/edit_product.html', {'product_form' : product_form})

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
    
def add_category(request):
    if request.method == 'POST':
        category_form = CategoryForm(request.POST, request.FILES)
        if category_form.is_valid():
            category_form.save()
            action = request.POST.get('action')
            if action == 'submit_add_another':
                return JsonResponse({
                    'success': True,
                    'redirect_url': reverse('add_category')
                })
            else:
                return JsonResponse({
                    'success': True,
                    'redirect_url': reverse('admin_list'),
                })
        else:
            return JsonResponse({'success': False, 'errors': category_form.errors})
    else:
        category_form = CategoryForm()
   
    context = {'category_form': category_form}
    return render(request, 'admin/category_form.html', context)

def canvas(request):
    return render(request, 'base/canvas.html')

# HELPER FUNCTIONS