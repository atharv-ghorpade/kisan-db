import httpx
import asyncio

async def test():
    async with httpx.AsyncClient() as client:
        # Test Registration
        print("Testing Registration...")
        try:
            r = await client.post("http://localhost:8000/auth/register", json={
                "name": "Test User",
                "phone": "1234567890",
                "password": "password123"
            })
            print(f"Registration Response: {r.status_code} - {r.text}")
        except Exception as e:
            print(f"Registration Error: {e}")

        # Test Login
        print("\nTesting Login...")
        try:
            r = await client.post("http://localhost:8000/auth/login", json={
                "phone": "1234567890",
                "password": "password123"
            })
            print(f"Login Response: {r.status_code} - {r.text}")
        except Exception as e:
            print(f"Login Error: {e}")

if __name__ == "__main__":
    asyncio.run(test())
