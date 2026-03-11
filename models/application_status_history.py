from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from database.base import Base
from datetime import datetime

class ApplicationStatusHistory(Base):
    __tablename__ = "application_status_history"
    
    id = Column(Integer, primary_key=True, index=True)
    application_id = Column(Integer, ForeignKey("applications.id"), nullable=False)
    old_status = Column(String)
    new_status = Column(String)
    changed_by = Column(Integer, ForeignKey("users.id"))
    remarks = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
