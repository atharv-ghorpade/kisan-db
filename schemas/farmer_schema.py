from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class FarmerBase(BaseModel):
    name: str
    phone: str
    email: Optional[EmailStr] = None
    state: Optional[str] = None
    district: Optional[str] = None
    land_size: Optional[float] = None
    crop_types: Optional[str] = None
    farmer_category: Optional[str] = None
    irrigation_type: Optional[str] = None
    annual_income: Optional[float] = None

class FarmerCreate(FarmerBase):
    password: str

class FarmerUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    state: Optional[str] = None
    district: Optional[str] = None
    land_size: Optional[float] = None
    crop_types: Optional[str] = None
    farmer_category: Optional[str] = None
    irrigation_type: Optional[str] = None
    annual_income: Optional[float] = None

class FarmerOut(FarmerBase):
    id: int
    is_active: bool
    is_verified: bool
    created_at: datetime

    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    phone: str
    password: str
