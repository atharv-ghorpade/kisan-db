from pydantic import BaseModel
from typing import Optional

class SchemeBase(BaseModel):
    title: str
    description: Optional[str] = None

class SchemeCreate(SchemeBase):
    ministry: Optional [str] = None
    eligibility_criteria: Optional[str] = None

class SchemeOut(SchemeBase):
    id: int
    
    class Config:
        from_attributes = True
