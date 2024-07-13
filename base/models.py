from django.db import models

# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=25, blank=False, unique=False)
    description = models.CharField(max_length=125, blank=True, unique=False)
    price = models.DecimalField(decimal_places=2, default=0.00, blank=True, unique=False, max_digits=3)
    display_price = models.BooleanField(default=False)
    image = models.ImageField(null=True, blank=True, upload_to="media/")
    created = models.DateField(auto_now_add=True)
    def __str__(self):
        return f'Name: {self.name} || Description: {self.description} || Price: {self.price}'