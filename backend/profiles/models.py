from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator

# Create your models here.

class Profile(models.Model):
    middle_name = models.CharField(max_length=50, validators=[MinLengthValidator(3)])
    profile_image = models.ImageField(upload_to='profiles/', default='defaults/anonymous_user.png')
    updated = models.DateTimeField(auto_now=True)

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')

    def __str__(self):
        return f'{self.user.last_name }, {self.user.first_name} {self.middle_name[0].upper()}.'
