import asyncio
import asyncpg

async def test():
    try:
        # Trying password with brackets
        conn = await asyncpg.connect('postgresql://postgres:Atharv%4001112005@db.uburdiwwzeuytvsedzpv.supabase.co:5432/postgres')
        print("Connected without brackets!")
        await conn.close()
    except Exception as e:
        print(f"Failed without brackets: {e}")
        
    try:
        # Trying password WITH brackets
        conn = await asyncpg.connect('postgresql://postgres:%5BAtharv%4001112005%5D@db.uburdiwwzeuytvsedzpv.supabase.co:5432/postgres')
        print("Connected WITH brackets!")
        await conn.close()
    except Exception as e:
        print(f"Failed WITH brackets: {e}")
        
    try:
        # Trying Mumbai pooler (ap-south-1)
        # Note: I'm using the pooler username format postgres.uburdiwwzeuytvsedzpv
        conn = await asyncpg.connect('postgresql://postgres.uburdiwwzeuytvsedzpv:Atharv%4001112005@aws-0-ap-south-1.pooler.supabase.com:6543/postgres')
        print("Connected successfully via ap-south-1 pooler!")
        await conn.close()
    except Exception as e:
        print(f"Failed via ap-south-1 pooler: {e}")

asyncio.run(test())
