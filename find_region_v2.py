import asyncio
import asyncpg
import socket

regions = [
    'us-east-1', 'us-east-2', 'us-west-1', 'us-west-2',
    'ap-south-1', 'ap-southeast-1', 'ap-southeast-2', 'ap-northeast-1', 'ap-northeast-2', 'ap-northeast-3',
    'eu-central-1', 'eu-west-1', 'eu-west-2', 'eu-west-3', 'eu-north-1',
    'ca-central-1', 'sa-east-1', 'me-central-1', 'af-south-1'
]

async def check_region(region):
    host = f'aws-0-{region}.pooler.supabase.com'
    try:
        # Check if host resolves
        addr = socket.gethostbyname(host)
    except:
        return None
        
    try:
        # Use a very short timeout to avoid waiting too long
        # We only care about the early error message "Tenant not found" vs "Auth failed"
        conn = await asyncpg.connect(
            f'postgresql://postgres.uburdiwwzeuytvsedzpv:Atharv%4001112005@{host}:5432/postgres',
            timeout=2
        )
        await conn.close()
        return (region, "Success on 5432")
    except Exception as e:
        msg = str(e)
        if "Tenant or user not found" in msg:
            return None
        return (region, msg)

async def check_region_6543(region):
    host = f'aws-0-{region}.pooler.supabase.com'
    try:
        socket.gethostbyname(host)
    except:
        return None
        
    try:
        conn = await asyncpg.connect(
            f'postgresql://postgres.uburdiwwzeuytvsedzpv:Atharv%4001112005@{host}:6543/postgres',
            timeout=2
        )
        await conn.close()
        return (region, "Success on 6543")
    except Exception as e:
        msg = str(e)
        if "Tenant or user not found" in msg:
            return None
        return (region, msg)

async def main():
    print("Checking ports 5432 and 6543 across regions...")
    tasks = []
    for r in regions:
        tasks.append(check_region(r))
        tasks.append(check_region_6543(r))
        
    results = await asyncio.gather(*tasks)
    found = False
    for res in results:
        if res:
            print(f"Region {res[0]}: {res[1]}")
            found = True
    if not found:
        print("No regions matched.")

asyncio.run(main())
