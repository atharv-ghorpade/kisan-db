from pydantic import BaseModel
from typing import Optional

class DocumentBase(BaseModel):
    farmer_id: int
    file_name: str

class DocumentCreate(DocumentBase):
    application_id: Optional[int] = None
    file_path: Optional[str] = None
    file_type: Optional[str] = None

class DocumentOut(DocumentBase):
    id: int
    
    class Config:
        from_attributes = True
