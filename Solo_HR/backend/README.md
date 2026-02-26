# Auth API (FastAPI + SQLite)

Minimal authentication backend for the Solo HR Backend/Python demo: **register**, **login**, and a **protected route**.

## Setup

```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
# source venv/bin/activate
pip install -r requirements.txt
```

## Run

```bash
uvicorn main:app --reload --port 8000
```

API base: **http://localhost:8000**  
Interactive docs: **http://localhost:8000/docs**

## Endpoints

| Method | Path      | Auth | Description                    |
|--------|-----------|------|--------------------------------|
| GET    | `/`       | No   | Hello message                  |
| POST   | `/register` | No | Register (email, username, password) |
| POST   | `/login`  | No   | Login (email, password) → JWT   |
| GET    | `/me`     | Yes  | Current user (Bearer token)     |

## Example usage

**Register**
```bash
curl -X POST http://localhost:8000/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","username":"user1","password":"secret123"}'
```

**Login**
```bash
curl -X POST http://localhost:8000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secret123"}'
# Returns: {"access_token":"...", "token_type":"bearer"}
```

**Protected route**
```bash
curl -X GET http://localhost:8000/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Tech

- **FastAPI** – API framework  
- **SQLite** – `backend/auth.db` (created on first run)  
- **SQLAlchemy** – ORM  
- **passlib[bcrypt]** – password hashing  
- **python-jose** – JWT creation/verification  
