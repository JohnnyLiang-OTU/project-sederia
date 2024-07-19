from django.core.management.base import BaseCommand
from base.models import Product

class Command(BaseCommand):
    help = 'Load initial product data'

    def handle(self, *args, **kwargs):
        data = [
            {'name': 'P001', 'description': 'First product description', 'price' : 2.00},
            {'name': 'P002', 'description': 'Second product description', 'price' : 3.00},
            {'name': 'P003', 'description': 'Third product description'},
            {'name': 'P004', 'description': 'Fourth product description'},
            {'name': 'P005', 'description': 'Fifth product description'},
            {'name': 'P006', 'description': 'Sixth product description'},
            {'name': 'P007', 'description': 'Seventh product description'},
            {'name': 'P008', 'description': 'Eighth product description'},
            {'name': 'P009', 'description': 'Nineth product description'},
        ]

        for item in data:
            Product.objects.create(**item)

        self.stdout.write(self.style.SUCCESS('Products loaded successfully'))
