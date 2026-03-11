from pydantic import BaseModel, EmailStr
from typing import Optional

class FarmerBase(BaseModel):
    name: str
    email: EmailStr

class FarmerCreate(FarmerBase):
    password: str
    phone: Optional[str] = None
    state: Optional[str] = None
    district: Optional[str] = None

class FarmerOut(FarmerBase):
    id: int
    is_active: bool = True

    class Config:
        from_attributes = True
