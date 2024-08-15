from django.db import models

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=25, blank=False, unique=True)
    parent = models.ForeignKey('self', on_delete=models.PROTECT, null=True, blank=True, related_name='children')

    def __str__(self):
        return f"{self.id}-{self.name}"

class Product(models.Model):
    name = models.CharField(max_length=25, blank=False, unique=False)
    brand = models.CharField(max_length=20, blank=False, unique=False, default="no_brand")
    model = models.CharField(max_length=25, blank=True, unique=False, default="no_model")
    description = models.CharField(max_length=300, blank=True, unique=False)
    price = models.DecimalField(decimal_places=2, default=0.00, blank=True, unique=False, max_digits=5)
    display_price = models.BooleanField(default=False)
    image = models.FileField(null=True, blank=True, upload_to="media/")
    created = models.DateField(auto_now_add=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT, default=2)
    def __str__(self):
        return f'Name: {self.name} || Description: {self.description} || Price: {self.price}'

