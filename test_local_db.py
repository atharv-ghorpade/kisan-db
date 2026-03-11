import asyncio
import asyncpg

async def test_local():
    # Attempting to connect to local postgres
    # We first connect to 'postgres' database to check/create 'kisan_db'
    credentials = [
        ('root', 'root'), 
        ('postgres', 'root'),
        ('root', 'Atharv@011105'),
        ('postgres', 'Atharv@011105'),
        ('root', 'Atharv@01112005'),
        ('postgres', 'Atharv@01112005'),
        ('Atharv', 'Atharv@011105'),
        ('Atharv', 'Atharv@01112005'),
    ]
    
    for user, pwd in credentials:
        try:
            print(f"DEBUG: Trying {user} with password {pwd}...")
            conn = await asyncpg.connect(
                user=user,
                password=pwd,
                host='localhost',
                database='postgres'
            )
            print(f"MATCH FOUND: {user}:{pwd}")
            
            # Check if kisan_db exists
            exists = await conn.fetchval("SELECT 1 FROM pg_database WHERE datname = 'kisan_db'")
            if not exists:
                print("Creating kisan_db...")
                await conn.execute('CREATE DATABASE kisan_db')
                print("kisan_db created successfully")
            else:
                print("kisan_db already exists")
                
            await conn.close()
            return (user, pwd)
        except Exception as e:
            print(f"FAIL {user} - {str(e)[:100]}")
    return None

if __name__ == "__main__":
    res = asyncio.run(test_local())
    print(f"RESULT: {res}")
