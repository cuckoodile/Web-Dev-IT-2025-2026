from django.contrib import admin
from rest_framework.routers import DefaultRouter
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from django.conf import settings
from django.conf.urls.static import static

from profiles.views import ProfilesListCreateView, ProfilePatchDestroyView
from products.views import ProductsListCreateView, CategoryListCreateView, CategoryPatchDestroyView

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    # User Profile APIs
    path('api/profiles/', ProfilesListCreateView.as_view(), name='profiles-list-create-view'),
    path('api/profiles/<int:pk>/', ProfilePatchDestroyView.as_view(), name='profile-patch-destroy-view'),

    # Products APIs
    path('api/products/', ProductsListCreateView.as_view(), name='products-list-create-view'),

    # Categories APIs
    path('api/categories/', CategoryListCreateView.as_view(), name='categorie-list-create-view'),
    path('api/categories/<int:pk>/', CategoryPatchDestroyView.as_view(), name='categories-patch-destroy-view')

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
