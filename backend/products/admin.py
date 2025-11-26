from django.contrib import admin
from django.forms.models import BaseInlineFormSet
from django.core.exceptions import ValidationError

from .models import Product, Category, ProductImage

class ProductImageInlineFormSet(BaseInlineFormSet):
    def clean(self):
        super().clean()
        images = [
            form for form in self.forms
            if not form.cleaned_data.get('DELETE', False) and form.cleaned_data.get('image')
        ]
        if len(images) < 1:
            raise ValidationError('At least one product image is required.')
        

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    formset = ProductImageInlineFormSet


class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImageInline]


admin.site.register(Product, ProductAdmin)
admin.site.register(Category)