from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, Text, Float
from database.base import Base
from datetime import datetime

class Application(Base):
    __tablename__ = "applications"
    
    id = Column(Integer, primary_key=True, index=True)
    farmer_id = Column(Integer, ForeignKey("farmers.id"), nullable=False)
    scheme_id = Column(Integer, ForeignKey("schemes.id"), nullable=False)
    status = Column(String, default="pending")
    application_number = Column(String, unique=True)
    submission_date = Column(DateTime, default=datetime.utcnow)
    approval_date = Column(DateTime)
    rejection_reason = Column(Text)
    remarks = Column(Text)
    subsidy_amount_approved = Column(Float)
    estimated_benefit = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)