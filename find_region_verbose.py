import asyncio
import asyncpg
import socket

regions = [
    'us-east-1', 'us-east-2', 'us-west-1', 'us-west-2',
    'ap-south-1', 'ap-southeast-1', 'ap-southeast-2', 'ap-northeast-1',
    'eu-central-1', 'eu-west-1', 'eu-west-2', 'eu-north-1',
    'ca-central-1', 'sa-east-1'
]

async def check(region):
    host = f'aws-0-{region}.pooler.supabase.com'
    try:
        # Check if we can even resolve it
        ip = socket.gethostbyname(host)
        print(f"Region {region} resolves to {ip}")
    except Exception as e:
        # print(f"Region {region} resolution failed: {e}")
        return
        
    try:
        # Try both username formats
        for user in ['postgres.uburdiwwzeuytvsedzpv', 'postgres']:
            try:
                conn = await asyncpg.connect(
                    f'postgresql://{user}:Atharv%4001112005@{host}:6543/postgres',
                    timeout=2
                )
                print(f"Region {region} SUCCESS with user {user}!")
                await conn.close()
                return
            except Exception as e:
                msg = str(e)
                if "Tenant or user not found" not in msg:
                    print(f"Region {region} (user {user}) result: {msg}")
    except:
        pass

async def main():
    print("Starting region scan...")
    # Run sequentially to avoid overwhelming or parallel issues
    for r in regions:
        await check(r)
    print("Scan complete.")

asyncio.run(main())
