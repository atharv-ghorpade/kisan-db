from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models.farmer import Farmer
from schemas.farmer_schema import FarmerUpdate
from fastapi import HTTPException, status

async def get_farmer_by_id(db: AsyncSession, farmer_id: int):
    result = await db.execute(select(Farmer).where(Farmer.id == farmer_id))
    farmer = result.scalars().first()
    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer not found")
    return farmer

async def update_farmer_profile(db: AsyncSession, farmer_id: int, update_data: FarmerUpdate):
    farmer = await get_farmer_by_id(db, farmer_id)
    
    update_dict = update_data.model_dump(exclude_unset=True)
    for key, value in update_dict.items():
        setattr(farmer, key, value)
    
    await db.commit()
    await db.refresh(farmer)
    return farmer
