from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from database.connection import get_db
from schemas.farmer_schema import FarmerCreate, FarmerOut, LoginRequest
from services.auth_service import register_farmer, authenticate_farmer
from core.security import create_access_token

router = APIRouter(tags=["Authentication"])

@router.post("/auth/register", response_model=FarmerOut)
async def register(data: FarmerCreate, db: AsyncSession = Depends(get_db)):
    return await register_farmer(db, data)

@router.post("/auth/login")
async def login(data: LoginRequest, db: AsyncSession = Depends(get_db)):
    farmer = await authenticate_farmer(db, data.phone, data.password)
    if not farmer:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid phone number or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": farmer.phone})
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user": {
            "id": farmer.id,
            "name": farmer.name,
            "phone": farmer.phone,
            "role": "farmer"
        }
    }
