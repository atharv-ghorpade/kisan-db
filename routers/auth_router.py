from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from database.connection import get_db
from pydantic import BaseModel, EmailStr

router = APIRouter()

class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

@router.post("/auth/register")
async def register(data: RegisterRequest, db: AsyncSession = Depends(get_db)):
    return {"message": "Registration endpoint - store farmer in DB", "email": data.email}

@router.post("/auth/login")
async def login(data: LoginRequest, db: AsyncSession = Depends(get_db)):
    return {"access_token": "token123", "token_type": "bearer"}
