import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text
from app.config import settings

async def verify():
    print(f"Testing connection to: {settings.DATABASE_URL}")
    engine = create_async_engine(settings.DATABASE_URL)
    AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    try:
        async with AsyncSessionLocal() as session:
            res = await session.execute(text("SELECT current_database(), current_user"))
            db, user = res.fetchone()
            print(f"✅ SUCCESS! Connected to database '{db}' as user '{user}'")
            
            # Check for tables
            res = await session.execute(text("SELECT count(*) FROM schemes"))
            count = res.scalar()
            print(f"✅ Found {count} schemes in the database.")
            
    except Exception as e:
        print(f"❌ Connection failed: {e}")
    finally:
        await engine.dispose()

if __name__ == "__main__":
    asyncio.run(verify())
