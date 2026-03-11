import dns.resolver

resolver = dns.resolver.Resolver()
resolver.nameservers = ['8.8.8.8']

try:
    # Try AAAA (IPv6)
    answers = resolver.resolve('db.uburdiwwzeuytvsedzpv.supabase.co', 'AAAA')
    for rdata in answers:
        print(f"AAAA: {rdata.to_text()}")
        
    # Try A (IPv4)
    try:
        answers = resolver.resolve('db.uburdiwwzeuytvsedzpv.supabase.co', 'A')
        for rdata in answers:
            print(f"A: {rdata.to_text()}")
    except:
        print("No A record found.")
        
    # Try CNAME
    try:
        answers = resolver.resolve('db.uburdiwwzeuytvsedzpv.supabase.co', 'CNAME')
        for rdata in answers:
            print(f"CNAME: {rdata.target}")
    except:
        print("No CNAME found.")
except Exception as e:
    print(f"Error: {e}")
