import requests
import json

def test_vercel_ml_api():
    """Test the deployed ML API on Vercel"""
    
    base_url = "https://cookwise.vercel.app/api"
    
    # Test health endpoint
    try:
        print("Testing deployed ML API health...")
        response = requests.get(f'{base_url}/health', timeout=10)
        print(f"Health check status: {response.status_code}")
        if response.status_code == 200:
            print("✅ Deployed ML API is running")
        else:
            print(f"❌ Deployed ML API health check failed: {response.text}")
    except Exception as e:
        print(f"❌ Could not connect to deployed ML API: {e}")
        return False
    
    # Test recommendation endpoint
    try:
        print("\nTesting deployed recommendation endpoint...")
        test_data = {
            "ingredients": ["rice", "chicken", "spices"],
            "leftovers": [],
            "quiz_preferences": {
                "spiceLevel": "medium",
                "cuisine": "north",
                "experience": "medium",
                "time": "medium",
                "dietType": "non-veg"
            },
            "user_location": {
                "state": "Maharashtra",
                "region": "West"
            },
            "top_k": 5
        }
        
        response = requests.post(
            f'{base_url}/recommend',
            json=test_data,
            headers={'Content-Type': 'application/json'},
            timeout=30
        )
        
        print(f"Recommendation status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print("✅ Deployed ML API recommendation working")
            print(f"Found {len(data.get('recommendations', []))} recommendations")
        else:
            print(f"❌ Deployed ML API recommendation failed: {response.text}")
            
    except Exception as e:
        print(f"❌ Deployed ML API recommendation test failed: {e}")
        return False
    
    return True

if __name__ == "__main__":
    test_vercel_ml_api() 