import asyncio
import asyncpg
import socket

# Common Supabase Regions
regions = [
    'ap-south-1',       # Mumbai
    'ap-southeast-1',   # Singapore
    'ap-southeast-2',   # Sydney
    'us-east-1',        # N. Virginia
    'us-west-1',        # N. California
    'eu-central-1',     # Frankfurt
    'eu-west-1',        # Ireland
]

async def check(region):
    host = f'aws-0-{region}.pooler.supabase.com'
    # For pooling, username must be postgres.[REF]
    user = 'postgres.uburdiwwzeuytvsedzpv'
    # Trying common ports
    for port in [6543, 5432]:
        try:
            # We use a dummy password to see if we get "Auth Failed" vs "Tenant Not Found"
            # If it's "Auth Failed", we found the right region!
            conn = await asyncpg.connect(
                f'postgresql://{user}:wrongpassword@{host}:{port}/postgres',
                timeout=3
            )
            await conn.close()
        except Exception as e:
            msg = str(e)
            if "authentication failed" in msg.lower():
                print(f"MATCH FOUND! Region: {region}, Port: {port}")
                return True
            elif "Tenant or user not found" in msg:
                # Wrong region
                pass
            else:
                # Other error (timeout, etc)
                print(f"Region {region} Port {port}: {msg}")
    return False

async def main():
    print("Searching for your Supabase region...")
    for r in regions:
        if await check(r):
            break
    print("Scan complete.")

asyncio.run(main())
