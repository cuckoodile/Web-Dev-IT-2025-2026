from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import Profile
from .serializers import ProfileSerializer

# Create your views here.
class ProfilesListCreateView(ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]

class ProfilePatchDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny]
