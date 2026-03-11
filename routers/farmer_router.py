from fastapi import APIRouter
from sqlalchemy.ext.asyncio import AsyncSession
from database.connection import get_db
from fastapi import Depends

router = APIRouter()

@router.get("/profile")
async def get_profile(db: AsyncSession = Depends(get_db)):
    return {"profile": "user profile"}
