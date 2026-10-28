
#!/bin/bash
set -e

cd /app/backend

python manage.py migrate

gunicorn core.wsgi:application --bind 127.0.0.1:8000 &

cd /app/frontend

exec npm run start -- --hostname 0.0.0.0 --port "${PORT:-3000}"
