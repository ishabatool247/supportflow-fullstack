# SupportFlow — Full-Stack AI Customer Support Platform

A starter full-stack project with a Next.js frontend, Django REST API, JWT authentication, and SQLite database.

## Included
- Sign up / sign in with JWT access and refresh tokens
- Protected dashboard and app pages
- Django user model authentication
- Chatbot, conversation, message, knowledge document, and dashboard-stat APIs
- SQLite database for local development
- Premium dark SaaS UI

> This is a working local-development foundation. Google OAuth, production deployment hardening, email verification, password reset, and a real LLM provider are not configured.

## Requirements
- Node.js 20+ (Node 24 should also work)
- Python 3.11+
- PowerShell on Windows or a terminal on macOS/Linux

## 1. Start the backend (Windows PowerShell)
Open a terminal in the project root:

```powershell
cd backend
py -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
Copy-Item .env.example .env
python manage.py migrate
python manage.py seed_demo
python manage.py runserver
```

Backend runs at `http://127.0.0.1:8000`.

If PowerShell blocks activation, use:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\venv\Scripts\Activate.ps1
```

## 2. Start the frontend
Open a SECOND terminal:

```powershell
cd frontend
npm install
Copy-Item .env.local.example .env.local
npm run dev
```

Frontend runs at `http://localhost:3000`.

## Demo login
After running `seed_demo`:
- Email: `demo@supportflow.local`
- Password: `SupportFlow123!`

Or register a new account at `/signup`.

## API endpoints
- `POST /api/auth/register/`
- `POST /api/auth/login/`
- `POST /api/auth/refresh/`
- `GET /api/auth/me/`
- `GET /api/dashboard/`
- `GET/POST /api/chatbots/`
- `GET/POST /api/conversations/`
- `GET /api/conversations/<id>/messages/`
- `POST /api/conversations/<id>/messages/`
- `GET/POST /api/knowledge/`
- `GET/PATCH /api/settings/`

## Notes
- SQLite is used by default; database file is created as `backend/db.sqlite3`.
- The frontend uses `NEXT_PUBLIC_API_URL`, defaulting to `http://127.0.0.1:8000/api`.
- For deployment, configure environment variables, use PostgreSQL, set a strong Django `SECRET_KEY`, set `DEBUG=False`, configure allowed hosts/CORS, and serve over HTTPS.
