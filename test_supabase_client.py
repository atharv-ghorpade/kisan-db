from supabase import create_client, Client

url = "https://uburdiwwzeuytvsedzpv.supabase.co"
key = "sb_publishable_c2S1yRsYrTZPHlWilbpc3w__ODXobZ5"

try:
    supabase: Client = create_client(url, key)
    print("Client created!")
    # Try a simple select
    res = supabase.table("farmers").select("*").limit(1).execute()
    print("Select successful!")
except Exception as e:
    print(f"Error: {e}")
