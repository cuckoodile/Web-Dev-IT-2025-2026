    	DJANGO CELERY

    INSTALL

pip install celery django-celery-beat redis django-celery-results

    CORE CELERY SET UP (core>celery.py)

import os

from celery import Celery

# Set the default Django settings module for the 'celery' program.

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'proj.settings')

app = Celery('proj')

# Using a string here means the worker doesn't have to serialize

# the configuration object to child processes.

# - namespace='CELERY' means all celery-related configuration keys

# should have a `CELERY_` prefix.

app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django apps.

app.autodiscover_tasks()

@app.task(bind=True, ignore_result=True)
def debug_task(self):
print(f'Request: {self.request!r}')

    CORE INIT SET UP (core>__init__.py)

from .celery import app as celery_app

**all** = ('celery_app',)

// Front end (react-vite)
http://172.17.3.55:8001/

admin@gmail.com
admin

// Back end (djago)
http://172.17.3.55:8000/api/eyai/prompts/

    DEPENDENCIES

restframework
rest_framework_simplejwt
rest_framework_filters
corsheaders
pillow

celery
pip install celery
celery-beat
pip install django-celery-beat
celery-result
django-celery-results
redis
pip install redis
redis-django
pip install redis-django

gemini > Optional for AI.. Replace with AI of your choice

RUN DOCKER: - cd to dir with Dockerfile and docker-compose.yml - docker compose up -d --build

    > DOWN DOCKER BUILD (CMD)
    - docker compose down           (Still on dir with Dockerfile)

STUDY: - Load balancing - Network traffic and network distribution (load balancing)

    >> DOCUMENTATIONS <<

PPT (Presentation)
Proposal
ERD (Entity Relationship Diagram)
SWAGGER (API Docs/ RestFul docs)
Sitemap
Wireframe
Flowchart <Tentative>