from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
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
    return {"message": "Welcome to Kisan Sathi API! 🚀"}