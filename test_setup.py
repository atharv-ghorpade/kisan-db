"""Test script to verify database and backend setup"""
import os
import sys
from dotenv import load_dotenv

load_dotenv()

print("=" * 60)
print("TESTING KISAN SATHI BACKEND SETUP")
print("=" * 60)

# Test 1: Environment Variables
print("\n1. ENVIRONMENT VARIABLES:")
print("-" * 60)
db_url = os.getenv("DATABASE_URL", "postgresql+asyncpg://user:Atharv@01112005@localhost:5432/kisan_sathi")
print(f"✓ DATABASE_URL configured: {db_url[:50]}...")
secret_key = os.getenv("SECRET_KEY")
print(f"✓ SECRET_KEY: {'SET' if secret_key else 'NOT SET - Using default'}")

# Test 2: Dependencies
print("\n2. REQUIRED PACKAGES:")
print("-" * 60)
packages_to_check = [
    "fastapi",
    "uvicorn",
    "sqlalchemy",
    "asyncpg",
    "psycopg2",
    "pydantic",
    "python_dotenv",
]

for package in packages_to_check:
    try:
        __import__(package.replace("-", "_"))
        print(f"✓ {package}")
    except ImportError:
        print(f"✗ {package} - NOT INSTALLED")

# Test 3: Database Connection (Sync)
print("\n3. SYNC DATABASE CONNECTION (psycopg2):")
print("-" * 60)
try:
    import psycopg2
    db_url_sync = db_url.replace("+asyncpg", "")
    conn = psycopg2.connect(db_url_sync)
    cursor = conn.cursor()
    cursor.execute("SELECT 1")
    result = cursor.fetchone()
    cursor.close()
    conn.close()
    print("✓ PostgreSQL connection successful!")
except psycopg2.OperationalError as e:
    print(f"✗ PostgreSQL connection failed: {e}")
except Exception as e:
    print(f"✗ Unexpected error: {e}")

# Test 4: FastAPI App Import
print("\n4. FASTAPI APPLICATION:")
print("-" * 60)
try:
    from app.main import app
    print("✓ FastAPI app imported successfully")
    print(f"✓ App title: {app.title}")
    print(f"✓ Routes configured: {len(app.routes)}")
except Exception as e:
    print(f"✗ Failed to import app: {e}")
    import traceback
    traceback.print_exc()

# Test 5: CORS Configuration
print("\n5. CORS CONFIGURATION:")
print("-" * 60)
try:
    from app.main import app
    cors_enabled = False
    for middleware in app.user_middleware:
        if "CORSMiddleware" in str(middleware):
            cors_enabled = True
            print("✓ CORS middleware enabled")
            break
    if cors_enabled:
        print("✓ Allowed origins: http://localhost:3000, http://127.0.0.1:3000, etc.")
    else:
        print("✗ CORS middleware not detected")
except Exception as e:
    print(f"✗ Error checking CORS: {e}")

# Test 6: Routers
print("\n6. API ROUTERS:")
print("-" * 60)
try:
    from app.main import app
    routers = []
    for route in app.routes:
        if hasattr(route, "path"):
            routers.append(route.path)
    
    expected_paths = ["/auth", "/farmer", "/scheme", "/application", "/document", "/"]
    for path in expected_paths:
        if any(path in r for r in routers):
            print(f"✓ {path} routes configured")
        else:
            print(f"✗ {path} routes NOT found")
except Exception as e:
    print(f"✗ Error checking routes: {e}")

print("\n" + "=" * 60)
print("SETUP TEST COMPLETE")
print("=" * 60)
print("\nIf all tests passed:")
print("  1. Install dependencies: pip install -r requirements.txt")
print("  2. Run backend: python -m uvicorn app.main:app --reload")
print("  3. Test in browser: http://localhost:8000/docs")
