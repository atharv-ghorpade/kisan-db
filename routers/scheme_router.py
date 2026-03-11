from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database.connection import get_db

router = APIRouter()

@router.get("/schemes")
async def list_schemes(db: AsyncSession = Depends(get_db)):
    return {"schemes": []}

@router.post("/schemes")
async def create_scheme(data: dict, db: AsyncSession = Depends(get_db)):
    return {"message": "Scheme created"}
