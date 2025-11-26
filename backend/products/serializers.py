from rest_framework import serializers

from .models import Product, Category, ProductImage

class CategorySerializer(serializers.ModelSerializer):
    # thumbnail = 

    class Meta:
        model = Category
        fields = '__all__'

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']

class ProductSerializer(serializers.ModelSerializer):
    product_images = ProductImageSerializer(many=True, read_only=True)
    product_images_upload = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=True
    )
    category_name = serializers.CharField(source='category.name', read_only=True)
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), write_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'category_name', 'category', 'bar_code', 'price',
            'created', 'updated', 'thumbnail', 'product_images', 'product_images_upload'
        ]

    def validate_product_images_upload(self, value):
        if not value or len(value) < 1:
            raise serializers.ValidationError('At least one product image is required.')
        return value

    def create(self, validated_data):
        product_images_data = validated_data.pop('product_images_upload')
        product = Product.objects.create(**validated_data)
        for image in product_images_data:
            ProductImage.objects.create(product=product, image=image)
        return product