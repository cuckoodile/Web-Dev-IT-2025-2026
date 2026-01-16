from django.db import models

# Create your models here.

class Prompt(models.Model):
    prompt = models.TextField()
    response = models.TextField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    finish_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.prompt)