from rest_framework import serializers

from django.contrib.auth.models import User
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    username = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')
    password = serializers.CharField(write_only=True, required=False, allow_blank=True, style={'input_type': 'password'})
    current_password = serializers.CharField(write_only=True, required=False, allow_blank=True, style={'input_type': 'password'})
    password_confirmation = serializers.CharField(write_only=True, required=False, allow_blank=True, style={'input_type': 'password'})


    class Meta:
        model = Profile
        fields = ['id', 'first_name', 'middle_name', 'last_name', 'username', 'email', 'profile_image', 'current_password', 'password', 'password_confirmation']

    def validate(self, attrs):
        # Patch Validator
        if self.instance:
            user = self.instance.user
            current_password = attrs['current_password']

            if current_password and not user.check_password(current_password):
                raise serializers.ValidationError({"current_password": "Inputted current password is incorrect!"})
            
            if attrs['password'] != attrs['password_confirmation']:
                raise serializers.ValidationError({"password_confirmation": "Password do not match!"})
            
            attrs.pop('current_password')

        # Post Validator
        else:
            if attrs['password'] != attrs['password_confirmation']:
                raise serializers.ValidationError({"password_confirmation": "Password do not match!"})
            
        attrs.pop('password_confirmation')
        return attrs
    
    def get_fields(self):
        fields = super().get_fields()
        if not self.instance:
            fields.pop('current_password', None)
        return fields
    
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        password = validated_data.pop('password')

        validated_user = User.objects.create_user(
            username= user_data['username'],
            email= user_data['email'],
            password= password,
            first_name= user_data['first_name'],
            last_name= user_data['last_name']
        )

        profile = Profile.objects.create(user= validated_user, **validated_data)
        return profile
    
    def update(self, instance, validated_data):
        user_data = validated_data.pop('user')
        password = validated_data.pop('password')

        user = instance.user
        user.first_name = user_data.get('first_name', user.first_name)
        user.last_name = user_data.get('last_name', user.last_name)
        user.username = user_data.get('username', user.username)
        user.email = user_data.get('email', user.email)
        
        if password:
            user.set_password(password)

        user.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance
