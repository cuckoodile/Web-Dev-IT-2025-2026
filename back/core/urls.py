"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

from products.views import *
from eyai.views import *

urlpatterns = [
    path('admin/', admin.site.urls),

    # Auth
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    
    # Users    TODO

    # Products
    path('api/products/', ProductListCreateAPIView.as_view()),
    path('api/products/<int:pk>/', ProductRetrieveUpdateDestroyAPIView.as_view()),

    # Category
    path('api/categories/', CategoryListCreateAPIView.as_view()),
    path('api/categories/<int:pk>/', CategoryRetrieveUpdateDestroyAPIView.as_view()),

    # Eyai
    path('api/eyai/prompts/', PromptListCreateAPIView.as_view()),
    path('api/eyai/prompts/<int:pk>/', PromptRetrieveUpdateDestroyAPIView.as_view()),
    path('api/eyai/prompts/<int:pk>/retry/', RetryPromptRetrieveUpdateDestroyAPIView.as_view()),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)