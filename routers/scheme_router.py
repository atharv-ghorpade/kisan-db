from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from database.connection import get_db
from models.scheme import Scheme

router = APIRouter(tags=["Schemes"])

@router.get("/schemes")
async def list_schemes(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Scheme).where(Scheme.is_active == True))
    schemes = result.scalars().all()
    return schemes

@router.get("/schemes/{scheme_id}")
async def get_scheme(scheme_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Scheme).where(Scheme.id == scheme_id))
    scheme = result.scalars().first()
    if not scheme:
        raise HTTPException(status_code=404, detail="Scheme not found")
    return scheme
