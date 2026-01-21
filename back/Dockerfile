FROM python:3.13-slim

WORKDIR /app

COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Install gunicorn if it's not in requirements.txt
RUN pip install gunicorn

COPY . /app/

# Expose the port that gunicorn will bind to
EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "3", "core.wsgi:application"]
