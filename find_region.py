import asyncio
import asyncpg
import socket

regions = [
    'us-east-1', 'us-east-2', 'us-west-1', 'us-west-2',
    'ap-south-1', 'ap-southeast-1', 'ap-southeast-2', 'ap-northeast-1', 'ap-northeast-2',
    'eu-central-1', 'eu-west-1', 'eu-west-2', 'eu-west-3', 'eu-north-1',
    'ca-central-1', 'sa-east-1'
]

async def check_region(region):
    host = f'aws-0-{region}.pooler.supabase.com'
    try:
        # First check if host resolves and has IPv4
        # We need IPv4 because the direct IPv6 failed earlier.
        addr = socket.gethostbyname(host)
    except:
        return None
        
    try:
        # Try to connect. We expect either success or "Authentication failed".
        # If it says "Tenant not found", it's the wrong region.
        conn = await asyncpg.connect(
            f'postgresql://postgres.uburdiwwzeuytvsedzpv:Atharv%4001112005@{host}:6543/postgres',
            timeout=5
        )
        await conn.close()
        return (region, "Success")
    except Exception as e:
        msg = str(e)
        if "Tenant or user not found" in msg:
            return None
        return (region, msg)

async def main():
    tasks = [check_region(r) for r in regions]
    results = await asyncio.gather(*tasks)
    for res in results:
        if res:
            print(f"Region {res[0]}: {res[1]}")

asyncio.run(main())
