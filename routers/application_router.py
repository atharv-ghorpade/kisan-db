from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from database.connection import get_db
from models.application import Application
from schemas.application_schema import ApplicationCreate # I'll check if this exists or create it
from datetime import datetime

router = APIRouter(tags=["Applications"])

@router.post("/applications")
async def apply(data: dict, db: AsyncSession = Depends(get_db)):
    # Simple implementation for now
    new_app = Application(
        farmer_id=data.get("farmer_id"),
        scheme_id=data.get("scheme_id"),
        status="pending",
        application_number=f"KS-{datetime.utcnow().year}-{data.get('farmer_id')}-{data.get('scheme_id')}",
    )
    db.add(new_app)
    await db.commit()
    await db.refresh(new_app)
    return new_app

@router.get("/applications/{farmer_id}")
async def list_apps(farmer_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Application).where(Application.farmer_id == farmer_id))
    apps = result.scalars().all()
    return apps
