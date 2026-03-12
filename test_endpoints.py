"""Quick test to verify backend endpoints are working"""
import requests
import json

BASE_URL = "http://localhost:8000"

print("=" * 60)
print("KISAN SATHI BACKEND ENDPOINT TEST")
print("=" * 60)

# Test 1: Health Check
print("\n1. Testing Backend Health (GET /):")
print("-" * 60)
try:
    response = requests.get(f"{BASE_URL}/")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"ERROR: {e}")

# Test 2: Schemes Endpoint
print("\n2. Testing Schemes Endpoint (GET /api/schemes):")
print("-" * 60)
try:
    response = requests.get(f"{BASE_URL}/api/schemes")
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Response Keys: {data.keys() if isinstance(data, dict) else 'Array'}")
    if isinstance(data, dict) and 'schemes' in data:
        print(f"Number of schemes: {len(data['schemes'])}")
        if len(data['schemes']) > 0:
            print(f"First scheme keys: {data['schemes'][0].keys()}")
    else:
        print(f"Response type: {type(data)}")
        if isinstance(data, list):
            print(f"Number of schemes: {len(data)}")
except Exception as e:
    print(f"ERROR: {e}")

# Test 3: Auth Register
print("\n3. Testing Register Endpoint (POST /auth/register):")
print("-" * 60)
try:
    payload = {
        "name": "Test Farmer",
        "phone": "9999999999",
        "password": "Test@123"
    }
    response = requests.post(f"{BASE_URL}/auth/register", json=payload)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"ERROR: {e}")

# Test 4: Auth Login
print("\n4. Testing Login Endpoint (POST /auth/login):")
print("-" * 60)
try:
    payload = {
        "phone": "9999999999",
        "password": "Test@123"
    }
    response = requests.post(f"{BASE_URL}/auth/login", json=payload)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"ERROR: {e}")

# Test 5: Recommend Endpoint
print("\n5. Testing Recommend Endpoint (POST /api/recommend):")
print("-" * 60)
try:
    payload = {
        "state": "Maharashtra",
        "land_hectares": 2,
        "land_ownership": "owner",
        "crop_type": "Wheat",
        "annual_income_rs": 300000,
        "age": 35,
        "caste": "General",
        "gender": "male",
        "irrigation_type": "canal",
        "is_income_tax_payer": False,
        "is_government_employee": False,
        "is_pensioner_above_10k": False,
        "is_pm_kisan_beneficiary": True,
        "has_aadhaar": True,
        "has_land_records": True,
    }
    response = requests.post(f"{BASE_URL}/api/recommend", json=payload)
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Response Keys: {data.keys() if isinstance(data, dict) else 'Array'}")
    if isinstance(data, dict):
        for key in data.keys():
            if isinstance(data[key], list):
                print(f"  {key}: list with {len(data[key])} items")
            else:
                print(f"  {key}: {type(data[key])}")
except Exception as e:
    print(f"ERROR: {e}")

# Test 6: CORS Check
print("\n6. Testing CORS Headers:")
print("-" * 60)
try:
    response = requests.get(
        f"{BASE_URL}/api/schemes",
        headers={"Origin": "http://localhost:3000"}
    )
    cors_headers = {
        'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
        'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
        'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers'),
    }
    print(f"CORS Headers: {cors_headers}")
except Exception as e:
    print(f"ERROR: {e}")

print("\n" + "=" * 60)
print("TEST COMPLETE")
print("=" * 60)
