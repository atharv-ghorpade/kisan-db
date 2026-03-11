from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from database.connection import get_db
from schemas.farmer_schema import FarmerOut, FarmerUpdate
from services.farmer_service import get_farmer_by_id, update_farmer_profile

router = APIRouter(tags=["Farmer"])

@router.get("/profile/{farmer_id}", response_model=FarmerOut)
async def get_profile(farmer_id: int, db: AsyncSession = Depends(get_db)):
    return await get_farmer_by_id(db, farmer_id)

@router.put("/profile/{farmer_id}", response_model=FarmerOut)
async def update_profile(farmer_id: int, data: FarmerUpdate, db: AsyncSession = Depends(get_db)):
    return await update_farmer_profile(db, farmer_id, data)
