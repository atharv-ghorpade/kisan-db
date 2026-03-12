"""Database initialization module - creates tables on startup"""
import logging
import sys
from pathlib import Path
from sqlalchemy.ext.asyncio import AsyncSession
from database.base import Base
from database.connection import engine

logger = logging.getLogger(__name__)


async def init_db():
    """Create all database tables"""
    try:
        # Import models to register them with Base metadata
        from models.farmer import Farmer
        from models.scheme import Scheme
        from models.application import Application
        from models.document import Document
        from models.user import User
        from models.notification import Notification
        from models.application_status_history import ApplicationStatusHistory
        
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        logger.info("✅ Database tables created successfully")
    except Exception as e:
        logger.error(f"❌ Failed to create database tables: {e}")
        import traceback
        traceback.print_exc()


async def close_db():
    """Close database connection"""
import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

def get_db_connection():
    db_url = os.getenv("DATABASE_URL", "postgresql://postgres:root@localhost:5432/kisan_db")
    db_url = db_url.replace("+asyncpg", "")
    return psycopg2.connect(db_url)
