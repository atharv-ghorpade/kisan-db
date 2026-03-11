import asyncio
import asyncpg

async def main():
    conn = await asyncpg.connect('postgresql://postgres:root@localhost:5432/kisan_db')
    try:
        await conn.execute("ALTER TABLE farmers ADD COLUMN irrigation_type VARCHAR")
        print("irrigation_type added")
    except Exception as e:
        print(e)
    
    try:
        await conn.execute("ALTER TABLE farmers ADD COLUMN annual_income FLOAT")
        print("annual_income added")
    except Exception as e:
        print(e)
        
    await conn.close()
    
asyncio.run(main())
