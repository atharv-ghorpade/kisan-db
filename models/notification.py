from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean, Text
from database.base import Base
from datetime import datetime

class Notification(Base):
    __tablename__ = "notifications"
    
    id = Column(Integer, primary_key=True, index=True)
    farmer_id = Column(Integer, ForeignKey("farmers.id"), nullable=False)
    application_id = Column(Integer, ForeignKey("applications.id"))
    title = Column(String, nullable=False)
    message = Column(Text)
    type = Column(String)
    is_read = Column(Boolean, default=False)
    read_at = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
