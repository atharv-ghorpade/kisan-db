import json
import ipaddress

target_ip = ipaddress.IPv6Address('2406:da1c:f42:ae14:7507:cfdf:457c:5459')

with open('ip-ranges.json', 'r') as f:
    data = json.load(f)

for prefix in data['ipv6_prefixes']:
    network = ipaddress.IPv6Network(prefix['ipv6_prefix'])
    if target_ip in network:
        print(f"Match found: {prefix['region']}")
