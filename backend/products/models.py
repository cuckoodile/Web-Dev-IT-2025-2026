from django.db import models
from django.core.validators import MinValueValidator, MinLengthValidator

# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=1000)
    bar_code = models.CharField(unique=True, validators=[MinLengthValidator(1)])
    price = models.DecimalField(max_digits=6, decimal_places=2, validators=[MinValueValidator(1)])
    thumbnail = models.ImageField(upload_to='products/', null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=False)

    category = models.ForeignKey('Category', on_delete=models.CASCADE, related_name='products')

    def __str__(self):
        return  f'{self.name.title()} - \t Bar code: {self.bar_code} \t Price: {self.price} {"Deleted" if self.category else None}'


class ProductImage(models.Model):
    image = models.ImageField(upload_to='products/')

    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_images')

    def __str__(self):
        return f'{self.product.name}'
    
 
class Category(models.Model):
    name = models.CharField(max_length=50, validators=[MinLengthValidator(3)], unique=True)
    thumbnail = models.ImageField(upload_to='categories', null=True, blank=True)

    def __str__(self):
        return self.name