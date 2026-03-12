from fastapi import Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from schemas.farmer_schema import FarmerCreate, FarmerOut
from schemas.auth_schema import Token
from services.auth_service import register_farmer, authenticate_farmer, create_jwt_for_farmer
from database.connection import get_db

async def register(farmer_data: FarmerCreate, db: AsyncSession = Depends(get_db)):
    farmer = await register_farmer(db, farmer_data)
    if not farmer:
        raise HTTPException(status_code=400, detail="Phone number already registered")
    return FarmerOut.from_orm(farmer)

async def login(phone: str, password: str, db: AsyncSession = Depends(get_db)):
    farmer = await authenticate_farmer(db, phone, password)
    if not farmer:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_jwt_for_farmer(phone)
    return Token(
        access_token=token, 
        token_type="bearer",
        user={
            "id": farmer.id,
            "name": farmer.name,
            "phone": farmer.phone,
            "role": "farmer"
        }
    )