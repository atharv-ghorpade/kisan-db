import asyncio
import asyncpg

async def test():
    host = 'aws-0-ap-southeast-2.pooler.supabase.com'
    users = ['postgres.uburdiwwzeuytvsedzpv', 'postgres']
    ports = [5432, 6543]
    
    for port in ports:
        for user in users:
            try:
                print(f"Trying {user} on {host}:{port}...")
                conn = await asyncpg.connect(
                    f'postgresql://{user}:Atharv%4001112005@{host}:{port}/postgres',
                    timeout=5
                )
                print(f"SUCCESS with {user} on port {port}!")
                await conn.close()
                return
            except Exception as e:
                print(f"Failed: {e}")

asyncio.run(test())
