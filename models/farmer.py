from sqlalchemy import Column, Integer, String, Boolean, Float, DateTime, Text
from database.base import Base
from datetime import datetime

class Farmer(Base):
    __tablename__ = "farmers"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    phone = Column(String)
    aadhar_number = Column(String, unique=True)
    location = Column(String)
    state = Column(String)
    district = Column(String)
    land_size = Column(Float)
    crop_types = Column(Text)
    farmer_category = Column(String)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)