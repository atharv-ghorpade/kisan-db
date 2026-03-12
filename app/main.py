from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from datetime import datetime
from database.init import init_db, close_db

# Import all routers
from routers.auth_router import router as auth_router
from routers.farmer_router import router as farmer_router
from routers.scheme_router import router as scheme_router
from routers.application_router import router as application_router
from routers.document_router import router as document_router

# Startup event
async def startup():
    await init_db()

# Shutdown event
async def shutdown():
    await close_db()

# Create app with lifespan
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await startup()
    yield
    # Shutdown
    await shutdown()

app = FastAPI(
    title="Kisan Sathi API",
    description="Backend API for Kisan Sathi platform",
    version="1.0.0",
    lifespan=lifespan
)

# Allow frontend to access backend APIs
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:3000", "http://127.0.0.1:3001"],  # Next.js default and alternatives
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Include all routers
app.include_router(auth_router)
app.include_router(farmer_router)
app.include_router(scheme_router)
app.include_router(application_router)
app.include_router(document_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Kisan Sathi API! 🚀", "status": "online"}

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "Kisan Sathi Backend",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat()
    }

from pydantic import BaseModel
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scoring_engine import recommend_schemes
from database.init import get_db_connection

class FarmerProfile(BaseModel):
    state: str
    land_hectares: float
    land_ownership: str
    crop_type: str
    annual_income_rs: int
    age: int
    caste: str
    gender: str
    irrigation_type: str
    is_income_tax_payer: bool = False
    is_government_employee: bool = False
    is_pensioner_above_10k: bool = False
    is_pm_kisan_beneficiary: bool = False
    has_aadhaar: bool = True
    has_land_records: bool = True

@app.post("/api/recommend")
def recommend(profile: FarmerProfile):
    return recommend_schemes(profile.model_dump())

@app.get("/api/schemes")
def list_schemes(state: str = None):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        if state:
            cursor.execute(
                "SELECT * FROM schemes WHERE state = %s OR state = 'Nationwide' ORDER BY state",
                (state,)
            )
        else:
            cursor.execute("SELECT * FROM schemes ORDER BY state")
        rows = cursor.fetchall()
        
        # Get column names
        col_names = [desc[0] for desc in cursor.description]
        result = [dict(zip(col_names, row)) for row in rows]
        
        cursor.close()
        conn.close()
        return {"schemes": result}
    except Exception as e:
        import traceback
        traceback.print_exc()
        return {"schemes": [], "error": str(e)}

@app.get("/api/schemes/{scheme_id}")
def get_scheme(scheme_id: int):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM schemes WHERE id = %s", (scheme_id,))
        row = cursor.fetchone()
        
        if not row:
            from fastapi import HTTPException
            raise HTTPException(status_code=404, detail="Scheme not found")
            
        col_names = [desc[0] for desc in cursor.description]
        result = dict(zip(col_names, row))
        
        cursor.close()
        conn.close()
        return {"scheme": result}
    except Exception as e:
        import traceback
        traceback.print_exc()
        from fastapi import HTTPException
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")