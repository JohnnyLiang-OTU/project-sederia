from django import forms
from .models import Product, Category
from django.forms import TextInput, Textarea

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = "__all__"
        widgets = {
            'price' : TextInput(attrs={'placeholder' : ''}),
            'description': Textarea(attrs={'rows': 8, 'cols': 50}),
        }

class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = "__all__"