import socket

host = 'db.uburdiwwzeuytvsedzpv.supabase.co'
try:
    # Try to resolve everything
    infos = socket.getaddrinfo(host, 5432)
    for info in infos:
        print(info)
except Exception as e:
    print(f"Error: {e}")
