from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import status

from .models import Prompt
from .serializers import *
from .tasks import *

# Create your views here.


class PromptListCreateAPIView(ListCreateAPIView):
    queryset = Prompt.objects.all()
    serializer_class = PromptSerializer

    def perform_create(self, serializer):
        # Save the prompt immediately (response will be empty at first)
        prompt_instance = serializer.save(response="")  # Explicitly set empty

        # Prompt request ID is created at this point

        # Fire off the Celery task asynchronously
        RequestAI.delay(prompt_instance.id)  # type: ignore


class PromptRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Prompt.objects.all()
    serializer_class = PromptSerializer


class RetryPromptRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Prompt.objects.all()
    serializer_class = PromptSerializer
    allowed_methods = ['get', 'put', 'patch', 'delete']
    http_method_names = ['get', 'put', 'patch', 'delete']
    permission_classes = []
    def update(self, request, *args, **kwargs):
        prompt_obj = Prompt.objects.get(id=self.kwargs["pk"])

        task_result = RequestAI.delay(prompt_obj.id)  # type: ignore

        return Response(
            {"message": "Retry task triggered", "task_id": task_result.id},
            status=status.HTTP_200_OK,
        )

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)