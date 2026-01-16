from celery import shared_task
from google import genai
from django.utils import timezone
from datetime import timedelta
import logging

from .models import *

gem_key = "AIzaSyCkcxd54Jl-7cbPFuk0Yt7IMM5Ctya43pA"
client = genai.Client(api_key = gem_key)
ai_model = "gemini-3-flash-preview"
logger = logging.getLogger(__name__)

@shared_task    # "@" is called a decorator
def RequestAI(prompt_id: int) -> str :
    try:
        prompt_obj = Prompt.objects.get(id=prompt_id)       # Prompt id: 13
    except Prompt.DoesNotExist:
        return "Prompt not found"

    # At this point, prompt_obj is guaranteed to exist

    # Call Gemini API
    try:
        response = client.models.generate_content(
            model= ai_model,
            contents=prompt_obj.prompt,     # was it all casual?
        )

        ai_text = response.text
    except Exception as e:
        ai_text = f"Error: {str(e)}"

    # At this point, we have ai_text either as response or error message but the prompt_obj.response is not yet updated.

    # Save the response and update finish_at
    prompt_obj.response = ai_text
    prompt_obj.save(update_fields=['response', 'finish_at'])    # finish_at: 2026-01-16 05:26:31.305884

    return ai_text or "Something went wrong"


@shared_task
def retry_failed_or_empty_prompts():
    from django.db import models  # Import inside task if needed

    failed_prompts = Prompt.objects.filter(
        models.Q(response__exact='') | 
        models.Q(response__contains="Error:") |
        models.Q(response__isnull=True)
    )

    if not failed_prompts.exists():
        logger.info("No prompts need retrying.")
        return "No retries needed"

    results = []

    for prompt_obj in failed_prompts:
        try:
            response = client.models.generate_content(
                model= ai_model,
                contents=prompt_obj.prompt
            )
            ai_text = response.text.strip() if response.text else "Empty response from AI"
        except Exception as e:
            ai_text = f"Error: {str(e)}"
            logger.error(f"Failed to regenerate prompt ID {prompt_obj.id}: {e}") # type: ignore

        prompt_obj.response = ai_text
        prompt_obj.finish_at = timezone.now()
        prompt_obj.save(update_fields=['response', 'finish_at'])

        status = 'Success' if 'Error' not in ai_text else 'Failed'
        results.append(f"ID {prompt_obj.id}: {status}") # type: ignore
        logger.info(f"Prompt ID {prompt_obj.id}: {status}") # type: ignore

    return "\n".join(results)