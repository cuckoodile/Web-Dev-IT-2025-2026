from rest_framework import serializers

from .models import *

# Category
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


# Product
class ProductSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        write_only=True
    )

    category_details = CategorySerializer(source='category', read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'thumbnail', 'category', 'category_details']
        
