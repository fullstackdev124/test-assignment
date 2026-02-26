"""Simple auth API: register, login, protected route (FastAPI + SQLite)."""
from contextlib import asynccontextmanager
from datetime import timedelta

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, EmailStr

from database import init_db, get_db, User
from auth import (
    hash_password,
    verify_password,
    create_access_token,
    get_user_by_email,
    get_user_by_username,
    get_current_user,
    ACCESS_TOKEN_EXPIRE_MINUTES,
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(title="Auth API", description="Simple auth for Solo HR Backend/Python demo", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Request / Response models ---

class UserRegister(BaseModel):
    email: EmailStr
    username: str
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    email: str
    username: str


# --- Endpoints ---

@app.get("/")
def root():
    return {"message": "Auth API. Use /register, /login, /me (protected)."}


@app.post("/register", response_model=UserResponse)
def register(body: UserRegister, db=Depends(get_db)):
    """Register a new user (email, username, password)."""
    if get_user_by_email(db, body.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    if get_user_by_username(db, body.username):
        raise HTTPException(status_code=400, detail="Username already taken")
    user = User(
        email=body.email,
        username=body.username,
        hashed_password=hash_password(body.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@app.post("/login", response_model=TokenResponse)
def login(body: UserLogin, db=Depends(get_db)):
    """Login with email and password; returns JWT."""
    user = get_user_by_email(db, body.email)
    if not user or not verify_password(body.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )
    access_token = create_access_token(
        data={"sub": str(user.id)},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    )
    return TokenResponse(access_token=access_token)


@app.get("/me", response_model=UserResponse)
def me(user: User = Depends(get_current_user)):
    """Protected route: returns current user when valid Bearer token is sent."""
    return user
