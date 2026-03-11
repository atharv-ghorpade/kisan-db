from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database.connection import get_db

router = APIRouter()

@router.post("/applications")
async def apply(data: dict, db: AsyncSession = Depends(get_db)):
    return {"message": "Application submitted"}

@router.get("/applications")
async def list_apps(db: AsyncSession = Depends(get_db)):
    return {"applications": []}
