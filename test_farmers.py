import asyncio
import asyncpg
async def main():
    conn = await asyncpg.connect('postgresql://postgres:root@localhost:5432/kisan_db')
    rows = await conn.fetch("SELECT * FROM farmers")
    for r in rows:
        print(dict(r))
    await conn.close()
asyncio.run(main())
