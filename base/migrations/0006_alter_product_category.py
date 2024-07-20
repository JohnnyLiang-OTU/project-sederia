# Generated by Django 5.0.7 on 2024-07-20 18:39

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_category_product_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.PROTECT, to='base.category'),
        ),
    ]
