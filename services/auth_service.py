from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models.farmer import Farmer
from schemas.farmer_schema import FarmerCreate
from core.security import get_password_hash, verify_password, create_access_token
from fastapi import HTTPException, status

async def register_farmer(db: AsyncSession, farmer_data: FarmerCreate):
    # Check if phone already exists
    result = await db.execute(select(Farmer).where(Farmer.phone == farmer_data.phone))
    if result.scalars().first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Phone number already registered"
        )
    
    # Create new farmer
    hashed_pwd = get_password_hash(farmer_data.password)
    new_farmer = Farmer(
        name=farmer_data.name,
        phone=farmer_data.phone,
        email=farmer_data.email or f"{farmer_data.phone}@example.com", # Fallback email if needed
        hashed_password=hashed_pwd
    )
    
    db.add(new_farmer)
    await db.commit()
    await db.refresh(new_farmer)
    return new_farmer

async def authenticate_farmer(db: AsyncSession, phone: str, password: str):
    result = await db.execute(select(Farmer).where(Farmer.phone == phone))
    farmer = result.scalars().first()
    
    if not farmer or not verify_password(password, farmer.hashed_password):
        return None
    return farmer
