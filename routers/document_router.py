from fastapi import APIRouter
from sqlalchemy.ext.asyncio import AsyncSession
from database.connection import get_db
from fastapi import Depends

router = APIRouter()

@router.get("/documents")
async def list_documents(db: AsyncSession = Depends(get_db)):
    return {"documents": []}
