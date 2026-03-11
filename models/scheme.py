from sqlalchemy import Column, Integer, String, Text, Float, DateTime, Boolean
from database.base import Base
from datetime import datetime

class Scheme(Base):
    __tablename__ = "schemes"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    ministry = Column(String)
    eligibility = Column(Text)
    min_land_size = Column(Float)
    max_land_size = Column(Float)
    target_crops = Column(Text)
    target_states = Column(Text)
    subsidy_percentage = Column(Float)
    max_subsidy_amount = Column(Float)
    application_deadline = Column(DateTime)
    documents_required = Column(Text)
    contact_email = Column(String)
    contact_phone = Column(String)
    official_url = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)