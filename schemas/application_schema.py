from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ApplicationBase(BaseModel):
    scheme_id: int

class ApplicationCreate(ApplicationBase):
    pass

class ApplicationOut(ApplicationBase):
    id: int
    farmer_id: int
    status: str = "pending"
    created_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True
